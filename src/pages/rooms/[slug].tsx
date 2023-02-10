import { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import Pomodoro from "../../components/Pomodoro";
import { TimerContextProvider } from "../../contexts/timerContext";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";

const Room: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { handleLoadRoomAndAddUser } = useRoom();

  useEffect(() => {
    if (user === undefined) return;

    if (!user) {
      router.push("/");
      return;
    }
    handleLoadRoomAndAddUser(user);
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

export default Room;
