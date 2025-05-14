import { Song } from "@app/models/song.model";

export const validateSong = (song: Song) => {
  const invalidFields: string[] = [];

  if(!song.title) {
    invalidFields.push('title');
  }

  if(!song.poster) {
    invalidFields.push('poster');
  }

  if(!song.artistId) {
    invalidFields.push('artistId');
  }

  if(!song.genre || song.genre.length === 0 || song.genre.length > 3) {
    invalidFields.push('genre');
  }

  if(!song.year || song.year < 1900 || song.year > new Date().getFullYear() + 1) {
    invalidFields.push('year');
  }

  return invalidFields;
};
