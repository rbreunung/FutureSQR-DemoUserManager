import { Component, OnInit } from '@angular/core';
import { CsrfToken } from '../csrf';

@Component({
  selector: 'app-csrf-information',
  templateUrl: './csrf-information.component.html',
  styleUrls: ['./csrf-information.component.css']
})
export class CsrfInformationComponent implements OnInit {

  csrfToken: CsrfToken | null = null;

  constructor() { }

  ngOnInit(): void {
    this.csrfToken = { token: "token", parameterName: "parameterName", headerName: "headerName" };
  }

}
