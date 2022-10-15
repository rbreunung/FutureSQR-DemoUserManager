import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CsrfInformationComponent } from './csrf-information/csrf-information.component';
import { LoggingDemoComponent } from './logging-demo/logging-demo.component';
import { SayHelloComponent } from './say-hello/say-hello.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './userlist/userlist.component';
import { AdminUserListComponent } from './adminuserlist/adminuserlist.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'csrf-information', component: CsrfInformationComponent },
  { path: 'logging-demo', component: LoggingDemoComponent },
  { path: 'say-hello', component: SayHelloComponent },
  { path: 'login', component: LoginComponent },
  { path: 'userlist', component: UserListComponent },
  { path: 'adminuserlist', component: AdminUserListComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
