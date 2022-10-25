import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { first, Observable, of, Subscriber, tap, throwError } from 'rxjs';
import { BackendModelFullUserEntry } from './backend/model/backend-model-user-entry';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {

  private user?: BackendModelFullUserEntry;
  private loginName?: string;
  private password?: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.refreshUserInfo().subscribe({ complete: () => { console.info("Initial user refresh completed.") } });
  }

  isAuthenticated(): boolean {
    return this.user != null;
  }

  authenticate(newLoginName?: string, newPassword?: string): Observable<BackendModelFullUserEntry> {
    if (newLoginName) {
      this.loginName = newLoginName;
    }
    if (newPassword) {
      this.password = newPassword;
    }
    let observable = new Observable<BackendModelFullUserEntry>((subscriber) => {
      if (this.loginName && this.password) {

        // let params = new HttpParams().append('loginname', this.loginName).append('password', this.password)
        let part = new FormData()
        part.append("loginname", this.loginName)
        part.append("password", this.password)

        // let a = this.http.post<BackendModelFullUserEntry>('/rest/user/authenticate2', {}, { params: params })
        let a = this.http.post<BackendModelFullUserEntry>('/rest/user/authenticate', part)
          .pipe(first())
        a.subscribe({
          next: value => {
            this.user = value;
            console.log('Auth: %s', value)
            subscriber.next(value);
            subscriber.complete();
          }, error: error => {
            this.user = undefined;
            console.error(error);
            subscriber.error(error);
            subscriber.complete();
          }
        });
      } else {
        this.user = undefined;
        console.error('missing credentials');
        subscriber.error('missing credentials');
        subscriber.complete();
      }
      return { unsubscribe() { } };
    })
    return observable;

  }

  refreshUserInfo(): Observable<BackendModelFullUserEntry> {
    return this.http.get<BackendModelFullUserEntry>("/rest/user/info").pipe(first(), tap({
      next: u => this.user = u, error: e => {
        this.user = undefined;
        console.error(e);
      }, complete: () => { console.info("user info updated") }
    }));
  }

  getUserInfo(): BackendModelFullUserEntry | undefined {
    return this.user;
  }

  logout() {
    this.http.post("/rest/user/logout", null).pipe(first()).subscribe()
    this.user = undefined
    this.loginName = undefined
    this.password = undefined
    //TODO send some global reset event to delete all cached values from the other services
  }
}
