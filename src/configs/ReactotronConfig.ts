import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay,
  asyncStorage,
  networking,
} from 'reactotron-react-native'; // eslint-disable-line
// eslint-disable-line
import {NativeModules} from 'react-native';
import url from 'url';
import AsyncStorage from '@react-native-async-storage/async-storage';

if (__DEV__) {
  // eslint-disable-line
  const {hostname} = url.parse(NativeModules.SourceCode.scriptURL);
  Reactotron.configure({name: 'RN072', host: hostname})
    .setAsyncStorageHandler(AsyncStorage)
    .useReactNative()
    .use(trackGlobalErrors())
    .use(openInEditor())
    .use(overlay())
    .use(asyncStorage())
    .use(networking())
    .connect();

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear();

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron;
} else {
  console.tron = console;
}
