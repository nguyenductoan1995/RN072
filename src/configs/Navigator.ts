import * as React from 'react';
import {
  StackActions,
  DrawerActions,
  CommonActions,
} from '@react-navigation/native';

export const navigationRef = React.createRef<any>();
export function navigate(name: string, params?: any) {
  console.log('-----navigation-----', name);
  navigationRef.current?.navigate(name, params);
}
export function dispatch(action?: any) {
  navigationRef.current?.dispatch(action);
}
export function jumpTo(name: string, params?: any) {
  navigationRef.current?.jumpTo(name, params);
}
export function replace(name: string, params?: any) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}
export function push(name?: string, params?: any) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}
export function toggleDrawer() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}
export function goBack() {
  navigationRef.current?.goBack();
}

export function reset(name: string, params = {}) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name, params}],
    }),
  );
}

export function resets(name: string, params?: any, key?: any) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name,
          params,
          key,
        },
      ],
    }),
  );
}

export function getCurrentName() {
  return navigationRef.current?.getCurrentRoute()?.name || '';
}

export const Navigator = {
  navigate,
  dispatch,
  jumpTo,
  replace,
  push,
  goBack,
  toggleDrawer,
  getCurrentName,
  reset,
};
