import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { User } from '../userinfo';
import { UserListService } from '../userlist.service';

@Component({
  selector: 'app-adminuserlist',
  templateUrl: './adminuserlist.component.html',
  styleUrls: ['./adminuserlist.component.css']
})
export class AdminUserListComponent implements OnInit {

  users?: User[];

  constructor(private router: Router, private userListService: UserListService) { }

  ngOnInit(): void {
    this.userListService.getAdminUsers().pipe(first()).subscribe({ next: v => this.users = v, error: console.error, complete: () => console.info('Admin list loaded.') })
  }

  ban(user: User) {
    this.userListService.banLoginName(user.loginName).pipe(first()).subscribe({ next: v => this.users = v, error: console.error, complete: () => console.log("User ban returned.") })
  }
  unban(user: User) {
    this.userListService.unbanLoginName(user.loginName).pipe(first()).subscribe({ next: v => this.users = v, error: console.error, complete: () => console.log("User unban returned.") })
  }

  onLogin(): void {
    this.router.navigate(["login"]);
  }
}
