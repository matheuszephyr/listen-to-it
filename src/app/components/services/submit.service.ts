import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service.service';
import { Injectable } from '@angular/core';
import { Submit } from '../submit/submit.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmitService extends BaseService {

  baseAction = "submits";

  constructor(private https: HttpClient) {
    super(https)
  }

  listSubmits(filter = null): Observable<Submit[]> {
    return this.requestGet(this.baseAction, filter, false);
  }

  getSubmitById(id: number = 0): Observable<Submit> {
    const url = `${this.baseAction}/${id}`;
    return this.requestGet(url, null, false);
  }

  insertSubmit(submit: Submit): Observable<Submit> {
    return this.requestPost(this.baseAction, submit, false);
  }

  updateSubmit(submit: Submit): Observable<Submit> {
    const url = `${this.baseAction}/${submit.id}`;
    return this.requestPut(url, null, submit, false);
  }

  //VALIDA OS LINKS INFORMADOS
  validExternalCode(value: string, codeType: string): string {
    console.log(value)
    if (value != undefined && value != null && value != "") {
      if (value.includes("https://")) {
        if (value.includes(codeType)) {
          return this.extractExternalCode(value, codeType);
        }
      }
      return "invalid";
    }
    else {
      console.log("Link invalido")
      return null;
    }
  }

  //EXTRAI O CODIGO A PARTIR DOS LINKS
  extractExternalCode(value: string, codeType: string): string {
    if (value.includes("spotify")) {
      value = value.replace(codeType, "");
      let siIndex = value.indexOf("?si=");
      value = value.slice(0, siIndex);
      return value;
    }
    if (value.includes("youtube")) {
      value = value.replace(codeType, "");
      let siIndex = value.indexOf("&");
      value = value.slice(0, siIndex);
      return value;
    }
  }
}
