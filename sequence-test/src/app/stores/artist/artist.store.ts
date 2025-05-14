import { Artist } from '@models/artist.model';
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { ArtistService } from '@app/services/artist/artist.service';

type ArtistState = {
  isLoading: boolean;
  artists: Artist[];
};

const initialState: ArtistState = {
  isLoading: false,
  artists: [],
};

export const ArtistStore = signalStore(
  withState(initialState),
  withProps(() => ({
    artistService: inject(ArtistService),
  })),
  withMethods(({ artistService: artistService, ...store }) => ({
    setartists: (artists: Artist[]) => {
      patchState(store, { artists });
    },
    getArtistsFiltered: async (filterText: string = '') => {
        patchState(store, { isLoading: true });

        artistService.getArtistsWithTextFiltered(filterText).subscribe((data: Artist[]) => {
          patchState(store, { artists: data });
          patchState(store, { isLoading: false });
        });
    },
  }))
);
