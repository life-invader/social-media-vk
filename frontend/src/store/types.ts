import { IPost } from "../types/post";
import type { IUser } from "../types/user";

export interface IUserSlice {
  user: IUser | null,
  viewingProfile: IUser | null,
  posts: IPost[],
  feed: IPost[],
}

export interface IAuthSlice {
  status: AuthStatus,
  isLoggedIn: boolean,
}

export enum AuthStatus {
  Init = 'init',
  Success = 'success',
  Error = 'error',
  Loading = 'loading',
}
