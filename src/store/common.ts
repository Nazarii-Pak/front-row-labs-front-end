import { createStore } from 'zustand';

const defaultState = {
  authors: [],
};

export type CommonState = {
  authors: string[];
};

export type CommonActions = {
  setAuthors: (authors: string[]) => void;
};

export type CommonStore = CommonState & CommonActions;

export const initCommonStore = (): CommonState => {
  return { authors: [] };
};

export const createCommonStore = (initialState: CommonState = defaultState) => {
  return createStore<CommonStore>()((set) => ({
    ...initialState,
    setAuthors: (authors: string[]) => set({ authors }),
  }));
};
