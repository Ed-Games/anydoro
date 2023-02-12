import { onValue, ref, set } from "firebase/database";
import { useRouter } from "next/router";
import { createContext, ReactNode, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { IRoom } from "../interfaces/Room";
import { IUser } from "../interfaces/User";
import { database } from "../services/firebase";
import { uuidv4 } from "@firebase/util";

interface IRoomContextProps {
  children: ReactNode;
}

interface IRoomContextProvider {
  room: IRoom | undefined;
  handleCreateRoom: (name: string, user: IUser) => Promise<void>;
  handleCloseRoom: () => Promise<void>;
  handleLoadRoomAndAddUser: (user: IUser) => void;
}

export const RoomContext = createContext({} as IRoomContextProvider);

export const RoomContextProvider = ({ children }: IRoomContextProps) => {
  const [room, setRoom] = useState<IRoom>();
  const router = useRouter();

  const handleCreateRoom = async (name: string, user: IUser) => {
    try {
      const roomRef = ref(database, "rooms/" + uuidv4());
      await set(roomRef, { name, adminId: user.id, createdAt: Date.now() });
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

  return (
    <RoomContext.Provider
      value={{
        room,
        handleCreateRoom,
        handleLoadRoomAndAddUser,
        handleCloseRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
