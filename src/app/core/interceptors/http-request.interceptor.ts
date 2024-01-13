import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseResponse } from '../../shared/models/base-response.model';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(
        private loadingService: NgxSpinnerService,
        private notifyService: ToastrService,
        private authenticationService: AuthenticationService,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<never> {
        this.loadingService.show();

        const token = this.authenticationService.getToken;

        const requestClone = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });

        return next.handle(requestClone).pipe(
            tap({
                next: () => null,
                error: (err: HttpErrorResponse) => {
                    const messageError = this.errorHandler(err);
                    return Error(messageError);
                },
                finalize: () => this.loadingService.hide(),
            }),
        );
    }

    errorHandler(error: HttpErrorResponse): string {
        const responseError = error['error'] as BaseResponse<null>;
        const messageError = responseError ? responseError.errorMessages?.join(', ') : 'Houve um erro interno. Tente mais tarde!';

        switch (error.status) {
            case 401:
                this.notifyService.error('Parece que você não possui permissão para esta ação!');
                break;
            case 400:
                this.notifyService.error(messageError);
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

        return messageError;
    }
}
