import { Routes } from '@angular/router';
import { SongListComponent } from './list/list.component';
import { ROUTES } from '@const/routes';

export const SONGS_ROUTES: Routes = [
  { path: ROUTES.SONG.LIST, component: SongListComponent },
  {
    path: ROUTES.SONG.NEW,
    loadComponent: () =>
      import('./edit/edit.component').then((m) => m.EditSongPageComponent),
  },
  {
    path: ROUTES.SONG.EDIT,
    loadComponent: () =>
      import('./edit/edit.component').then((m) => m.EditSongPageComponent),
  },
  {
    path: ROUTES.SONG.SHOW,
    loadComponent: () =>
      import('./show/show.component').then((m) => m.SongShowComponent),
  },
];
