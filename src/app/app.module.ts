import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CsrfInformationComponent } from './csrf-information/csrf-information.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingDemoComponent } from './logging-demo/logging-demo.component';
import { SayHelloComponent } from './say-hello/say-hello.component';
import { FormsModule } from '@angular/forms';
import { CsrfInterceptor } from './csrf-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CsrfInformationComponent,
    LoggingDemoComponent,
    SayHelloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
