export interface IUser {
  createdAt: number;
  updatedAt: number;
  id: string;
  email: string;
  fullName: string;
}

export interface IUserShort {
  id: string;
  email: string;
  fullName: string;
}
