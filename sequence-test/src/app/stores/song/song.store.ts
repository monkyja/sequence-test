import { Song } from '@models/song.model';
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { SongService } from '@services/song/song.service';

type SongState = {
    isLoading: boolean;
  songs: Song[];
};

const initialState: SongState = {
  isLoading: false,
  songs: []
};

export const SongStore = signalStore(
  withState(initialState),
  withProps(() => ({
    songService: inject(SongService),
  })),
  withMethods(({ songService, ...store }) => ({
    setSongs: (songs: Song[]) => {
      patchState(store, { songs });
    },
    getSongs: async () => {
        patchState(store, { isLoading: true });

        songService.getSongs().subscribe((data: Song[]) => {
          patchState(store, { songs: data });
          patchState(store, { isLoading: false });
        });
    }
})))
