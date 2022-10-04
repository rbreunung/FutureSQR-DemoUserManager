import { Component, OnInit } from '@angular/core';
import { first, Observable, Subscription } from 'rxjs';
import { CsrfToken } from '../csrf';
import { CsrfService } from '../csrf.service';

@Component({
  selector: 'app-csrf-information',
  templateUrl: './csrf-information.component.html',
  styleUrls: ['./csrf-information.component.css']
})
export class CsrfInformationComponent implements OnInit {

  csrfToken: CsrfToken | null = null;

  constructor(private csrfService: CsrfService) { }

  ngOnInit(): void {
    let s: Subscription = this.csrfService.getCsrfToken().pipe(first()).subscribe(t => this.csrfToken = t);
  }

}
