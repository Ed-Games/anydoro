import { NextPage } from "next";
import { useState } from "react";
import { useTimer } from "../../hooks/useTimer";
import styles from "./styles.module.scss";
import { TimerOptions } from "./TimerOptions";

const Pomodoro: NextPage = () => {
  const [openConfigModal, setOpenConfigModal] = useState<boolean>(false);

  const { minutes, seconds, startTimer, resetTimer, isActive, mode } =
    useTimer();

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  function toggleTimer() {
    isActive ? resetTimer() : startTimer();
  }

  return (
    <div className={styles.pomodoro}>
      <div className={styles.tabs}>
        <button className={mode == "Pomodoro" ? styles.active : ""}>
          Pomodoro
        </button>
        <button className={mode == "ShortBreak" ? styles.active : ""}>
          Short Break
        </button>
        <button className={mode == "LongBreak" ? styles.active : ""}>
          Long Break
        </button>
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
        <button
          onClick={() => setOpenConfigModal(true)}
          className={styles.btnConfig}
        >
          Configurar ciclo
        </button>
      )}
      <button
        onClick={toggleTimer}
        className={!isActive ? styles.btnStart : styles.btnStop}
      >
        {isActive ? "Cancelar ciclo" : "Iniciar ciclo"}
      </button>
      <TimerOptions isVisible={openConfigModal} setIsVisible={setOpenConfigModal} />
    </div>
  );
};

export default Pomodoro;
