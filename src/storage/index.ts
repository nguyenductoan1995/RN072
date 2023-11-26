import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN = '@token';

export const setToken = (id: any) => {
  return AsyncStorage.setItem(TOKEN, id);
};

export const getToken = () => {
  return AsyncStorage.getItem(TOKEN);
};
