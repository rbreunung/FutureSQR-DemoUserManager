import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { BackendModelFullUserEntry, BackendModelSimpleUserEntry } from './backend/model/backend-model-user-entry';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  users?: Map<string, BackendModelFullUserEntry>;

  constructor(private http: HttpClient) { }

  addNewUser(newUser: { [key: string]: any, loginname: string, password: string, displayname: string, email: string, vcsNames: string[] }): Observable<BackendModelFullUserEntry> {
    const path: string = '/rest/user/add';
    let data = new FormData();
    for (let key in newUser) {
      data.append(key, newUser[key]);
    }
    return this.http.post<BackendModelFullUserEntry>(path, data).pipe(tap(u => this.users?.set(u.uuid!, u)));
  }

  editUser(user: { [key: string]: any, uuid: string, displayname?: string, vcsNames?: string[] }): Observable<BackendModelFullUserEntry> {
    const path = '/rest/user/edit';
    let data = new FormData();
    for (let key in user) {
      data.append(key, user[key]);
    }

    return this.http.post<BackendModelFullUserEntry>(path, data);
  }

  banLoginName(uuid: string): Observable<BackendModelFullUserEntry[]> {
    const path = '/rest/user/ban';
    return this.handlePostCommand(uuid, path);
  }
  unbanLoginName(uuid: string): Observable<BackendModelFullUserEntry[]> {
    const path = '/rest/user/unban';
    return this.handlePostCommand(uuid, path);
  }

  getUser(uuid: string): BackendModelFullUserEntry | undefined {
    return this.users?.get(uuid);
  }

  getFullUsers(): Observable<BackendModelFullUserEntry[]> {
    const path = '/rest/user/adminUserList';
    return this.http.get<BackendModelFullUserEntry[]>(path).pipe(tap(v => this.users = new Map(v.map(e => [e.uuid!, e]))));
  }

  getSimpleUsers(): Observable<BackendModelSimpleUserEntry[]> {
    const path = '/rest/user/simpleList';
    return this.http.get<BackendModelSimpleUserEntry[]>(path);
  }

  grantAdminRole(uuid: string) {
    const path = '/rest/user/grantadminrole';
    return this.handlePostCommand(uuid, path);
  }

  revokeAdminRole(uuid: string) {
    const path = '/rest/user/revokeadminrole';
    return this.handlePostCommand(uuid, path);
  }

  private handlePostCommand(uuid: string, path: string): Observable<BackendModelFullUserEntry[]> {
    let data = new FormData();
    data.append("uuid", uuid);
    return this.http.post<BackendModelFullUserEntry>(path, data).pipe(map(v => {
      this.users?.set(v.uuid!, v);
      return Array.from(this.users!.values());
    }));
  }
}

