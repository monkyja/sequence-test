import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

type BooksState = {
  title: string;
};

const initialState: BooksState = {
  title: '',
};

export const AppStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    setTitle: (title: string) => {
      patchState(store, { title });
    },
  }))
);