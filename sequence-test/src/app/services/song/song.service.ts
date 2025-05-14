import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '@app/models/song.model';

@Injectable({
    providedIn: 'root'
})
export class SongService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiUrl}/songs?_embed=artist`);
  }

  getSong(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrl}/songs/${id}?_embed=artist`);
  }

  create(song: Song): Observable<Song> {
    return this.http.post<Song>(`${this.apiUrl}/songs`, song);
  }

  update(song: Song): Observable<Song> {
    return this.http.put<Song>(`${this.apiUrl}/songs/${song.id}`, song);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/songs/${id}`);
  }
}
