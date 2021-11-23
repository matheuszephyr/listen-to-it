import { Lyrics } from './lyrics.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LyricsService {

  private baseURL = environment.baseUrlApi + "lyrics";

  constructor(private http: HttpClient) { }

  insertLyrics(lyrics: Lyrics): Observable<Lyrics> {
    return this.http.post<Lyrics>(this.baseURL, lyrics);
  }

  listLyrics(): Observable<Lyrics[]> {
    return this.http.get<Lyrics[]>(this.baseURL);
  }

  getLyricsById(id: number = 0): Observable<Lyrics> {
    const url = `${this.baseURL}/${id}`;
    return this.http.get<Lyrics>(url);
  }

  updateLyrics(lyrics: Lyrics): Observable<Lyrics> {
    const url = `${this.baseURL}/${lyrics.id}`;
    return this.http.put<Lyrics>(url, lyrics);
  }

  getLyricsByFilter(idMusic: number, language?: string, original?: boolean) {
    let url = this.baseURL + `?idMusic=${idMusic}`

    if (language != null)
      url += `&language=${language}`
    if (original != null)
      url += `&original=${original}`

    return this.http.get<Lyrics[]>(url);
  }

}
