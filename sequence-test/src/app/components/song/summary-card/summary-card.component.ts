import { Component, Input } from '@angular/core';
import { Song } from '@app/models/song.model';
import { TranslocoPipe } from '@jsverse/transloco';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
  selector: 'app-song-summaryCard',
  imports: [TranslocoPipe, NzCardModule, NzIconModule, NzBadgeModule],
  templateUrl: './summary-card.component.html',
})
export class SummaryCardComponent {
  @Input() song?: Song;
}
