import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

interface ITimerContextProps {
  isActive: boolean;
  hasFinished: boolean;
  minutes: number;
  seconds: number;
  mode: string;
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
  const [time, setTime] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("Pomodoro");
  const [ciclesCount, setCiclesCount] = useState<number>(0);
  const [hasFinished, setHasFinished] = useState<boolean>(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = useCallback(() => {
    clearTimeout(TimeOut);
    setCiclesCount(0);
    setIsActive(false);
    setHasFinished(true);
    startPomodoro();
  }, []);

  const startPomodoro = () => {
    setMode("Pomodoro");
    setTime(25 * 60);
  };

  const startShortBreak = () => {
    setMode("ShortBreak");
    setTime(5 * 60);
  };

  const startLongBreak = () => {
    setMode("LongBreak");
    setTime(15 * 60);
  };

  const handleAfterTimerEnds = useCallback(() => {
    if (mode == "Pomodoro") {
      setCiclesCount(ciclesCount + 1);
      ciclesCount < 3 ? startShortBreak() : startLongBreak();
    } else if (mode === "ShortBreak") {
      startPomodoro();
    } else {
      resetTimer();
      setIsActive(true);
    }
  }, [ciclesCount, mode, resetTimer]);

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
