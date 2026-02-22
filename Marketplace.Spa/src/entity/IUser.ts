export interface IRegistrationUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt: Date;
}
export interface ILoginUser {
  email: string;
  password: string;
  createdAt: Date;
}
