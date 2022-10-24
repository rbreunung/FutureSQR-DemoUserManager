import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { UserListService } from '../userlist.service';
import { BackendModelSimpleUserEntry } from '../backend/model/backend-model-user-entry';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {

  users?: BackendModelSimpleUserEntry[];

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
