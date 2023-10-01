import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {NgxSpinnerService} from "ngx-spinner";
import {BaseResponse} from "../../shared/models/base-response.model";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private loadingService: NgxSpinnerService,
    private notifyService: ToastrService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<never> {
    this.loadingService.show();
    return next.handle(request).pipe(
      catchError(this.errorHandler),
      finalize(() => this.loadingService.hide())
    );
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    const responseError = error['error'] as BaseResponse<null>;

    switch (error.status) {
      case 401:
        this.notifyService.error('Parece que você não possui permissão para esta ação!');
        break;
      case 400:
        this.notifyService.error(responseError.errorMessages.join(", "));
        break;
      case 0:
      case 404:
      case 406:
      case 409:
      case 500:
      case 503:
        this.notifyService.error('Pedimos desculpa, ocorreu um erro na solicitação ao servidor!');
        break;
    }

    throw new Error(responseError.errorMessages.join(", "));
  }
}
