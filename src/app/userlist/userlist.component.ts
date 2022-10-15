import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { SimpleUser } from '../userinfo';
import { UserListService } from '../userlist.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {

  users?: SimpleUser[];

  constructor(private router: Router, private userListService: UserListService) { }

  ngOnInit(): void {
    this.userListService.getSimpleUsers().pipe(first()).subscribe({
      next: v => {
        this.users = v;
      }, error: e => {
        console.error(e);
      }
    })
  }

  onLogin(): void {
    this.router.navigate(["login"]);
  }
}
