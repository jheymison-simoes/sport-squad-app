import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PlayerTypeDto } from '../models/player-type/player-type.dto';
import { BaseResponse } from '../models/base-response.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerTypeService extends BaseService {
  baseUri: string = `${this.baseUrl}/player/playertype`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAll(): Observable<PlayerTypeDto[]> {
    return this.httpClient
      .get<BaseResponse<PlayerTypeDto[]>>(this.baseUri)
      .pipe(map(this.validationResult));
  }

  getAllBySquadId(squadId: string): Observable<PlayerTypeDto[]> {
    const uri = `${this.baseUri}/${squadId}`;
    return this.httpClient
      .get<BaseResponse<PlayerTypeDto[]>>(uri)
      .pipe(map(this.validationResult));
  }
}
