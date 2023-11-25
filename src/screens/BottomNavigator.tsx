import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TransitionPresets} from '@react-navigation/stack';
import routes from '../configs/routes';
import Home from './home/home';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Tab.Screen name={routes.HomeScreen} component={Home} />
      <Tab.Screen name={routes.SettingsScreen} component={Home} />
    </Tab.Navigator>
  );
}
export default BottomNavigator;
