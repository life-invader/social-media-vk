import type { IUser } from "./user";

export interface IPost {
  _id: string,
  text: string,
  image?: string,
  likes: number,
  user: IUser,
  createdAt: string,
}