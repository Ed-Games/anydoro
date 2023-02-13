import { IUser } from "./User";

export interface IRoom {
  adminId: string;
  name: string;
  users: IUser[];
  createdAt: string;
  endedAt?: string;
  currentTimerMode?: string;
  currentTimerValue?: number;
}