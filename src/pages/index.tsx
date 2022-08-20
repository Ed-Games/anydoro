import type { NextPage } from "next";
import Image from "next/image";
import styles from "./index.module.scss";
import logo from "../../public/logo.svg";
import Head from "next/head";
import { FiArrowRight } from "react-icons/fi";
import Router from "next/router";
import { MouseEvent } from "react";
import { Formik } from "formik";

const Home: NextPage = () => {
  const handleCreateNewRoom = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    Router.push(`/rooms/${Math.random()}`);
  };

  const handleJoinRoom = (code: string) => {
    Router.push(`/rooms/${code}`);
  };

  return (
    <div className="container limiter">
      <Head>
        <title>Anydoro | Home</title>
      </Head>
      <aside className="presentation">
        <Image src={logo} alt="anydoro-logo" />
        <h1>Bem-vindo</h1>
        <span>Aumente sua produtividade com trabalho em grupo</span>
      </aside>
      <main className={styles.createRoom}>
        <h1>Bem-vindo</h1>
        <button
          type="button"
          title="Criar nova sala"
          className="red-button"
          onClick={handleCreateNewRoom}
        >
          criar nova sala
        </button>
        <span>Ou entre em uma sala já existente</span>
        <Formik initialValues={{code:''}} onSubmit={(values) => handleJoinRoom(values.code)}>
          {({ handleChange, handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit} >
              <input
                placeholder="Digitar código da sala..."
                name="code"
                onChange={handleChange}
              />
              <button type="submit" title="Entrar na sala" >
                <FiArrowRight size={30} />
              </button>
            </form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default Home;
