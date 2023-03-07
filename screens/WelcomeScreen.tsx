import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../store/AuthContext';

function WelcomeScreen() {
  const [message, setMessage] = useState('');
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(
        `https://native-expenses-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=${authCtx.token}`
      )
      .then((res) => {
        console.log(res.data);
        setMessage(res.data);
      });
  }, [authCtx.token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
