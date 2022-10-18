import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { SimpleUser, User } from './userinfo';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  users?: Map<string, User>;

  constructor(private http: HttpClient) { }

  addNewUser(user: User): Observable<User> {
    const path: string = '/rest/user/add';
    console.log(user);
    return this.http.post<User>(path, user).pipe(tap(u => this.users?.set(u.uuid!, u)));
  }

  editUser(user: User): Observable<User> {
    const path = '/rest/user/editUser';
    this.users?.set(user.uuid!, user);
    return this.http.put<User>(path, user);
  }

  banLoginName(loginName: string): Observable<User[]> {
    const path = '/rest/user/ban';
    return this.http.post<User>(path, {}, { params: new HttpParams().append('loginName', loginName) }).pipe(map(v => {
      this.users?.set(v.uuid!, v);
      return Array.from(this.users!.values())
    }));
  }
  unbanLoginName(loginName: string): Observable<User[]> {
    const path = '/rest/user/unban';
    return this.http.post<User>(path, {}, { params: new HttpParams().append('loginName', loginName) }).pipe(map(v => {
      this.users?.set(v.uuid!, v);
      return Array.from(this.users!.values())
    }));
  }

  changeDisplayName(user: User): Observable<User> {
    const path = '/rest/user/updateDisplayName';
    return this.http.post<User>(path, {}, { params: new HttpParams().append('loginName', user.loginName).append('displayName', user.displayName) });
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
