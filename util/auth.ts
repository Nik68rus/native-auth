import { AuthMode } from './../types/index';
import axios from 'axios';
import { FIREBASE_API_KEY } from '@env';

interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const authenticate = async (
  mode: AuthMode,
  email: string,
  password: string
) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${FIREBASE_API_KEY}`;
  const response = await axios.post<AuthResponse>(url, {
    email,
    password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
};

export const createUser = (email: string, password: string) => {
  return authenticate(AuthMode.SIGNUP, email, password);
};

export const loginUser = (email: string, password: string) => {
  return authenticate(AuthMode.LOGIN, email, password);
};
