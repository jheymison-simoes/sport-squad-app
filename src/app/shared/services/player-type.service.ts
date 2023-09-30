import { Injectable } from '@angular/core';
import {BaseService} from "../base/base.service";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {PlayerTypeDto} from "../models/player-type/player-type.dto";
import {Guid} from "guid-typescript";
import {BaseResponse} from "../models/base-response.model";
import {SquadDto} from "../models/squad/squad.dto";

@Injectable({
  providedIn: 'root'
})
export class PlayerTypeService extends BaseService {

  baseUri: string = `${this.baseUrl}/player/playertype`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAll(): Observable<PlayerTypeDto[]> {
    // const playerTypes: PlayerTypeDto[] = [
    //   {
    //     id: Guid.create().toString(),
    //     name: "Goleiro",
    //     icon: "hand-rock"
    //   },
    //   {
    //     id: Guid.create().toString(),
    //     name: "Linha",
    //     icon: "shoe-prints"
    //   }
    // ]
    //
    // const baseResult: BaseResponse<PlayerTypeDto[]> = {
    //   result: playerTypes,
    //   error: false,
    //   errorMessages: null,
    //   stackTrace: null
    // }

    return this.httpClient.get<BaseResponse<PlayerTypeDto[]>>(this.baseUri)
      .pipe(map(this.validationResult));

    // return new Observable<BaseResponse<PlayerTypeDto[]>>(observer => {
    //   observer.next(baseResult); // Emitir os valores
    //   observer.complete(); // Completar o Observable
    // }).pipe(map(this.validationResult));
  }
}
