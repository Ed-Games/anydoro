import { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header";

const Room: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Anydoro | Timer </title>
      </Head>
      <Header />
    </div>
  );
};

export default Room;
