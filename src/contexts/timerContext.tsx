import { createContext, ReactNode, useEffect, useState } from "react";

interface ITimerContextProps {
  isActive: boolean;
  hasFinished: boolean;
  minutes: number;
  seconds: number;
  setTime: (number: number) => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
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
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    clearTimeout(TimeOut)
    setIsActive(false);
    setHasFinished(true);
    setTime(25*60);
  };

  useEffect(() => {
    if (isActive && time > 0) {
      TimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time == 0) {
      setIsActive(false);
      setHasFinished(true);
    }
  }, [time, isActive]);

  return (
    <TimerContext.Provider
      value={{
        hasFinished,
        isActive,
        minutes,
        seconds,
        resetTimer,
        setTime,
        startTimer,
        stopTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
