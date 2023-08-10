export interface IUser {
  id: string;
  name: string;
  avatar: string | null;
  isAdmin?: boolean;
  removed?: boolean;
}
