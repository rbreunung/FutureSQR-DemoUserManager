import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {


  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) this.onLogin();
  }

  onLogin(): void {

    this.router.navigate(["login"]);
  }
}
