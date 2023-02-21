import { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import Pomodoro from "../../components/Pomodoro";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";
import { BottomTabNavigator } from "../../components/BottomTabNavigator";
import { useTimer } from "../../hooks/useTimer";
import { Loader } from "../../components/Loader/indext";

const Room: NextPage = () => {
  const { user } = useAuth();
  const { setTimerOptions } = useTimer();
  const router = useRouter();
  const { hasRoomLoaded, timerOptions, handleLoadRoomAndAddUser } =
    useRoom();

  useEffect(() => {
    if (user === undefined) return;

    if (!user) {
      router.push("/");
      return;
    } else {
      handleLoadRoomAndAddUser(user);
    }
  }, [handleLoadRoomAndAddUser, router, user]);


  useEffect(()=> {
    setTimerOptions(JSON.parse(timerOptions))
  }, [setTimerOptions, timerOptions])


  return (
    <div id="room" className="container">
      <Head>
        <title>Anydoro | Timer </title>
      </Head>
      <Header />
      <Pomodoro />
      <BottomTabNavigator />
      { !hasRoomLoaded && <Loader /> }
    </div>
  );
};

export default Room;
