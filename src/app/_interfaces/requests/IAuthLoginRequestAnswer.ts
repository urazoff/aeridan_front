import { IUserShort } from '../IUser';

export interface IAuthLoginRequestAnswer {
  message: string;
  user: boolean | IUserShort;
}

