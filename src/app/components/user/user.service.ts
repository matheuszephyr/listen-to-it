import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User, UserSession } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = environment.baseUrlApi + "users";
  private userSession: UserSession = { id: 0 };

  private userToken: string = "";

  constructor(private http: HttpClient) { }

  insertUser(user: User): Observable<User>{
    return this.http.post<User>(this.baseURL, user);
  }

  listUser(): Observable<User[]>{
    return this.http.get<User[]>(this.baseURL);
  }

  getUserById(id: number = 0): Observable<User>{
    const url = `${this.baseURL}/${id}`;
    return this.http.get<User>(url);
  }

  updateUser(user: User): Observable<User>{
    const url = `${this.baseURL}/${user.id}`;
    return this.http.put<User>(url, user);
  }

  login(email: string, password: string){
    const url = this.baseURL + `?email=${email}&password=${password}`
    return this.http.get<User[]>(url);
  }

  generateUserToken(user: User){
    this.encryptUser(user);
  }

  private encryptUser(user: User){
    let userHide: UserSession = {
      id: user.id,
      email: user.email,
      name: user.name,
      userType: user.userType,
      photo: user.photo,
      createdAt: user.createdAt,
    }      

    let userJson = JSON.stringify(userHide);
    this.userToken = btoa(userJson);
  }

  private decryptUser(): UserSession{
    if(this.userToken.length > 0){
      let tokenJson = atob(this.userToken);
      let userResult: UserSession = JSON.parse(tokenJson);      
      return userResult;
    }
    else{
      return this.userSession;
    }
  }

  public resetToken(){
    this.userToken = "";
    let newSession: UserSession = { id: 0};
    this.userSession = newSession;
  }

  public getUserId(){
    return this.decryptUser().id ?? 0;
  }

  public loged(){
    let result = this.userToken.length > 0;
    console.log(this.userToken);
    console.log(this.userToken.length);
    console.log(result);
    return result;
  }


}
