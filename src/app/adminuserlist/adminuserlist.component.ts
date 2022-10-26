import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { BackendModelFullUserEntry } from '../backend/model/backend-model-user-entry';
import { UserListService } from '../userlist.service';

@Component({
  selector: 'app-adminuserlist',
  templateUrl: './adminuserlist.component.html',
  styleUrls: ['./adminuserlist.component.css']
})
export class AdminUserListComponent implements OnInit {
  onCreatUser() {
    this.router.navigate(["user", "add"])
  }

  users?: BackendModelFullUserEntry[];

  constructor(private router: Router, private userListService: UserListService) { }

  ngOnInit(): void {
    this.userListService.getFullUsers().pipe(first()).subscribe({
      next: v => this.users = v, error: console.error, complete: () => console.info('Admin list loaded.')
    })
  }

  ban(user: BackendModelFullUserEntry) {
    this.userListService.banLoginName(user.uuid).pipe(first()).subscribe({
      next: v => this.users = v, error: console.error, complete: () => console.log("User ban returned.")
    })
  }
  unban(user: BackendModelFullUserEntry) {
    this.userListService.unbanLoginName(user.uuid).pipe(first()).subscribe({
      next: v => this.users = v, error: console.error, complete: () => console.log("User unban returned.")
    })
  }

  onLogin(): void {
    this.router.navigate(["login"]);
  }
}
