import { NextPage } from "next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import styles from './styles.module.scss';

const Header: NextPage = () => {
  const router = useRouter();

  const copyRoomCodeToClipBoard = () => {
    navigator.clipboard.writeText(router.query.slug as string);
    toast.success('Código da sala copiado com sucesso!');
  }

  return (
    <div className={styles.header}>
      <button onClick={copyRoomCodeToClipBoard}>Compartilhar</button>
      <button>Encerrar sala</button>
    </div>
  )
}

export default Header;