import { NextPage } from "next";
import styles from './styles.module.scss';

const Header: NextPage = () => {
  return (
    <div className={styles.header}>
      <button>Compartilhar</button>
      <button>Encerrar sala</button>
    </div>
  )
}

export default Header;