import { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import Pomodoro from "../../components/Pomodoro";
import { TimerContextProvider } from "../../contexts/timerContext";

const Room: NextPage = () => {
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
