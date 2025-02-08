// store/loginStore.ts
import { createStore } from 'zustand';

export type LoginStore = {
  username: string;
  setUsername: (username: string) => void;
};

export const initLoginStore = () => ({
  username: '',
});

export const createLoginStore = (initState: ReturnType<typeof initLoginStore>) => {
  return createStore<LoginStore>()((set) => ({
    ...initState,
    setUsername: (username) => {
        console.log('Updating username:', username);
        set({ username });
      },
  }));
};