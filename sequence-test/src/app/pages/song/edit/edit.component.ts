import { Component, inject, OnInit } from '@angular/core';
import { SongStore } from '@app/stores/song/song.store';
import { ActivatedRoute } from '@angular/router';
import { AppStore } from '@app/app.store';
import { Song } from '@app/models/song.model';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  imports: [
    ReactiveFormsModule,
    NzSpinModule,
    FormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    TranslocoPipe,
  ],
  templateUrl: './edit.component.html',
})
export class EditSongPageComponent implements OnInit {
  songStore = inject(SongStore);
  appStore = inject(AppStore);

  song?: Song;
  isEditing = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (!id) {
        this.song = {} as Song;
        this.appStore.setTitle('pages.song.edit.pageTitle.new');
        return;
      }

      this.songStore.getSong(id).subscribe((data: Song) => {
        this.song = data;
        this.isEditing = true;
        this.appStore.setTitle('pages.song.edit.pageTitle.edit', {
          title: data.title,
        });
      });
    });
  }

  onSave() {
    if (!this.song) return;

    // TODO: Add validation
  }
}
