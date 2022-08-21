import { NextPage } from "next";
import styles from './styles.module.scss';

const Pomodoro : NextPage = () => {
  return(
    <div className={styles.pomodoro}>
      <div className={styles.tabs} >
        <button className={styles.active} >Pomodoro</button>
        <button>Short Break</button>
        <button>Long Break</button>
      </div>

      <div className={styles.line}></div>

      <div className={styles.timer}>
        <span>25:00</span>
      </div>

      <button className={styles.btnConfig}>Configurar ciclo</button>
      <button className={styles.btnStart}>Iniciar ciclo</button>
    </div>
  )
}

export default Pomodoro;