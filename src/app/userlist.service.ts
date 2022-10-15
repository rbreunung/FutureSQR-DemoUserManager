import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SimpleUser } from './userinfo';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(private http: HttpClient) { }

  getSimpleUsers(): Observable<SimpleUser[]> {
    const path = '/rest/user/simplelist';
    return this.http.get<SimpleUser[]>(path);
  }
}
