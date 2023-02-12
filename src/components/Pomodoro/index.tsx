import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useTimer } from "../../hooks/useTimer";
import styles from "./styles.module.scss";
import { TimerOptions } from "../TimerOptions";
import { Progressbar } from "../ProgressBar";
import { Mode } from "../../enums";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";

const Pomodoro: NextPage = () => {
  const [openConfigModal, setOpenConfigModal] = useState<boolean>(false);

  const {
    minutes,
    seconds,
    time,
    startTimer,
    resetTimer,
    isActive,
    mode,
    cyclesCount,
  } = useTimer();

  const { user } = useAuth();
  const { room, handleSetRoomTimer } = useRoom();

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  const toggleTimer = () => {
    isActive ? resetTimer() : startTimer();
  };

  useEffect(() => {
    if (mode === Mode.LONGBREAK) {
      toast.success(
        "Parabens! Você completou um ciclo. Que tal uma pausa para o café?",
        { pauseOnFocusLoss: false }
      );
    }
  }, [mode]);


  useEffect( () => {
    if(user?.id === room?.adminId){
      handleSetRoomTimer(time);
    }
  }, [handleSetRoomTimer, room, time, user])

  return (
    <div className={styles.pomodoro}>
      <div className={styles.tabs}>
        <button className={mode == Mode.POMODORO ? styles.active : ""}>
          Pomodoro
        </button>
        <button className={mode == Mode.SHORTBREAK ? styles.active : ""}>
          Short Break
        </button>
        <button className={mode == Mode.LONGBREAK ? styles.active : ""}>
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

      {!isActive ? (
        <button
          onClick={() => setOpenConfigModal(true)}
          className={styles.btnConfig}
        >
          Configurar ciclo
        </button>
      ) : (
        <Progressbar value={(cyclesCount / 4) * 100} />
      )}
      <button
        onClick={toggleTimer}
        className={!isActive ? styles.btnStart : styles.btnStop}
      >
        {isActive ? "Cancelar" : "Iniciar ciclo"}
      </button>
      <TimerOptions
        isVisible={openConfigModal}
        setIsVisible={setOpenConfigModal}
      />
    </div>
  );
};

export default Pomodoro;
