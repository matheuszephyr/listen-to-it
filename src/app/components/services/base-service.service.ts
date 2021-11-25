import { ResponseCode, ServiceResponse } from './service.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private userToken = null;
  private systemToken = null;
  private userExpiration = new Date;
  private systemExpiration = new Date;

  constructor(private http: HttpClient) { }

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
        console.log("completelogin")
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

    return this.http.post<any>(environment.baseUrlApiProd + action + stringQuery, bodyParams, options);
  }

  requestDelete(action: string, queryParams = null, system = false): Observable<any> {
    let options = this.getCommomOptions(system);
    let stringQuery = "";

    if (queryParams != null) {
      stringQuery = "?" + this.objectToQueryString(queryParams);
    }

    return this.http.delete<any>(environment.baseUrlApiProd + action + stringQuery, options);
  }

  private objectToQueryString(object: object): string {
    const qs = Object.keys(object)
      .map(key => `${key}=${object[key]}`)
      .join('&');

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
