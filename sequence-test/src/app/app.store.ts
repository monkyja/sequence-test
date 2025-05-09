import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

type BooksState = {
  title: string;
  titleParams: any;
  isMenuCollapsed: boolean;
};

const initialState: BooksState = {
  title: 'default.no-pageTitle',
  titleParams: {},
  isMenuCollapsed: false,
};

export const AppStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    setTitle: (title: string, titleParams?: any) => {
      patchState(store, { title, titleParams: titleParams ?? {} });
    },
    setMenuCollapsed: (isMenuCollapsed: boolean) => {
      patchState(store, { isMenuCollapsed });
    },
    toggleMenuCollapsed: () => {
      patchState(store, { isMenuCollapsed: !store.isMenuCollapsed() });
    }
  }))
);
