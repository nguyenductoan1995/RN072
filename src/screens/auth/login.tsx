import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import useAuthStore from '../../store/auth.store';

function Login() {
  const {setToken} = useAuthStore(state => state);
  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          setToken('this is have token');
        }}>
        Login
      </Text>
    </View>
  );
}
export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'skyblue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
