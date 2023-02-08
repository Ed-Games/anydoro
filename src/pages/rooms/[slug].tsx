import { NextPage } from "next";
import Head from "next/head";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Pomodoro from "../../components/Pomodoro";
import { TimerContextProvider } from "../../contexts/timerContext";
import "react-toastify/dist/ReactToastify.css";
import { memo, useCallback, useEffect, useState } from "react";
import { onValue, ref, set } from "firebase/database";
import { database } from "../../services/firebase";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import { IRoom } from "../../interfaces/Room";
import { IUser } from "../../interfaces/User";

const RoomComponent: NextPage = () => {
  const [room, setRoom] = useState<IRoom>();
  const { user } = useAuth();
  const router = useRouter();

  const handleLoadRoomAndAddUser = useCallback(() => {
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
  }, [router, user]);

  useEffect(() => {
    !user && router.push("/");
    handleLoadRoomAndAddUser();
  }, [handleLoadRoomAndAddUser, router, user]);

  return (
    <TimerContextProvider>
      <div className="container">
        <Head>
          <title>Anydoro | Timer </title>
        </Head>
        <Header />
        <Pomodoro />
      </div>
    </TimerContextProvider>
  );
};

const Room = memo(RoomComponent);

export default Room;
