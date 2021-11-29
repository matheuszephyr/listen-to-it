import { User } from './../user/user.model';
import { ResponseCode, ServiceResponse } from './service.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { isNullOrEmpty, isNullOrUndefined } from '../util/validations';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private userTokenDev!: User;

  private userToken = null;
  private systemToken = null;
  private userExpiration = new Date;
  private systemExpiration = new Date;

  constructor(private http: HttpClient) { }


  async login(user = null, system = false): Promise<ServiceResponse> {
    let params = {
      email: user.email,
      passwordHash: btoa(user.password)
    }

    let loginPromisse = new Promise<ServiceResponse>((resolve, rejects) => {

      this.requestGet("users", params, system).subscribe({
        next: (result) => {
          if (!isNullOrUndefined(result[0]) && (result[0].id ?? 0 > 0)) {
            this.setCookie("token", result[0]);
            let resp: ServiceResponse = {
              statusCode: ResponseCode.OK,
              message: "Login realizado com sucesso!",
              result: true
            }
            resolve(resp)
          }
          else {
            this.userTokenDev = null;
            let respFail: ServiceResponse = {
              statusCode: ResponseCode.BadRequest,
              message: "Usuário ou Senha incorreto(s)!",
              result: false
            }
            resolve(respFail);
          }
        },
        error: (error) => {
          console.log("falha no login", error);
          rejects(error);
        }
      });

    });

    return loginPromisse;
  }

  setCookie(key: string, object){
    localStorage.setItem(key, JSON.stringify(object))
  }

  getCookie(key: string){
    if(!isNullOrUndefined(localStorage.getItem(key))){
      return JSON.parse(localStorage.getItem(key));
    }
    else{
      return null;
    }     
  }

  public logOut(){
    localStorage.removeItem("token");
  }

  public getUserToken(): User{    
    return this.getCookie("token");
  }

  public getUserId(): number{
    let userToken = this.getUserToken();
    return userToken?.id ?? 0;
  }

  public loged(): boolean{
    return this.getUserId() > 0;
  }


  executeLogin(user = null, system = false): any {

    this.http.post<ServiceResponse>(environment.baseUrlApiProd + "login", user).subscribe({
      next: (resp) => {
        if (resp.statusCode == ResponseCode.OK) {
          if (system) {
            this.systemToken = resp.result;
          }
          else {
            this.userToken = resp.result;
          }
        }
        else
          return resp;
      },
      error: (error) => {
        let response: ServiceResponse = {
          statusCode: ResponseCode.InternalServerError,
          message: String(error)
        }
        return response;
      },
      complete: () => {
      }
    });

  }



  requestPost(action: string, bodyParams = null, system = false): Observable<any> {
    let options = this.getCommomOptions(system, true);
    return this.http.post<any>(environment.baseUrlApiProd + action, bodyParams, options);
  }

  requestGet(action: string, queryParams = null, system = false): Observable<any> {
    let options = this.getCommomOptions(system);
    let stringQuery = "";

    if (queryParams != null) {
      stringQuery = "?" + this.objectToQueryString(queryParams);
    }

    return this.http.get<any>(environment.baseUrlApiProd + action + stringQuery, options);
  }

  requestPut(action: string, queryParams = null, bodyParams = null, system = false): Observable<any> {
    let options = this.getCommomOptions(system);
    let stringQuery = "";

    if (queryParams != null) {
      stringQuery = "?" + this.objectToQueryString(queryParams);
    }

    return this.http.put<any>(environment.baseUrlApiProd + action + stringQuery, bodyParams, options);
  }

  requestDelete(action: string, queryParams = null, system = false): Observable<any> {
    let options = this.getCommomOptions(system);
    let stringQuery = "";

    if (queryParams != null) {
      stringQuery = "?" + this.objectToQueryString(queryParams);
    }

    return this.http.delete<any>(environment.baseUrlApiProd + action + stringQuery, options);
  }

  private objectToQueryString(object: any): string {
    let qs = "";
    Object.keys(object)
      .map(key => {
        if (!isNullOrEmpty(object[key])) {
          qs += `${key}=${object[key]}&`
        }
      });
    qs = qs.slice(0, -1);
    console.log("qs:", qs);
    return qs;
  }

  private getCommomOptions(system = false, json = false): any {

    let headers = new HttpHeaders();
    let token = system ? this.systemToken : this.userToken;

    if (!json)
      headers = headers.set('Authorization', 'Bearer ' + token);
    else
      headers = headers.set('Content-Type', 'application/json; charset=utf-8')//.set('Authorization', 'Bearer ' + token);

    return {
      headers: headers
    }

  }
}
