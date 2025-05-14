import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { GENRES } from '@const/genres';

type GenreState = {
  isLoading: boolean;
  genresFiltered: string[];
};

const initialState: GenreState = {
  isLoading: false,
  genresFiltered: [],
};

export const GenreStore = signalStore(
  withState(initialState),
  withMethods(({ ...store }) => ({
    getGenresFiltered: async (filterText: string = '') => {
      patchState(store, { isLoading: true });

      patchState(store, {
        isLoading: false,
        genresFiltered: GENRES.filter((genre) =>
          genre.toLowerCase().includes(filterText.toLowerCase())
        ),
      });
    },
  }))
);
