import { Component, inject } from '@angular/core';
import { AppStore } from '@app/app.store';
import { SongStore } from '@stores/song/song.store';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { SummaryCardComponent } from '@components/song/summary-card/summary-card.component';

@Component({
  imports: [NzGridModule, NzListModule, NzSpinModule, NzEmptyModule, SummaryCardComponent],
  templateUrl: './list.component.html',
})
export class SongListComponent {
  appStore = inject(AppStore);
  songStore = inject(SongStore);

  songs = this.songStore.getSongs();

  constructor() {
    this.appStore.setTitle('pages.song.list.pageTitle');
  }
}
