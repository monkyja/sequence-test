import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStore } from '@app/app.store';
import { Song } from '@app/models/song.model';
import { SongStore } from '@stores/song/song.store';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { translate, TranslocoPipe } from '@jsverse/transloco';
import { ROUTES } from '@const/routes';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-show',
  imports: [
    NzSpinModule,
    NzRateModule,
    NzIconModule,
    FormsModule,
    TranslocoPipe,
    NzButtonModule,
    NzModalModule,
  ],
  templateUrl: './show.component.html',
})
export class SongShowComponent {
  appStore = inject(AppStore);
  songStore = inject(SongStore);

  song?: Song;

  constructor(
    private route: ActivatedRoute,
    private modal: NzModalService,
    private router: Router
  ) {
    this.appStore.setTitle('pages.song.show.pageTitle');
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (!id) return;

      this.songStore.getSong(id).subscribe((data: Song) => {
        this.song = data;
      });
    });
  }

  onDelete() {
    if (!this.song) return;

    this.modal.confirm({
      nzTitle: translate('components.song.summaryCard.actions.delete.title'),
      nzContent: translate(
        'components.song.summaryCard.actions.delete.message',
        { title: this.song.title }
      ),
      nzOkText: translate('default.delete'),
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.songStore.remove(this.song!.id),
      nzCancelText: translate('default.cancel'),
    });
  }
}
