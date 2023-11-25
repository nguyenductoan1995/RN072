import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Wrapper} from '../../components';
import {useHome} from '../../hook/Home';
import useAuthStore from '../../store/auth.store';

function Home() {
  const {token, setToken} = useAuthStore(state => state);
  const {state, _doRequest} = useHome();

  useEffect(() => {
    console.tron.log('home', state);
  }, [state]);

  useEffect(() => {
    // if (typeof doRequest === 'function') {
    _doRequest();
    // }
  }, []);

  return (
    <Wrapper>
      <View style={styles.container}>
        <Text onPress={() => setToken(null)}>Home:{token}</Text>
      </View>
    </Wrapper>
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
