import { Component, inject } from '@angular/core';
import { AppStore } from '@app/app.store';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
})
export class SongListComponent {
  appStore = inject(AppStore);

  constructor() {
    this.appStore.setTitle('pages.song.list.pageTitle');
  }
}
