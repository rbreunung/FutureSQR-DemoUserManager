import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SayHelloService {

  constructor(private http: HttpClient) { }

  postServerHello(name: string): Observable<any> {
    let p = new HttpParams().append("name", name);
    return this.http.post("/rest/say-hello", {}, { params: p, responseType: 'text' }).pipe(first());
  }
}
