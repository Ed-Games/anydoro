import { useEffect, useRef, useState } from "react";
import { useTimer } from "../../hooks/useTimer";
import styles from "./styles.module.scss";
import { TimerOptions } from "../TimerOptions";
import { Progressbar } from "../ProgressBar";
import { Mode } from "../../enums";
import { toast } from "react-toastify";
import { useIsAdmin } from "../../hooks/useIsAdmin";

const Pomodoro = () => {
  const [openConfigModal, setOpenConfigModal] = useState<boolean>(false);
  const isAdmin = useIsAdmin();
  const audioRef = useRef<HTMLAudioElement>();

  const {
    minutes,
    seconds,
    startTimer,
    resetTimer,
    isActive,
    mode,
    cyclesCount,
  } = useTimer();

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  const toggleTimer = () => {
    isActive && isAdmin ? resetTimer() : startTimer();
  };

  useEffect(() => {
    if (mode === Mode.LONGBREAK) {
      toast.success(
        "Parabens! Você completou um ciclo. Que tal uma pausa para o café?",
        { pauseOnFocusLoss: false }
      );
    }

    if (mode === Mode.SHORTBREAK) {
      toast.success("Hora de fazer uma pequena pausa", {
        pauseOnFocusLoss: false,
      });
    }

    if (mode === Mode.POMODORO && isActive) {
      toast.success("Hora de focar!!", { pauseOnFocusLoss: false });
    }
  }, [mode, isActive]);

  useEffect(() => {
    if (cyclesCount < 1 && mode === Mode.POMODORO) {
      return;
    } else {
      audioRef.current?.play();
    }
  }, [cyclesCount, mode]);

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

      {!isActive && isAdmin && (
        <button
          onClick={() => setOpenConfigModal(true)}
          className={styles.btnConfig}
        >
          Configurar ciclo
        </button>
      )}

      {isActive && <Progressbar value={(cyclesCount / 4) * 100} />}

      <button
        disabled={!isAdmin}
        onClick={toggleTimer}
        className={!isActive ? styles.btnStart : styles.btnStop}
      >
        {isActive ? "Cancelar" : "Iniciar ciclo"}
      </button>
      <TimerOptions
        isVisible={openConfigModal}
        setIsVisible={setOpenConfigModal}
      />
      <audio ref={audioRef as any} src="/notification-sound.mp3" />
    </div>
  );
};

export default Pomodoro;
