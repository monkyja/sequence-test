import { Component, inject } from '@angular/core';
import { AppStore } from '@app/app.store';
import { SongStore } from '@stores/song/song.store';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { SummaryCardComponent } from '@components/song/summary-card/summary-card.component';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslocoPipe } from '@jsverse/transloco';
import { ROUTES } from '@const/routes';

@Component({
  imports: [
    NzGridModule,
    NzListModule,
    NzSpinModule,
    NzEmptyModule,
    SummaryCardComponent,
    NzButtonModule,
    TranslocoPipe,
  ],
  templateUrl: './list.component.html',
})
export class SongListComponent {
  appStore = inject(AppStore);
  songStore = inject(SongStore);

  songs = this.songStore.getSongs();

  constructor(private router: Router) {
    this.appStore.setTitle('pages.song.list.pageTitle');
  }

  onCreate() {
    this.router.navigate([ROUTES.SONG.NEW]).then(() => {});
  }
}
