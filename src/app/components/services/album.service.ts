import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service.service';
import { Injectable } from '@angular/core';
import { Album } from '../album/album.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends BaseService {

  baseAction = "albums";

  constructor(private https: HttpClient) {
    super(https)
  }

  listAlbums(filter = null): Observable<Album[]> {
    return this.requestGet(this.baseAction, filter, false);
  }

  getAlbumById(id: number = 0): Observable<Album> {
    const url = `${this.baseAction}/${id}`;
    return this.requestGet(url, null, false);
  }

  
}
