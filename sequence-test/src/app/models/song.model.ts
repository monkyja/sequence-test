import { Artist } from "@models/artist.model";

export interface Song {
    id: number;
    title: string;
    poster: string;
    genre: string[];
    year: number;
    duration: number;
    rating: number;
    artist: Artist;
}
