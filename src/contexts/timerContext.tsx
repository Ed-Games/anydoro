import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Mode, Time } from "../enums";
import { useIsAdmin } from "../hooks/useIsAdmin";
import { useRoom } from "../hooks/useRoom";
import { ITimerOptions } from "../interfaces/timerOptions";

interface ITimerContextProps {
  isActive: boolean;
  minutes: number;
  seconds: number;
  mode: string;
  cyclesCount: number;
  time: number;
  timerOptions?: ITimerOptions;
  setTimerOptions: (timerOptions: ITimerOptions | undefined) => void;
  setTime: (number: number) => void;
  startTimer: () => void;
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
  const [time, setTime] = useState<number>(Time.POMODORO);
  const [timerOptions, setTimerOptions] = useState<ITimerOptions>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [mode, setMode] = useState<string>(Mode.POMODORO);
  const [cyclesCount, setCyclesCount] = useState<number>(0);
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const { handleSetRoomTimer, room } = useRoom();
  const isAdmin = useIsAdmin();

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startTimer = () => {
    setHasFinished(false);
    setIsActive(true);
  };

  const resetTimer = useCallback(() => {
    clearTimeout(TimeOut);
    setCyclesCount(0);
    setIsActive(false);
    setTime(timerOptions!.pomodoro);
    setMode(Mode.POMODORO);
    setHasFinished(true);
  }, [timerOptions]);

  const setPomodoroTimeAndMode = useCallback(
    (count: number) => {
      if (mode === Mode.POMODORO) {
        if (count < 3) {
          setMode(Mode.SHORTBREAK);
          setTime(timerOptions!.shortBreak);
        } else {
          setMode(Mode.LONGBREAK);
          setTime(timerOptions!.longBreak);
        }
      }

      if (mode === Mode.SHORTBREAK) {
        setMode(Mode.POMODORO);
        setTime(timerOptions!.pomodoro);
      }

      if (mode === Mode.LONGBREAK) {
        resetTimer();
      }
    },
    [mode, resetTimer, timerOptions]
  );

  useEffect(() => {
    if (isAdmin) {
      if (isActive && time > 0) {
        TimeOut = setTimeout(() => {
          setTime(time - 1);
        }, 1000);
      } else if (isActive && time == 0) {
        setPomodoroTimeAndMode(cyclesCount);
      }
    }
  }, [time, isActive, setPomodoroTimeAndMode, cyclesCount, isAdmin]);

  useEffect(() => {
    if (room && !isAdmin) {
      setIsActive(room.isActive);
      setTime(room.currentTimerValue as number);
      setMode(room.currentTimerMode as string);
    }
  }, [isAdmin, room]);

  useEffect(() => {
    mode !== Mode.POMODORO && setCyclesCount((state) => state + 1);
  }, [mode]);

  useEffect(() => {
    if (!isActive && timerOptions) {
      resetTimer();
    }
  }, [isActive, resetTimer, timerOptions]);

  useEffect(() => {
    isActive && isAdmin && handleSetRoomTimer(time, mode, isActive);
  }, [handleSetRoomTimer, isActive, isAdmin, mode, time]);

  useEffect(() => {
    hasFinished && isAdmin && handleSetRoomTimer(time, mode, isActive);
  }, [handleSetRoomTimer, hasFinished, isActive, isAdmin, mode, time]);

  return (
    <TimerContext.Provider
      value={{
        isActive,
        minutes,
        seconds,
        mode,
        cyclesCount,
        time,
        timerOptions,
        setTimerOptions,
        resetTimer,
        setTime,
        startTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
