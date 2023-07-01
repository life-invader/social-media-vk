export interface IUser {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  avatarUrl: string;
  friends: IUser[];
}
