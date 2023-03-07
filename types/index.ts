export interface IAuthData {
  email: string;
  password: string;
}

export interface IRegData {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

export interface ICredentialsState {
  email: boolean;
  confirmEmail: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Welcome: undefined;
};

export enum AuthMode {
  LOGIN = 'signInWithPassword',
  SIGNUP = 'signUp',
}
