import { CollaborationFilter, UserCollaboration } from './../shared/collaboration.model';
import { Observable } from 'rxjs';
import { BaseService } from './base-service.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollaborationService extends BaseService {

  private _baseAction = "collaborations"

  constructor(private https: HttpClient) {
    super(https);
  }

  listCollaboration(filter: CollaborationFilter): Observable<UserCollaboration[]> {
    return this.requestGet(this._baseAction, filter, true);
  }

  insertCollaboration(collaboration: UserCollaboration): Observable<UserCollaboration> {
    return this.requestPost(this._baseAction, collaboration, true);
  }
}
