import type { NextPage } from "next";
import Image from "next/image";
import styles from "./index.module.scss";
import logo from "../../public/logo.svg";
import Head from "next/head";
import Router from "next/router";
import { MouseEvent } from "react";
import { Formik } from "formik";
import { FaGoogle } from "react-icons/fa";
import { Presentation } from "../components/presentation";

const Home: NextPage = () => {
  const handleCreateNewRoom = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    Router.push("/rooms/new");
  };

  const handleJoinRoom = (code: string) => {
    Router.push(`/rooms/${code}`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Anydoro | Home</title>
      </Head>
      <Presentation />

      <main className={styles.createRoom}>
        <div className={styles.logo}>
          <Image src={logo} alt="anydoro-logo" />
        </div>

        <button
          type="button"
          title="Criar nova sala"
          className={styles.googleButton}
          onClick={handleCreateNewRoom}
        >
          <FaGoogle size={24} />
          crie sua sala com o Google
        </button>

        <div className={styles.divider}>
          <div className={styles.line} />
          <span>Ou entre em uma sala</span>
          <div className={styles.line} />
        </div>
        <Formik
          initialValues={{ code: "" }}
          onSubmit={(values) => handleJoinRoom(values.code)}
        >
          {({ handleChange, handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Digitar código da sala..."
                name="code"
                onChange={handleChange}
              />
              <button type="submit" title="Entrar na sala">
                Entrar na sala
              </button>
            </form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default Home;
