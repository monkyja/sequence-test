import { Song } from "@models/song.model";

export interface Artist {
    id: number;
    name: string;
    bornCity: string;
    birthdate: string;
    img: string;
    rating: number;
    songs: Song[];
}