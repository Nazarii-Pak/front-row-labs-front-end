'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import { type CommonStore, createCommonStore, initCommonStore } from '@/store/common';

export type CommonStoreApi = ReturnType<typeof createCommonStore>;

export const CommonStoreContext = createContext<CommonStoreApi | undefined>(undefined);

export interface CommonStoreProviderProps {
  children: ReactNode;
}

export const CommonStoreProvider = ({ children }: CommonStoreProviderProps) => {
  const storeRef = useRef<CommonStoreApi>(null);
  if (!storeRef.current) storeRef.current = createCommonStore(initCommonStore());

  return <CommonStoreContext.Provider value={storeRef.current}>{children}</CommonStoreContext.Provider>;
};

export const useCommonStore = <T,>(selector: (store: CommonStore) => T): T => {
  const commonStoreContext = useContext(CommonStoreContext);

  if (!commonStoreContext) throw new Error('useCommonStore must be used within CommonStoreProvider');

  return useStore(commonStoreContext, selector);
};
