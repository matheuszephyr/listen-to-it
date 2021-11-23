import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//MODELS
import { Music } from './music.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  baseURL = environment.baseUrlApi + "musics";

  constructor(private http: HttpClient) { }

  insertMusic(music: Music): Observable<Music>{
    return this.http.post<Music>(this.baseURL, music);
  }

  listMusic(): Observable<Music[]>{
    return this.http.get<Music[]>(this.baseURL);
  }

  getMusicById(id: number = 0): Observable<Music>{
    const url = `${this.baseURL}/${id}`;
    return this.http.get<Music>(url);
  }

  updateMusic(music: Music): Observable<Music>{
    const url = `${this.baseURL}/${music.id}`;
    return this.http.put<Music>(url, music);
  }

}
