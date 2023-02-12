import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Mode, Time } from "../enums";

interface ITimerContextProps {
  isActive: boolean;
  hasFinished: boolean;
  minutes: number;
  seconds: number;
  mode: string;
  cyclesCount: number;
  time: number;
  setTime: (number: number) => void;
  startTimer: () => void;
  resetTimer: () => void;
  startPomodoro: () => void;
  startShortBreak: () => void;
  startLongBreak: () => void;
}

interface ITimerContextProviderProps {
  children: ReactNode;
}

let TimeOut: NodeJS.Timeout;

export const TimerContext = createContext({} as ITimerContextProps);

export const TimerContextProvider = ({
  children,
}: ITimerContextProviderProps) => {
  const [time, setTime] = useState<number>(Time.POMODORO);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [mode, setMode] = useState<string>(Mode.POMODORO);
  const [cyclesCount, setCyclesCount] = useState<number>(0);
  const [hasFinished, setHasFinished] = useState<boolean>(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = useCallback(() => {
    clearTimeout(TimeOut);
    setCyclesCount(0);
    setIsActive(false);
    setHasFinished(true);
    startPomodoro();
  }, []);

  const startPomodoro = () => {
    setMode(Mode.POMODORO);
    setTime(Time.POMODORO);
  };

  const startShortBreak = () => {
    setMode(Mode.SHORTBREAK);
    setTime(Time.SHORTBREAK);
  };

  const startLongBreak = () => {
    setMode(Mode.LONGBREAK);
    setTime(Time.LONGBREAK);
  };

  const handleAfterTimerEnds = useCallback(() => {
    if (mode == Mode.POMODORO) {
      setCyclesCount(cyclesCount + 1);
      cyclesCount < 3 ? startShortBreak() : startLongBreak();
    } else if (mode === Mode.SHORTBREAK) {
      startPomodoro();
    } else {
      resetTimer();
      setIsActive(true);
    }
  }, [cyclesCount, mode, resetTimer]);

  useEffect(() => {
    if (isActive && time > 0) {
      TimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time == 0) {
      handleAfterTimerEnds();
    }
  }, [time, isActive, handleAfterTimerEnds]);

  return (
    <TimerContext.Provider
      value={{
        hasFinished,
        isActive,
        minutes,
        seconds,
        mode,
        cyclesCount,
        time,
        resetTimer,
        setTime,
        startTimer,
        startPomodoro,
        startShortBreak,
        startLongBreak,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
