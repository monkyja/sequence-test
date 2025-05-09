import { Song } from '@models/song.model';
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { SongService } from '@services/song/song.service';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

type SongState = {
  isLoading: boolean;
  isDeleting: number[];
  songs: Song[];
  detailedSong?: Song;

  fullLoadedSongs: Song[];
};

const initialState: SongState = {
  isLoading: false,
  isDeleting: [],
  songs: [],
  fullLoadedSongs: [],
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
    },
    getSong: (id: number) => {
      patchState(store, { isLoading: true });

      const fullLoadedSong = store.fullLoadedSongs().find((song) => song.id === id) ?? null;
      if(fullLoadedSong) {
        patchState(store, { isLoading: false });
        return of(fullLoadedSong);
      }

      return songService.getSong(id).pipe(
        tap((data: Song) => {
          patchState(store, { fullLoadedSongs: [...store.fullLoadedSongs(), data]});
          patchState(store, { isLoading: false });
        })
      );
    },
    remove: (id: number) => {
      patchState(store, { isDeleting: [...store.isDeleting(), id] });

      // Simulate a delay for the delete action
      setTimeout(() => {
        songService.remove(id).subscribe(() => {
          const songs = store.songs().filter((song) => song.id !== id);
          patchState(store, { isDeleting: store.isDeleting().filter((item) => item !== id) });
          patchState(store, { songs });
        });
      }, 3000);
    },
  }))
);
