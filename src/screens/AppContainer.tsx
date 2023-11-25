import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import {navigationRef} from '../configs/Navigator';
import routes from '../configs/routes';
import useAuthStore from '../store/auth.store';
import Login from './auth/login';
import BottomNavigator from './BottomNavigator';

const Stack = createStackNavigator();
function AppContainer() {
  const routeNameRef = React.useRef();
  const {token} = useAuthStore(state => state);
  return (
    <NavigationContainer
      ref={navigationRef}
      //   linking={{
      //     prefixes: LINKING_URL_PREFIXES,
      //     config: getLinkingConfig() as any,
      //     getInitialURL,
      //     // subscribe: _subscribe,
      //   }}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute()?.name;
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator
        initialRouteName={token ? routes.MainScreen : routes.LoginScreen}
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        {token ? (
          <Stack.Screen name={routes.MainScreen} component={BottomNavigator} />
        ) : (
          <Stack.Screen name={routes.LoginScreen} component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppContainer;
