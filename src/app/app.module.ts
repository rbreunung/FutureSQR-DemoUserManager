import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CsrfInformationComponent } from './csrf-information/csrf-information.component';

@NgModule({
  declarations: [
    AppComponent,
    CsrfInformationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
