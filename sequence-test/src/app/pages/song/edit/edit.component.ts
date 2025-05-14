import { Component, inject, OnInit } from '@angular/core';
import { SongStore } from '@app/stores/song/song.store';
import { ArtistStore } from '@app/stores/artist/artist.store';
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
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { GENRES } from '@const/genres';
import { GenreStore } from '@stores/song/genre.store';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzMarks, NzSliderModule } from 'ng-zorro-antd/slider';
import dayjs from 'dayjs';

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
    NzInputNumberModule,
    NzTimePickerModule,
    NzSliderModule,
    TranslocoPipe,
  ],
  templateUrl: './edit.component.html',
})
export class EditSongPageComponent implements OnInit {
  songStore = inject(SongStore);
  appStore = inject(AppStore);
  artistStore = inject(ArtistStore);
  genreStore = inject(GenreStore);

  constructor(private route: ActivatedRoute) {}

  dayjs = dayjs;
  GENRES = GENRES;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (!id) {
        this.songStore.createNewSong();
        this.appStore.setTitle('pages.song.edit.pageTitle.new');
        return;
      }

      this.songStore.getSongForEdit(id, (data: Song) => {
        this.appStore.setTitle('pages.song.edit.pageTitle.edit', {
          title: data.title,
        });
      });
    });
  }

  onArtistSearch(textFilter: string): void {
    this.artistStore.getArtistsFiltered(textFilter);
  }

  onGenreSearch(textFilter: string): void {
    this.genreStore.getGenresFiltered(textFilter);
  }

  sliderDurationMarks: NzMarks = {
    0: '0:00',
    30: '0:30',
    60: '1:00',
    90: '1:30',
    120: '2:00',
    150: '2:30',
    180: '3:00',
    210: '3:30',
    240: '4:00',
    270: '4:30',
    300: '5:00',
    330: '5:30',
    360: '6:00',
  };

  sliderRatingMarks: NzMarks = {
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10',
  };

  getDurationInTimeFormat(): string {
    if (!this.songStore.editingSong()) return '0:00';

    return dayjs(this.songStore.editingSong().duration * 1000).format('mm:ss');
  }

  onSave() {
    if (!this.songStore.editingSong()) return;

    this.songStore.saveSong();
  }
}
