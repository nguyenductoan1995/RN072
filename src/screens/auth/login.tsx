import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Wrapper} from '../../components';
import colors from '../../constants/colors';
import useAuthStore from '../../store/auth.store';
import {setDefaultHeaders} from '../../utils/functions/Axios';

function Login() {
  const {setToken} = useAuthStore(state => state);
  return (
    <Wrapper barStyle="light-content" statusStyle={styles.status}>
      <View style={styles.container}>
        <Text
          onPress={() => {
            setToken('this is have token');
            setDefaultHeaders({
              Authorization: `Bearer ${'this is have token'}`,
            });
          }}>
          Login
        </Text>
      </View>
    </Wrapper>
  );
}
export default Login;

const styles = StyleSheet.create({
  status: {
    backgroundColor: colors.black,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
