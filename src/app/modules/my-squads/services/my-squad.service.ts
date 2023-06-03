import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subject} from "rxjs";
import {BaseResponse} from "../../../shared/models/base-response.model";
import {SquadDto} from "../models/squad.dto";
import {Guid} from "guid-typescript";
import {BaseService} from "../../../shared/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class MySquadService extends BaseService {

  baseUri: string = `${this.baseUrl}/squad`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAllByUserId(userId: Guid): Observable<SquadDto[]> {
    // const squads: SquadDto[] =[
    //   {
    //     userId: Guid.create(),
    //     name: "Raxa do pelezinho as terças e domingo"
    //   },
    //   {
    //     userId: Guid.create(),
    //     name: "Raxa de quinta no macarena"
    //   },
    //   {
    //     userId: Guid.create(),
    //     name: "Raxa do bernal"
    //   },
    //   {
    //     userId: Guid.create(),
    //     name: "Raxa dos perna de pau"
    //   }
    // ];
    //
    // const baseResult: BaseResponse<SquadDto[]> = {
    //   result: squads,
    //   error: false,
    //   errorMessages: null,
    //   stackTrace: null
    // }
    //
    // return new Observable<BaseResponse<SquadDto[]>>(observer => {
    //   observer.next(baseResult); // Emitir os valores
    //   observer.complete(); // Completar o Observable
    // }).pipe(map(this.validationResult));

    const uri = `${this.baseUri}/${userId}`;
    return this.httpClient.get<BaseResponse<SquadDto[]>>(uri)
      .pipe(map(this.validationResult));
  }
}
