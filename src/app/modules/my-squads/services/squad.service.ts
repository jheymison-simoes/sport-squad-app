import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {BaseResponse} from "../../../shared/models/base-response.model";
import {SquadDto} from "../../../shared/models/squad/squad.dto";
import {BaseService} from "../../../shared/base/base.service";
import {CreateSquadDto} from "../models/create-squad.dto";
import {AssembleTeamsDto} from "../models/assemble-teams.dto";
import {AssembledTeamsDto} from "../models/assembled-teams.dto";

@Injectable({
  providedIn: 'root'
})
export class SquadService extends BaseService {

  baseUri: string = `${this.baseUrl}/squad`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAllByUserId(userId: string): Observable<SquadDto[]> {
    const uri = `${this.baseUri}/${userId}`;
    return this.httpClient.get<BaseResponse<SquadDto[]>>(uri)
      .pipe(map(this.validationResult));
  }

  create(squad: CreateSquadDto): Observable<SquadDto> {
    const uri = `${this.baseUri}`;
    return this.httpClient.post<BaseResponse<SquadDto>>(uri, squad)
      .pipe(map(this.validationResult));
  }

  delete(squadId: string): Observable<SquadDto> {
    const uri = `${this.baseUri}/${squadId}`;
    return this.httpClient.delete<BaseResponse<SquadDto>>(uri)
      .pipe(map(this.validationResult));
  }

  getSquadTextShared(squadId: string): Observable<string> {
    const uri = `${this.baseUri}/gettextsquadshare/${squadId}`;
    return this.httpClient.get<BaseResponse<string>>(uri)
      .pipe(map(this.validationResult));
  }

  assembleTeams(assembleTeamsDto: AssembleTeamsDto): Observable<Array<AssembledTeamsDto>> {
    const uri = `${this.baseUri}/assembleteams`;
    return this.httpClient.post<BaseResponse<Array<AssembledTeamsDto>>>(uri, assembleTeamsDto)
      .pipe(map(this.validationResult));
  }
}
