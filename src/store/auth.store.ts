import {create} from 'zustand';
import {persist, createJSONStorage, devtools} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface useAuthStore {
  token: string | null;
  setToken: (value: string | null) => void;
}

const useAuthStore = create<useAuthStore>()(
  persist(
    set => ({
      token: null,
      setToken: (value: any) => set({token: value}),
    }),
    {
      name: 'token',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuthStore;
