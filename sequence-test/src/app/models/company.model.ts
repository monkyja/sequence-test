import { Song } from "@models/song.model";

export interface Company {
    id: number;
    name: string;
    country: string;
    createYear: number;
    employees: number;
    rating: number;
    songs: Song[];
}