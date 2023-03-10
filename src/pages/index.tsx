import type { NextPage } from "next";
import Image from "next/image";
import styles from "./index.module.scss";
import logo from "../../public/logo.svg";
import Head from "next/head";
import Router from "next/router";
import { MouseEvent } from "react";
import { Formik } from "formik";
import { Presentation } from "../components/presentation";
import { useAuth } from "../hooks/useAuth";
import { codeSchema } from "../validators/roomCodeSchema";

const Home: NextPage = () => {
  const { user } = useAuth();

  const handleCreateNewRoom = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    try {
      if (!user) {
        Router.push("/login?redirect_to=/rooms/new");
      } else {
        Router.push("/rooms/new");
      }
    } catch (error) {
      return;
    }
  };

  const handleJoinRoom = async (code: string) => {
    if (!user) {
      Router.push(`/login?redirect_to=/rooms/${code}`);
    }
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
          onClick={handleCreateNewRoom}
        >
          Criar sua sala
        </button>

        <div className={styles.divider}>
          <div className={styles.line} />
          <span>Ou entre em uma sala</span>
          <div className={styles.line} />
        </div>
        <Formik
          initialValues={{ code: "" }}
          onSubmit={(values) => handleJoinRoom(values.code)}
          validationSchema={codeSchema}
        >
          {({ handleChange, handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Digitar código..."
                name="code"
                onChange={handleChange}
              />
              {errors.code && touched.code && (
                <span className="error">{errors.code}</span>
              )}
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
