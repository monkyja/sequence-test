import { Component, inject, Input } from '@angular/core';
import { Song } from '@app/models/song.model';
import { translate, TranslocoPipe } from '@jsverse/transloco';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { SongStore } from '@stores/song/song.store';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-song-summaryCard',
  imports: [TranslocoPipe, NzCardModule, NzIconModule, NzBadgeModule, NzModalModule, NzButtonModule],
  templateUrl: './summary-card.component.html',
})
export class SummaryCardComponent {
  @Input() song?: Song;

  constructor(private modal: NzModalService) {}

  songStore = inject(SongStore);

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
