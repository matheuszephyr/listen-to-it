import { BaseService } from './base-service.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//MODELS
import { environment } from 'src/environments/environment';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

  baseAction = "users";

  constructor(private https: HttpClient) {
    super(https)
  }

  insertUser(user: User): Observable<User> {
    return this.requestPost(this.baseAction, user);
  }

  listUser(filter, system = false): Observable<User[]> {
    return this.requestGet(this.baseAction, filter, system);
  }

  getUserById(id: number = 0, system = false): Observable<User> {
    const url = `${this.baseAction}/${id}`;
    return this.requestGet(url, null, system);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.baseAction}/${user.id}`;
    return this.requestPut(url, null, user);
  }
}
