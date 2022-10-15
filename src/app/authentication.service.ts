import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, of, Subscriber, throwError } from 'rxjs';
import { UserInfo } from './userinfo'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user?: UserInfo;
  private username?: string;
  private password?: string;

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    return this.user != null;
  }

  authenticate(newPassword?: string, newUsername?: string): Observable<UserInfo> {
    if (newUsername) {
      this.username = newUsername;
    }
    if (newPassword) {
      this.password = newPassword;
    }
    let observable = new Observable<UserInfo>((subscriber) => {
      if (this.username && this.password) {
        let a = this.http.post<UserInfo>('/rest/user/authenticate', {}, { params: new HttpParams().append('username', this.username).append('password', this.password) })
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
        console.error('missing credentials');
        subscriber.error('missing credentials');
        subscriber.complete();
      }
      return { unsubscribe() { } };
    })
    return observable;

  }


}
