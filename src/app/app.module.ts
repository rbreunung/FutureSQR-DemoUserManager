import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CsrfInformationComponent } from './csrf-information/csrf-information.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { LoggingDemoComponent } from './logging-demo/logging-demo.component';
import { SayHelloComponent } from './say-hello/say-hello.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './userlist/userlist.component';
import { AdminUserListComponent } from './adminuserlist/adminuserlist.component';

@NgModule({
  declarations: [
    AppComponent,
    CsrfInformationComponent,
    LoggingDemoComponent,
    SayHelloComponent,
    LoginComponent,
    UserListComponent,
    AdminUserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
