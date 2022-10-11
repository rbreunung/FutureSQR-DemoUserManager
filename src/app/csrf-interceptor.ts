import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { first, mergeMap, Observable } from 'rxjs';
import { CsrfService } from './csrf.service';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

    csrfMethods: string[] = ["post", "put", "delete"];

    constructor(private csrfService: CsrfService) { }

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.csrfMethods.indexOf(httpRequest.method.toLowerCase()) > -1) {
            console.info(`found relevant method ${httpRequest.method}`);
            return this.csrfService.getCsrfToken().pipe(first(), mergeMap(
                token => {
                    let newHeaders: HttpHeaders = new HttpHeaders({ [token.headerName]: [token.token] });
                    let newRequest = httpRequest.clone({ headers: newHeaders });
                    return next.handle(newRequest);
                }));
        } else {
            console.info(`found non relevant method ${httpRequest.method}`);
        }
        return next.handle(httpRequest);
    }
}