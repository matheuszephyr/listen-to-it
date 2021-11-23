import { MusicSubmit } from './../music/music.model';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Messages } from '../util/messages'

@Injectable({
  providedIn: 'root'
})
export class SubmitService {

  baseURL = environment.baseUrlApi + "submits"

  constructor(private http: HttpClient, private message: Messages) { }

  listSubmits(){
    return this.http.get(this.baseURL);
  }

  getSubmitById(id: number = 0): Observable<MusicSubmit>{
    const url = `${this.baseURL}/${id}`;
    return this.http.get<MusicSubmit>(url);
  }

  insertSubmit(submit: MusicSubmit): Observable<MusicSubmit>{    
    return this.http.post<MusicSubmit>(this.baseURL, submit);
  }

  updateMusic(music: MusicSubmit): Observable<MusicSubmit>{
    const url = `${this.baseURL}/${music.id}`;
    return this.http.put<MusicSubmit>(url, music);
  }


}
