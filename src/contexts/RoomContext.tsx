import { onValue, ref, set } from "firebase/database";
import { useRouter } from "next/router";
import { createContext, ReactNode, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { IRoom } from "../interfaces/Room";
import { IUser } from "../interfaces/User";
import { database } from "../services/firebase";

interface IRoomContextProps {
  children: ReactNode;
}

interface IRoomContextProvider {
  room: IRoom | undefined;
  handleCloseRoom: () => Promise<void>;
  handleLoadRoomAndAddUser: (user: IUser) => void;
}

export const RoomContext = createContext({} as IRoomContextProvider);

export const RoomContextProvider = ({ children }: IRoomContextProps) => {
  const [room, setRoom] = useState<IRoom>();
  const router = useRouter();
  const roomRef = ref(database, `rooms/${router.query.slug}`);

  const handleLoadRoomAndAddUser = useCallback(
    (user: IUser) => {
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
    [roomRef, router]
  );

  const handleCloseRoom = async () => {
    await set(roomRef, { ...room, endedAt: new Date() });
    router.push("/");
  };

  return (
    <RoomContext.Provider
      value={{
        room,
        handleLoadRoomAndAddUser,
        handleCloseRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
