import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { User } from '../userinfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  user?: User;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.refreshUserInfo().pipe(first()).subscribe({
      next: n => {
        this.user = n;
      }, error: e => {
        this.user = undefined;
      }
    });
  }

  onLogin(): void {
    this.authService.authenticate(this.password, this.username).pipe(first()).subscribe({
      next: n => {
        this.user = n
      }, error: e => {
        this.user = undefined;
        console.error("Please retry.");
      }
    });
  }

  onLogout(): void {
  }
}
