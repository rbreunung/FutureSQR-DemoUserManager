import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { User } from '../userinfo';
import { UserListService } from '../userlist.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  newUser: boolean = true;

  userForm = new FormGroup({
    loginName: new FormControl<string>('', Validators.minLength(3)),
    password: new FormControl<string>('', Validators.minLength(3)),
    contactEmail: new FormControl<string>('', Validators.email),
    displayName: new FormControl('', Validators.required),
    banned: new FormControl('')
  });

  user?: User;

  constructor(private route: ActivatedRoute, private userService: UserListService, private location: Location) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    let userId = this.route.snapshot.paramMap.get("uuid");
    if (userId) {
      this.user = this.userService.getUser(userId!);
      if (this.user) {
        this.newUser = false;
        this.userForm.controls['loginName'].setValue(this.user.loginName);
        this.userForm.controls['contactEmail'].setValue(this.user.contactEmail);
        this.userForm.controls['displayName'].setValue(this.user.displayName);
        this.userForm.controls['banned'].setValue(this.user.banned ? 'true' : '');
      }
    }
  }

  onChangeDisplayName() {
    if (this.user) {
      this.user.displayName = this.userForm.controls['displayName'].value!;
      this.userService.changeDisplayName(this.user).pipe(first()).subscribe({ error: e => console.error(e), complete: () => this.location.back() });
    }
  }

  onSubmitNewUser() {
    const newUser: User = {
      uuid: null,
      password: this.userForm.controls['password'].value,
      loginName: this.userForm.controls['loginName'].getRawValue()!,
      contactEmail: this.userForm.controls['contactEmail'].getRawValue()!,
      displayName: this.userForm.controls['displayName'].value!,
      banned: this.userForm.controls['banned'].value ? true : false
    };
    this.userService.addNewUser(newUser).pipe(first()).subscribe({ error: console.error, complete: () => console.info('Add user completed.') });
  }
}
