import { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import Pomodoro from "../../components/Pomodoro";

const Room: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Anydoro | Timer </title>
      </Head>
      <Header />
      <Pomodoro />
    </div>
  );
};

export default Room;
