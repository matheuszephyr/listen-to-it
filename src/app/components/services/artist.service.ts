import { Artist } from './../artist/artist.model';
import { BaseService } from './base-service.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService extends BaseService{

  baseAction = "artists";

  constructor(private https: HttpClient) {
    super(https)
  }

  listArtist(filter = null): Observable<Artist[]> {
    return this.requestGet(this.baseAction, filter, false);
  }

  getArtistById(id: number = 0): Observable<Artist> {
    const url = `${this.baseAction}/${id}`;
    return this.requestGet(url, null, false);
  }
  
}
