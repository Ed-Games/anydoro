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
}

interface ITimerContextProviderProps {
  children: ReactNode;
}

interface ITimerOptions {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}

let TimeOut: NodeJS.Timeout;

export const TimerContext = createContext({} as ITimerContextProps);

export const TimerContextProvider = ({
  children,
}: ITimerContextProviderProps) => {
  const [time, setTime] = useState<number>(Time.POMODORO);
  const [timerOptions, setTimerOptions] = useState<ITimerOptions>();
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
    setTime(timerOptions?.pomodoro || Time.POMODORO);
    setMode(Mode.POMODORO);
  }, [timerOptions]);

  const setPomodoroTimeAndMode = useCallback(
    (count: number) => {
      if (mode === Mode.POMODORO) {
        console.log("pomodoro completed");
        if (count < 3) {
          setMode(Mode.SHORTBREAK);
          setTime(timerOptions?.shortBreak || Time.SHORTBREAK);
        } else {
          setMode(Mode.LONGBREAK);
          setTime(timerOptions?.longBreak || Time.LONGBREAK);
        }
      }

      if (mode === Mode.SHORTBREAK) {
        setMode(Mode.POMODORO);
        setTime(timerOptions?.pomodoro || Time.POMODORO);
      }

      if (mode === Mode.LONGBREAK) {
        resetTimer();
      }
    },
    [mode, resetTimer, timerOptions]
  );

  useEffect(() => {
    const timerOptionsExist = localStorage.getItem("timerOptions");
    if (timerOptionsExist) {
      const timerOptions: ITimerOptions = JSON.parse(timerOptionsExist);
      setTime(timerOptions.pomodoro);
      setTimerOptions(timerOptions);
    }
  }, []);

  useEffect(() => {
    if (isActive && time > 0) {
      TimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time == 0) {
      setPomodoroTimeAndMode(cyclesCount);
    }
  }, [time, isActive, setPomodoroTimeAndMode, cyclesCount]);

  useEffect(() => {
    mode !== Mode.POMODORO && setCyclesCount((state) => state + 1);
  }, [mode]);

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
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
