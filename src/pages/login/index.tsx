import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import logo from '../../../public/logo.svg';
import { FaGoogle } from 'react-icons/fa';
import styles from './styles.module.scss';

const Login: NextPage = () => {
  return (
    <div className="container limiter">
      <Head>
        <title>Anydoro | Login</title>
      </Head>

      <aside className="presentation">
        <Image src={logo} alt="anydoro-logo" />
        <h1>Bem-vindo</h1>
        <span>Aumente sua produtividade com trabalho em grupo</span>
      </aside>
      <main className={styles.loginWithGoogle}>
        <h1>Bem-vindo</h1>
        <span>Faça login para criar ou entrar em uma sala.</span>
        <button>
          <FaGoogle size={24} color="var(--white)" />
          <span>Faça login com o Google</span>
        </button>
      </main>
    </div>
  );
};

export default Login;
