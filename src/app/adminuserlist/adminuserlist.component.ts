import { Component, OnInit } from '@angular/core';
import { User } from '../userinfo';
import { UserListService } from '../userlist.service';

@Component({
  selector: 'app-adminuserlist',
  templateUrl: './adminuserlist.component.html',
  styleUrls: ['./adminuserlist.component.css']
})
export class AdminUserListComponent implements OnInit {

  user?: User[];

  constructor(private userService: UserListService) { }

  ngOnInit(): void {
  }

}
