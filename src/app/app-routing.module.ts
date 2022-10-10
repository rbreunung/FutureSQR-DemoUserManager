import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CsrfInformationComponent } from './csrf-information/csrf-information.component';
import { LoggingDemoComponent } from './logging-demo/logging-demo.component';
import { SayHelloComponent } from './say-hello/say-hello.component';


const routes: Routes = [
  { path: 'csrf-information', component: CsrfInformationComponent },
  { path: 'logging-demo', component: LoggingDemoComponent },
  { path: 'say-hello', component: SayHelloComponent }
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
