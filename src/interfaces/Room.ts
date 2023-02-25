import { IUser } from "./User";

export interface IRoom {
  isActive: boolean;
  adminId: string;
  name: string;
  users: IUser[];
  createdAt: string;
  endedAt?: string;
  currentTimerMode?: string;
  currentTimerValue?: number;
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}