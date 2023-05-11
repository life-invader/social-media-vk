export interface IUser {
  _id: string,
  firstName: string,
  secondName: string,
  email: string,
  avatar: string,
  friends: IUser[],
}