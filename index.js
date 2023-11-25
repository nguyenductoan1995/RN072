/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/configs/ReactotronConfig';

AppRegistry.registerComponent(appName, () => App);
