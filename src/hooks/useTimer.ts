import { useContext } from "react";
import { TimerContext } from "../contexts/timerContext";

export const useTimer = () => useContext(TimerContext)