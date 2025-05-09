import { Routes } from '@angular/router';
import { ROUTES } from '@const/routes';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: ROUTES.HOME, loadChildren: () => import('./pages/home/homePage.routes').then(m => m.WELCOME_ROUTES) },
  { path: '', loadChildren: () => import('./pages/song/song.routes').then(m => m.SONGS_ROUTES) },
];
