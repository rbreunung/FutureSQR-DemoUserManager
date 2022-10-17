import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SimpleUser, User } from './userinfo';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  users?: Map<string, User>;

  constructor(private http: HttpClient) { }

  addNewUser(user: User): Observable<User> {
    const path = '/rest/user/add';
    console.log(user);
    return this.http.post<User>(path, user).pipe(tap(u => this.users?.set(u.uuid!, u)));
  }

  editUser(user: User): Observable<User> {
    const path = '/rest/user/editUser';
    this.users?.set(user.uuid!, user);
    return this.http.put<User>(path, user);
  }

  changeDisplayName(user: User): Observable<User> {
    const path = '/rest/user/changeDisplayName';
    return this.http.put<User>(path, {}, { params: new HttpParams().append('uuid', user.uuid!).append('displayName', user.displayName) });
  }

  getUser(uuid: string): User | undefined {
    return this.users?.get(uuid);
  }

  getAdminUsers(): Observable<User[]> {
    const path = '/rest/user/adminUserList';
    return this.http.get<User[]>(path).pipe(tap(v => this.users = new Map(v.map(e => [e.uuid!, e]))));
  }

  getSimpleUsers(): Observable<SimpleUser[]> {
    const path = '/rest/user/simpleList';
    return this.http.get<SimpleUser[]>(path);
  }
}
