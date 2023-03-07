import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/AuthContext';
import { IAuthData } from '../types';
import { loginUser } from '../util/auth';

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const signupHandler = async ({ email, password }: IAuthData) => {
    setIsLoading(true);
    try {
      const token = await loginUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Check your credentials and try again!'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={signupHandler} />;
}

export default LoginScreen;
