import { Injectable } from '@angular/core';
import { CsrfToken } from './csrf';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsrfService {

  constructor() { }

  getCsrfToken(): Observable<CsrfToken> {
    return of({ token: "token", parameterName: "parameterName", headerName: "headerName" });
  }
}
