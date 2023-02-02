import { NextPage } from "next";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import Header from "../../components/Header";
import Pomodoro from "../../components/Pomodoro";
import { TimerContextProvider } from "../../contexts/timerContext";
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer />
    </TimerContextProvider>
  );
};

export default Room;