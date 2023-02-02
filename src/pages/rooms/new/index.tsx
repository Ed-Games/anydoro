import { NextPage } from "next";
import { Presentation } from "../../../components/presentation";
import styles from "./styles.module.scss";
import logo from "../../../../public/logo.svg";
import Image from "next/image";
import { Formik } from "formik";
import Link from "next/link";

const NewRoom: NextPage = () => {
  return (
    <div className={styles.container}>
      <Presentation />
      <main className={styles.createRoom}>
        <div className={styles.logo}>
          <Image src={logo} alt="Anydoro logo" />
        </div>
        <h2>Criar uma nova sala</h2>
        <Formik initialValues={{}} onSubmit={(values) => console.log(values)}>
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <input placeholder="Nome da sala" aria-label="nome da sala" />
              <button type="submit">Criar sala</button>
              <span>
                Quer entrar numa sala existente?{" "}
                <Link href="/">Clique aqui</Link>{" "}
              </span>
            </form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default NewRoom;
