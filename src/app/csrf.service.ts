import { Injectable } from '@angular/core';
import { CsrfToken } from './csrf';
import { first, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CsrfService {

  constructor(private http: HttpClient) { }

  getCsrfTokenDemo(): Observable<CsrfToken> {
    return of({ token: "token", parameterName: "parameterName", headerName: "headerName" });
  }

  getCsrfToken(): Observable<CsrfToken> {
    return this.http.get<CsrfToken>("/rest/login/csrf", {}).pipe(first());
  }
}
