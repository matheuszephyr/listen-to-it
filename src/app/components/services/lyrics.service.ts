import { BaseService } from './base-service.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lyrics } from '../lyrics/lyrics.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LyricsService extends BaseService{

  baseAction = "lyrics";

  constructor(private https: HttpClient) {
    super(https)
  }

  insertLyrics(lyrics: Lyrics): Observable<Lyrics> {
    return this.requestPost(this.baseAction, lyrics, true);
  }

  listLyrics(): Observable<Lyrics[]> {
    return this.requestGet(this.baseAction, null, true);
  }

  getLyricsById(id: number = 0): Observable<Lyrics> {
    const url = `${this.baseAction}/${id}`;
    return this.requestGet(url);
  }

  updateLyrics(lyrics: Lyrics): Observable<Lyrics> {
    const url = `${this.baseAction}/${lyrics.id}`;
    return this.requestPut(url, null, lyrics, true);
  }

  getLyricsByFilter(filter: any, system): Observable<Lyrics[]> {
    return this.requestGet(this.baseAction, filter, system);
  }
}
