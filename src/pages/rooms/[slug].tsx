import { NextPage } from "next";
import Head from "next/head";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Pomodoro from "../../components/Pomodoro";
import { TimerContextProvider } from "../../contexts/timerContext";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../../services/firebase";
import { useRouter } from "next/router";

const Room: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const roomRef = ref(database, `rooms/${slug}`);
    onValue(roomRef, (snapshot) => {
      const room = snapshot.val();

      if (room && room.endedAt) {
        toast.warn("Essa sala foi encerrada.");
        router.push("/");
      }
    });
  }, [router, slug]);

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
