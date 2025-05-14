import { Song } from '@models/song.model'
import dayjs from 'dayjs';

export const createSong = (song: Partial<Song> = {}): Song => {
  return {
    id: undefined,
    title: '',
    rating: 5,
    duration: 180,
    genre: [],
    poster: 'http://dummyimage.com/400x600.png/5fa2dd/00000',
    year: dayjs().year(),
    artistId: undefined,
    ...song,
  };
};
