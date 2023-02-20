import { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import Pomodoro from "../../components/Pomodoro";
import { TimerContextProvider } from "../../contexts/timerContext";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";
import { BottomTabNavigator } from "../../components/BottomTabNavigator";
import { useTimer } from "../../hooks/useTimer";

const Room: NextPage = () => {
  const [shouldRetriveTimerOptions, setShouldRetriveTimerOptions] =
    useState(false);
  const { user } = useAuth();
  const { setTimerOptions } = useTimer();
  const router = useRouter();
  const { hasRoomLoaded, handleLoadRoomAndAddUser, handleGetRoomTimerOptions } = useRoom();

  useEffect(() => {
    if (user === undefined) return;

    if (!user) {
      router.push("/");
      return;
    } else {
      handleLoadRoomAndAddUser(user);
      setShouldRetriveTimerOptions(true);
    }
  }, [handleLoadRoomAndAddUser, router, user]);

  useEffect(() => {
    if (shouldRetriveTimerOptions && hasRoomLoaded) {
      setTimerOptions(handleGetRoomTimerOptions());
      setShouldRetriveTimerOptions(false);
    }
  }, [handleGetRoomTimerOptions, shouldRetriveTimerOptions, hasRoomLoaded, setTimerOptions]);

  return (
    <div id="room" className="container">
      <Head>
        <title>Anydoro | Timer </title>
      </Head>
      <Header />
      <Pomodoro />
      <BottomTabNavigator />
    </div>
  );
};

export default Room;
