import { createContext, useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAuthContext {
  token: string;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  token: '',
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

interface Props {
  children: React.ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [authToken, setAuthToken] = useState<string>();

  const authenticate = useCallback((token: string) => {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }, []);

  const logout = useCallback(() => {
    setAuthToken(undefined);
    AsyncStorage.removeItem('token');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
