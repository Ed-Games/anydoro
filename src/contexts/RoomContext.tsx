import { onValue, ref, set } from "firebase/database";
import { useRouter } from "next/router";
import { createContext, ReactNode, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { IRoom } from "../interfaces/Room";
import { IUser } from "../interfaces/User";
import { database } from "../services/firebase";
import { uuidv4 } from "@firebase/util";
import { Mode, Time } from "../enums";
import { ITimerOptions } from "../interfaces/timerOptions";

interface IRoomContextProps {
  children: ReactNode;
}

interface IRoomContextProvider {
  room: IRoom | undefined;
  hasRoomLoaded: boolean;
  handleCreateRoom: (name: string, user: IUser) => Promise<void>;
  handleCloseRoom: () => Promise<void>;
  handleLoadRoomAndAddUser: (user: IUser) => void;
  handleSetRoomTimer: (time: number, mode: string) => Promise<void>;
  handleSetRoomTimerOptions: (timerOptions: ITimerOptions) => Promise<void>;
  handleGetRoomTimerOptions: () => ITimerOptions;
}

export const RoomContext = createContext({} as IRoomContextProvider);

export const RoomContextProvider = ({ children }: IRoomContextProps) => {
  const [room, setRoom] = useState<IRoom>();
  const [hasRoomLoaded, setHasRoomLoaded] = useState<boolean>(false);
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
        currentTimerValue: Time.POMODORO,
        currentTimerMode: Mode.POMODORO
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
        setHasRoomLoaded(true);
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
      room?.currentTimerMode && await set(roomRef, {
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

  const handleGetRoomTimerOptions = () => {
    if(room) {
      const timerOptions: ITimerOptions = {
        longBreak: room.longBreak,
        pomodoro: room.pomodoro,
        shortBreak: room.shortBreak
      }
  
      return timerOptions;
    } else {
      const timerOptions: ITimerOptions = {
        longBreak: Time.LONGBREAK,
        pomodoro: Time.POMODORO,
        shortBreak: Time.SHORTBREAK
      }

      return timerOptions
    }
  }

  return (
    <RoomContext.Provider
      value={{
        room,
        hasRoomLoaded,
        handleCreateRoom,
        handleLoadRoomAndAddUser,
        handleCloseRoom,
        handleSetRoomTimer,
        handleSetRoomTimerOptions,
        handleGetRoomTimerOptions
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
