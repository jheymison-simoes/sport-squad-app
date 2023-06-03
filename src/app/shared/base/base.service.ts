import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {BaseResponse} from "../models/base-response.model";
export abstract class BaseService {

  baseUrl: string = `${environment.API_URL}/${environment.API_VERSION}`;

  validationResult<T>(response: BaseResponse<T>): T {
    if (!response.error) return response.result
    throw new Error(response.errorMessages?.join(","));
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    const responseError = error['error'] as BaseResponse<null>;
    throw new Error(responseError.errorMessages?.join(","));
  }
}
