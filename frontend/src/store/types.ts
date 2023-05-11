import { IPost } from "../types/post";
import type { IUser } from "../types/user";

export interface IUserSlice {
  user: IUser | null,
  viewingProfile: IUser | null,
  posts: IPost[],
  feed: IPost[],
}