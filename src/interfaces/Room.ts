import { IUser } from "./User";

export interface IRoom {
  adminId: string;
  name: string;
  users: IUser[];
  createdAt: Date;
  endedAt: Date;
}