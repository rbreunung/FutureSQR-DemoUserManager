import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { UserListService } from '../userlist.service';
import { BackendModelFullUserEntry } from '../backend/model/backend-model-user-entry';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  newUser: boolean = true;
  user?: BackendModelFullUserEntry;

  userForm = new FormGroup({
    loginName: new FormControl<string>('', Validators.minLength(3)),
    password: new FormControl<string>('', [Validators.minLength(3), Validators.required]),
    passwordConfirm: new FormControl<string>('', []),
    email: new FormControl<string>('', Validators.email),
    displayName: new FormControl('', Validators.required),
    isbanned: new FormControl<boolean>(false)
  }, { validators: [passwordMatchValidator] });

  constructor(private route: ActivatedRoute, private userService: UserListService, private location: Location) { }

  onChangeUser() {
    this.userService.editUser({
      uuid: this.user?.uuid!,
      displayname: this.userForm.controls['displayName'].value!,
      isbanned: this.userForm.controls['isbanned'].value!
    }).pipe(first()).subscribe({ next: v => this.user = v, complete: () => this.location.back() });
  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    let userId = this.route.snapshot.paramMap.get("uuid");
    if (userId) {
      this.user = this.userService.getUser(userId!);
      if (this.user) {
        this.newUser = false;
        this.userForm.controls['loginName'].setValue(this.user.loginname);
        this.userForm.controls['email'].setValue(this.user.email);
        this.userForm.controls['displayName'].setValue(this.user.displayname);
        this.userForm.controls['isbanned'].setValue(this.user.isbanned);
        this.userForm.controls['password'].setValidators(null);
      }
    }
  }

  passwordMatchValidator(g: FormGroup): { 'mismatch': boolean } | null {
    return g.get('password')!.value === g.get('passwordConfirm')!.value
      ? null : { 'mismatch': true };
  }

  onSubmitNewUser() {
    this.userService.addNewUser({
      loginname: this.userForm.controls['loginName'].value!,
      password: this.userForm.controls['password'].value!,
      displayname: this.userForm.controls['displayName'].value!,
      email: this.userForm.controls['email'].value!, vcsNames: []
    }).pipe(first()).subscribe({ error: console.error, complete: () => this.location.back() });
  }
}

function passwordMatchValidator(g: { get: (key: string) => any; }): { 'mismatch': boolean } | null {
  let p1 = g.get('password')
  let p2 = g.get('passwordConfirm')

  let result = p1 && p2 && p1.value === p2.value ? null : { 'mismatch': true }
  return result;
}