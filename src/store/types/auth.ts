import { IStateObject } from "../types";

export interface IUser {
  id: number;
  username: string;
  email: string;
  name: string;
  surname: string;
  password?: string;
}

export interface IUserAuthData {
  username: string;
  password: string;
}

export interface IUserState extends IStateObject {
  data?: IUser;
}

export interface IAuthReducer {
  user: IUserState;
}
