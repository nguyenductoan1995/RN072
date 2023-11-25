import {create} from 'zustand';

const useAuthStore = create(set => ({
  token: '',
  setToken: value => set({token: value}),
}));

export default useAuthStore;
