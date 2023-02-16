import { onValue, ref, set } from "firebase/database";
import { useRouter } from "next/router";
import { createContext, ReactNode, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { IRoom } from "../interfaces/Room";
import { IUser } from "../interfaces/User";
import { database } from "../services/firebase";
import { uuidv4 } from "@firebase/util";
import { Time } from "../enums";
import { ITimerOptions } from "../interfaces/timerOptions";

interface IRoomContextProps {
  children: ReactNode;
}

interface IRoomContextProvider {
  room: IRoom | undefined;
  handleCreateRoom: (name: string, user: IUser) => Promise<void>;
  handleCloseRoom: () => Promise<void>;
  handleLoadRoomAndAddUser: (user: IUser) => void;
  handleSetRoomTimer: (time: number, mode: string) => Promise<void>;
  handleSetRoomTimerOptions: (timerOptions: ITimerOptions) => Promise<void>;
}

export const RoomContext = createContext({} as IRoomContextProvider);

export const RoomContextProvider = ({ children }: IRoomContextProps) => {
  const [room, setRoom] = useState<IRoom>();
  const router = useRouter();

  const handleCreateRoom = async (name: string, user: IUser) => {
    try {
      const roomRef = ref(database, "rooms/" + uuidv4());
      await set(roomRef, {
        name,
        adminId: user.id,
        createdAt: Date.now(),
        pomodoro: Time.POMODORO,
        longBreak: Time.LONGBREAK,
        shortBreak: Time.SHORTBREAK,
      });
      router.push(`/rooms/${roomRef.key}`);
    } catch (error) {
      toast.error("Houve um erro ao tentar criar a sala.");
    }
  };

  const handleLoadRoomAndAddUser = useCallback(
    (user: IUser) => {
      const roomRef = ref(database, `rooms/${router.query.slug}`);
      onValue(roomRef, async (snapshot) => {
        const localRoom: IRoom = snapshot.val();
        if (localRoom) {
          if (localRoom.endedAt) {
            toast.warn("Essa sala foi encerrada.");
            router.push("/");
          }

          const usersInRoom = localRoom.users
            ? Array.from(localRoom.users)
            : new Array<IUser>();

          const alreadyexists = usersInRoom.find(
            (userInRoom) => userInRoom.id === user!.id
          );

          if (!alreadyexists) {
            const userRef = ref(
              database,
              `rooms/${router.query.slug}/users/${user!.id}`
            );
            await set(userRef, {
              ...user,
              isAdmin: localRoom.adminId === user!.id,
            });
          }
        }

        setRoom(localRoom);
      });
    },
    [router]
  );

  const handleCloseRoom = async () => {
    const roomRef = ref(database, `rooms/${router.query.slug}`);
    await set(roomRef, { ...room, endedAt: Date.now() });
    setRoom(undefined);
    router.push("/");
  };

  const handleSetRoomTimer = useCallback(
    async (time: number, mode: string) => {
      const roomRef = ref(database, `rooms/${router.query.slug}`);
      await set(roomRef, {
        ...room,
        currentTimerValue: time,
        currentTimerMode: mode,
      });
    },
    [room, router]
  );

  const handleSetRoomTimerOptions = async (timerOptions: ITimerOptions) => {
    const roomRef = ref(database, `rooms/${router.query.slug}`);
    await set(roomRef, { ...room, ...timerOptions });
  };

  return (
    <RoomContext.Provider
      value={{
        room,
        handleCreateRoom,
        handleLoadRoomAndAddUser,
        handleCloseRoom,
        handleSetRoomTimer,
        handleSetRoomTimerOptions
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
