import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.authService.authenticate(this.password, this.username).pipe(first()).subscribe({
      next: n => {
        console.log("Create user list.");
      }, error: e => {
        console.error("Please retry.");
      }
    });
  }

  onLogout(): void {
  }
}
