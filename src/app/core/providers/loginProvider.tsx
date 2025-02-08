// loginProvider.tsx
'use client';
import { createContext, type ReactNode, useContext, useRef } from 'react';
import { createLoginStore, type LoginStore, initLoginStore } from '../store/loginStore';
import { useStore } from 'zustand';

export type LoginStoreApi = ReturnType<typeof createLoginStore>;

export const LoginStoreContext = createContext<LoginStoreApi | undefined>(undefined);

export interface LoginStoreProviderProps {
  children: ReactNode;
}

export const LoginStoreProvider = ({ children }: LoginStoreProviderProps) => {
  // Исправление: явно указываем тип и инициализируем useRef
  const storeRef = useRef<LoginStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createLoginStore(initLoginStore());
  }

  return (
    <LoginStoreContext.Provider value={storeRef.current}>
      {children}
    </LoginStoreContext.Provider>
  );
};

export const useLoginStore = <T,>(selector: (store: LoginStore) => T): T => {
  const loginStoreContext = useContext(LoginStoreContext);

  if (!loginStoreContext) {
    throw new Error(`useLoginStore must be used within LoginStoreProvider`);
  }

  return useStore(loginStoreContext, selector);
};