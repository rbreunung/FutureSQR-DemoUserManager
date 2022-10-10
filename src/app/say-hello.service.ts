import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SayHelloService {

  constructor(private http: HttpClient) { }

  postServerHello(name: string): Observable<string> {
    let p = new HttpParams();
    p.append("name", name);
    return this.http.post<string>("/rest/say-hello", {}, { params: p }).pipe(first());
  }
}
