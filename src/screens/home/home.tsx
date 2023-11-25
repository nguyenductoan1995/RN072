import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import useAuthStore from '../../store/auth.store';

function Home() {
  const {token, setToken} = useAuthStore(state => state);
  return (
    <View style={styles.container}>
      <Text onPress={() => setToken(null)}>{token}</Text>
    </View>
  );
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
