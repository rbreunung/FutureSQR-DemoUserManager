import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CsrfService } from './csrf.service';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

    constructor(privatecsrfService:CsrfService) { }

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.info("I did an intercept");
        return next.handle(httpRequest);
    }
}