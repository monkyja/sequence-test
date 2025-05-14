import { Component, inject, Input } from '@angular/core';
import { Song } from '@app/models/song.model';
import { translate, TranslocoPipe } from '@jsverse/transloco';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { SongStore } from '@stores/song/song.store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';
import { ROUTES } from '@const/routes';

@Component({
  selector: 'app-song-summaryCard',
  imports: [TranslocoPipe, NzCardModule, NzIconModule, NzBadgeModule, NzModalModule, NzButtonModule],
  templateUrl: './summary-card.component.html',
})
export class SummaryCardComponent {
  @Input() song?: Song;

  constructor(
    private modal: NzModalService,
    private router: Router
  ) {}

  songStore = inject(SongStore);

  onDetail() {
    if (!this.song) return;

    const newUrl = ROUTES.SONG.SHOW.replace(":id", this.song.id!.toString());

    this.router.navigate([newUrl]);
  }

  onEdit() {
    if (!this.song) return;

    const newUrl = ROUTES.SONG.EDIT.replace(":id", this.song.id!.toString());

    this.router.navigate([newUrl]);
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
      nzOnOk: () => this.songStore.remove(this.song!.id!),
      nzCancelText: translate('default.cancel'),
    });
  }
}
