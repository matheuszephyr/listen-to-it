import { BaseService } from './base-service.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//MODELS
import { environment } from 'src/environments/environment';
import { Music, MusicFilter } from '../music/music.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService extends BaseService {

  baseAction = "musics";

  constructor(private https: HttpClient) {
    super(https)
  }

  insertMusic(music: Music): Observable<Music> {
    return this.requestPost(this.baseAction, music);
  }

  listMusic(filter: MusicFilter, system = false): Observable<Music[]> {
    return this.requestGet(this.baseAction, filter, system);
  }

  getMusicById(id: number = 0, system = false): Observable<Music> {
    const url = `${this.baseAction}/${id}`;
    return this.requestGet(url, null, system);
  }

  updateMusic(music: Music): Observable<Music> {
    const url = `${this.baseAction}/${music.id}`;
    return this.requestPut(url, null, music);
  }

}
