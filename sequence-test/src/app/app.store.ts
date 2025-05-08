import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

type BooksState = {
  title: string;
  isMenuCollapsed: boolean;
};

const initialState: BooksState = {
  title: 'default.no-pageTitle',
  isMenuCollapsed: false,
};

export const AppStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    setTitle: (title: string) => {
      patchState(store, { title });
    },
    setMenuCollapsed: (isMenuCollapsed: boolean) => {
      patchState(store, { isMenuCollapsed });
    },
    toggleMenuCollapsed: () => {
      patchState(store, { isMenuCollapsed: !store.isMenuCollapsed() });
    }
  }))
);