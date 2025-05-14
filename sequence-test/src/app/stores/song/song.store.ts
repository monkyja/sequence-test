import { Song } from '@models/song.model';
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { SongService } from '@services/song/song.service';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslocoService } from '@jsverse/transloco';
import { ROUTES } from '@const/routes';
import { createSong } from '@app/factories/song.factory';
import { validateSong } from '@app/validations/song/song.validator';

type SongState = {
  isLoading: boolean;
  isDeleting: number[];
  songs: Song[];
  detailedSong?: Song;

  editingSong: Song;
  editingInvalidFields: string[];
  isSaving: boolean;

  fullLoadedSongs: Song[];
};

const initialState: SongState = {
  isLoading: false,
  isDeleting: [],
  songs: [],
  fullLoadedSongs: [],
  editingSong: createSong(),
  editingInvalidFields: [],
  isSaving: false,
};

export const SongStore = signalStore(
  withState(initialState),
  withProps(() => ({
    songService: inject(SongService),
    router: inject(Router),
    messageService: inject(NzMessageService),
    translocoService: inject(TranslocoService),
  })),
  withMethods(
    ({ songService, messageService, router, translocoService, ...store }) => ({
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
      createNewSong: () => {
        patchState(store, { editingSong: createSong() });
      },
      getSong: (id: number) => {
        patchState(store, { isLoading: true });

        const fullLoadedSong =
          store.fullLoadedSongs().find((song) => song.id === id) ?? null;
        if (fullLoadedSong) {
          patchState(store, { isLoading: false });
          return of(fullLoadedSong);
        }

        return songService.getSong(id).pipe(
          tap((data: Song) => {
            patchState(store, {
              fullLoadedSongs: [...store.fullLoadedSongs(), data],
            });
            patchState(store, { isLoading: false });
          })
        );
      },
      getSongForEdit: (id: number, callback: (data: Song) => void ) => {
        patchState(store, { isLoading: true });

        songService.getSong(id)
          .subscribe((data: Song) => {
            patchState(store, { editingSong: data });
            patchState(store, { isLoading: false });
            callback(data);
          });
      },
      saveSong: () => {
        patchState(store, { isSaving: true });

        const invalidFields = validateSong(store.editingSong());
        patchState(store, { editingInvalidFields: invalidFields });

        if(invalidFields.length > 0) {
          patchState(store, { isSaving: false });
          messageService.error(
            translocoService.translate(
              'pages.song.edit.form.actions.confirmations.error.message'
            )
          );
          return;
        }

        if (store.editingSong().id) {
          songService.update(store.editingSong()).subscribe((data: Song) => {
            patchState(store, { editingSong: data });
            patchState(store, { isSaving: false });

            messageService.success(
              translocoService.translate(
                'pages.song.edit.form.actions.confirmations.updated.message',
                { title: data.title }
              )
            );
          });
        } else {
          songService.create(store.editingSong()).subscribe((data: Song) => {
            patchState(store, { editingSong: data });
            patchState(store, { isSaving: false });

            const editRoute = ROUTES.SONG.EDIT.replace(':id', String(data.id));
            router.navigate([editRoute]).then();

            messageService.success(
              translocoService.translate(
                'pages.song.edit.form.actions.confirmations.created.message',
                { title: data.title }
              )
            );
          });
        }
      },
      remove: (id: number) => {
        patchState(store, { isDeleting: [...store.isDeleting(), id] });

        // Simulate a delay for the delete action
        setTimeout(() => {
          songService.remove(id).subscribe(() => {
            const songs = store.songs().filter((song) => song.id !== id);
            patchState(store, {
              isDeleting: store.isDeleting().filter((item) => item !== id),
            });
            patchState(store, { songs });
          });
        }, 3000);
      },
    })
  )
);
