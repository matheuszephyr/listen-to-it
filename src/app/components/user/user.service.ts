import { BaseService } from './../services/base-service.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User, UserSession } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceTest extends BaseService {

  private baseURL = environment.baseUrlApi + "users";
  private userSession: UserSession = { id: 0 };

  private urlgabs = "http://192.168.15.7:3333/login";

  private userTokenT: string = "";

  constructor(private https: HttpClient) {
    super(https);
  }

  insertUser(user: User): Observable<User>{
    return this.https.post<User>(this.baseURL, user);
  }

  listUser(): Observable<User[]>{
    return this.https.get<User[]>(this.baseURL);
  }

  getUserById(id: number = 0): Observable<User>{
    const url = `${this.baseURL}/${id}`;
    return this.https.get<User>(url);
  }

  updateUser(user: User): Observable<User>{
    const url = `${this.baseURL}/${user.id}`;
    return this.https.put<User>(url, user);
  }

  // login(email: string, passwordHash: string){
  //   const url = this.baseURL + `?email=${email}&passwordHash=${passwordHash}`
  //   return this.https.get<User[]>(url);
  // }

  generateUserToken(user: User){
    this.encryptUser(user);
  }

  private encryptUser(user: User){
    let userHide: UserSession = {
      id: user.id,
      userType: user.userType
    }      

    let userJson = JSON.stringify(userHide);
    this.userTokenT = btoa(userJson);
  }

  private decryptUser(): UserSession{
    if(this.userTokenT.length > 0){
      let tokenJson = atob(this.userTokenT);
      let userResult: UserSession = JSON.parse(tokenJson);      
      return userResult;
    }
    else{
      return this.userSession;
    }
  }

  public resetToken(){
    this.userTokenT = "";
    let newSession: UserSession = { id: 0};
    this.userSession = newSession;
  }

  // public getUserId(){
  //   return this.decryptUser().id ?? 0;
  // }

  // public loged(){
  //   let result = this.userTokenT.length > 0;
  //   return result;
  // }

  public testee(): Observable<any>{

    let login = {
      email: "admin@listentoit.com",
      password: "123456"
    }

    let result = this.https.post<any>(this.urlgabs, login);
     return  result;

  }


}
