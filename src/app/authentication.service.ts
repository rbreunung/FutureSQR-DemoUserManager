import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { first, Observable, of, Subscriber, tap, throwError } from 'rxjs';
import { User } from './userinfo'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {

  private user?: User;
  private username?: string;
  private password?: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.refreshUserInfo().subscribe({ complete: () => { console.info("Initial user refresh completed.") } });
  }

  isAuthenticated(): boolean {
    return this.user != null;
  }

  authenticate(newPassword?: string, newUsername?: string): Observable<User> {
    if (newUsername) {
      this.username = newUsername;
    }
    if (newPassword) {
      this.password = newPassword;
    }
    let observable = new Observable<User>((subscriber) => {
      if (this.username && this.password) {
        let a = this.http.post<User>('/rest/user/authenticate', {}, { params: new HttpParams().append('username', this.username).append('password', this.password) })
          .pipe(first())
        a.subscribe({
          next: value => {
            this.user = value;
            console.log('Auth: %s', value)
            subscriber.next(value);
            subscriber.complete();
          }, error: error => {
            this.user = undefined;
            console.error('Error: %s', error);
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

  refreshUserInfo(): Observable<User> {
    return this.http.get<User>("/rest/user/info").pipe(first(), tap({
      next: u => this.user = u, error: e => {
        this.user = undefined;
        console.error(e);
      }, complete: () => { console.info("user info updated") }
    }));
  }

  getUserInfo(): User | undefined {
    return this.user;
  }
}
