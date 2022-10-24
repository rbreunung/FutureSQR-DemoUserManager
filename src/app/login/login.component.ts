import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { BackendModelFullUserEntry } from '../backend/model/backend-model-user-entry';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm = new FormGroup({
    loginName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  user?: BackendModelFullUserEntry;

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
    this.authService.authenticate(this.userForm.controls['loginName'].value!, this.userForm.controls['password'].value!).pipe(first()).subscribe({
      next: n => {
        this.user = n
      }, error: e => {
        this.user = undefined;
        console.error(e);
      }
    });
  }

  getUserString(): string {
    return JSON.stringify(this.user)
  }

  onLogout(): void {
    this.authService.logout()
    this.user = undefined
  }
}
