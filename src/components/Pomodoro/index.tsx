import { NextPage } from "next";
import { useTimer } from "../../hooks/useTimer";
import styles from "./styles.module.scss";

const Pomodoro: NextPage = () => {
  const {
    minutes,
    seconds,
    startTimer,
    stopTimer,
    setTime,
    resetTimer,
    isActive,
    hasFinished,
  } = useTimer();

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  function toggleTimer() {
    isActive ? resetTimer() : startTimer();
  }

  return (
    <div className={styles.pomodoro}>
      <div className={styles.tabs}>
        <button className={styles.active}>Pomodoro</button>
        <button>Short Break</button>
        <button>Long Break</button>
      </div>

      <div className={styles.line}></div>

      <div className={styles.timer}>
        <span>
          {minuteLeft}
          {minuteRight}:{secondLeft}
          {secondRight}
        </span>
      </div>

      {!isActive && (
        <button className={styles.btnConfig}>Configurar ciclo</button>
      )}
      <button
        onClick={toggleTimer}
        className={!isActive ? styles.btnStart : styles.btnStop}
      >
        {isActive ? "Cancelar ciclo" : "Iniciar ciclo"}
      </button>
    </div>
  );
};

export default Pomodoro;
