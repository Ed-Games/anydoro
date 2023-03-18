import { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import Pomodoro from "../../components/Pomodoro";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";
import { BottomTabNavigator } from "../../components/BottomTabNavigator";
import { useTimer } from "../../hooks/useTimer";
import { Loader } from "../../components/Loader/indext";
import { toast } from "react-toastify";
import styles from './styles.module.scss';

const Room: NextPage = () => {
  const { user } = useAuth();
  const { setTimerOptions } = useTimer();
  const router = useRouter();
  const { hasRoomLoaded, setHasRoomClosed, hasRoomClosed , timerOptions, handleLoadRoomAndAddUser } =
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
    timerOptions && setTimerOptions(JSON.parse(timerOptions))
  }, [setTimerOptions, timerOptions])

  useEffect(()=> {
    if(hasRoomClosed){
      toast.warning('Essa sala foi encerrada');
      setHasRoomClosed(false);
      setTimerOptions(undefined);
    }
  }, [hasRoomClosed, setHasRoomClosed, setTimerOptions])


  return (
    <div id="room" className={`container ${styles.roomContainer}`}>
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
