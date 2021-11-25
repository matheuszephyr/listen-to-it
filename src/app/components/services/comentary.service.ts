import { Observable } from 'rxjs';
import { MusicComentary } from './../music/comentary.model';
import { BaseService } from './base-service.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComentaryService extends BaseService {

  private _baseAction = "comentary"

  constructor(private https: HttpClient) {
    super(https);
  }

  listComentary(_idMusic: number): Observable<MusicComentary[]>{
    return this.requestGet(this._baseAction, { idMusic: _idMusic})
  }

  insertComentary(coment: MusicComentary): Observable<MusicComentary>{
    return this.requestPost(this._baseAction, coment);
  }

  updateComentary(coment: MusicComentary): Observable<MusicComentary>{
    return this.requestPut(this._baseAction, null, coment);
  }
}
