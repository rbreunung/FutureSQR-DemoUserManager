import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { first, map, mergeMap, Observable } from 'rxjs';
import { CsrfService } from './csrf.service';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

    csrfMethods: string[] = ["post", "put", "delete"];

    constructor(private csrfService: CsrfService) { }

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.csrfMethods.indexOf(httpRequest.method) > -1) {
            console.info(`found relevant method ${httpRequest.method}`);
            return this.csrfService.getCsrfToken().pipe(first(), mergeMap(
                token => {
                    let newRequest = httpRequest.clone();
                    newRequest.headers.append(token.headerName, token.token);
                    return next.handle(newRequest);
                }

            ));
        } else {
            console.info(`found non relevant method ${httpRequest.method}`);
        }
        return next.handle(httpRequest);
    }
}