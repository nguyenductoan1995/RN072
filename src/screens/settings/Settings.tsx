import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Wrapper} from '../../components';
import useAuthStore from '../../store/auth.store';

function Settings() {
  const {token, setToken} = useAuthStore(state => state);
  return (
    <Wrapper>
      <View style={styles.container}>
        <Text onPress={() => setToken(null)}>Setting:{token}</Text>
      </View>
    </Wrapper>
  );
}
export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
