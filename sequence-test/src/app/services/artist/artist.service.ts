import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '@app/models/artist.model';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getArtistsWithTextFiltered(textFilter: string = ''): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.apiUrl}/artists?name_like=${textFilter}`);
  }
}
