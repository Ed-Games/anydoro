import { NextPage } from "next";
import Image from "next/image";
import { Presentation } from "../../components/presentation";
import logo from "../../../public/logo.svg";

import styles from "./styles.module.scss";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Login: NextPage = () => {
  const { signInWithGoogle, signInWithGithub, user } = useAuth();
  const router = useRouter();

  const handleSignIn = async (type: "google" | "github") => {
    if (type == "google") {
      try {
        await signInWithGoogle();
      } catch (error) {
        toast.error("Houve um erro ao fazer login. Tente novamente");
      }
    } else {
      try {
        await signInWithGithub();
      } catch (error) {
        toast.error("Houve um erro ao fazer login. Tente novamente");
      }
    }
  };

  useEffect(() => {
    if (user) {
      if (router.query.redirect_to) {
        router.push(router.query.redirect_to as string);
      } else {
        router.push("/");
      }
    }
  }, [router, user]);

  return (
    <div className={styles.container}>
      <Presentation />
      <main className={styles.login}>
        <div className={styles.logo}>
          <Image src={logo} alt="anydoro-logo" />
        </div>
        <span>Bem vindo. Faça login para continuar</span>
        <button onClick={() => handleSignIn("google")}>
          <FaGoogle />
          Fazer login com o Google
        </button>

        <div className={styles.divider}>
          <div className={styles.line} />
          <span>Ou</span>
          <div className={styles.line} />
        </div>

        <button onClick={() => handleSignIn("github")}>
          <FaGithub />
          Fazer login com o Github
        </button>
      </main>
    </div>
  );
};

export default Login;
