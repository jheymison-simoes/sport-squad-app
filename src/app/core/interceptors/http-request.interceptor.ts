import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpStatusCode,
  HttpHeaders
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {NgxSpinnerService} from "ngx-spinner";
import {Guid} from "guid-typescript";
import {BaseResponse} from "../../shared/models/base-response.model";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  totalRequest: number = 0;

  constructor(private loadingService: NgxSpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<never> {
    // debugger;

    this.loadingService.show();

    // const body = request.body;
    // const bodyWithStrings = this.convertGuidsToStrings(body);
    const bodyJson = JSON.stringify(request.body);

    const requestClone = request.clone({
      setHeaders: {
        'Content-type': 'application/json'
      },
      body: bodyJson
    });

    return next.handle(request).pipe(
      catchError(this.errorHandler),
      finalize(() => this.loadingService.hide())
    );
  }

  // private errorHandler(error: HttpErrorResponse): Observable<never> {
  //   debugger;
  //   throw new Error(error.message);
  // }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    // debugger;
    const responseError = error['error'] as BaseResponse<null>;
    throw new Error(responseError.errorMessages.join(", "));
  }

  private convertGuidsToStrings(obj: any): any {
    if (obj && typeof obj === 'object') {
      const convertedObj: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          if (value instanceof Guid) {
            convertedObj[key] = value.toString();
          } else if (typeof value === 'object') {
            convertedObj[key] = this.convertGuidsToStrings(value);
          } else {
            convertedObj[key] = value;
          }
        }
      }
      return convertedObj;
    }
    return obj;
  }
}
