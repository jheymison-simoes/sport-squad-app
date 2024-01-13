import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BaseService } from '../base/base.service';
import { BaseResponse } from '../models/base-response.model';
import { PlayerGroupedTypeDto } from '../models/player/player-grouped-type.dto';
import { PlayerDto } from '../models/player/player.dto';
import { CreatePlayerDto } from '../../modules/players/models/create-player.dto';
import { UpdatePlayerDto } from '../../modules/players/models/update-player.dto';

@Injectable({
    providedIn: 'root',
})
export class PlayerService extends BaseService {
    baseUri: string = `${this.baseUrl}/player`;

    constructor(private httpClient: HttpClient) {
        super();
    }

    getAllBySquadId(squadId: string): Observable<PlayerGroupedTypeDto[]> {
        const uri = `${this.baseUri}/GetAllBySquadId/${squadId}`;
        return this.httpClient.get<BaseResponse<PlayerGroupedTypeDto[]>>(uri).pipe(map(this.validationResult));
    }

    deletePlayer(playerId: string): Observable<PlayerDto> {
        const uri = `${this.baseUri}/${playerId}`;
        return this.httpClient.delete<BaseResponse<PlayerDto>>(uri).pipe(map(this.validationResult));
    }

    createPlayer(playerCreated: CreatePlayerDto): Observable<PlayerDto> {
        const uri = `${this.baseUri}`;
        return this.httpClient.post<BaseResponse<PlayerDto>>(uri, playerCreated).pipe(map(this.validationResult));
    }

    getPlayerById(playerId: string): Observable<PlayerDto> {
        const uri = `${this.baseUri}/${playerId}`;
        return this.httpClient.get<BaseResponse<PlayerDto>>(uri).pipe(map(this.validationResult));
    }

    updatePlayer(playerUpdate: UpdatePlayerDto): Observable<PlayerDto> {
        const uri = `${this.baseUri}`;
        return this.httpClient.put<BaseResponse<PlayerDto>>(uri, playerUpdate).pipe(map(this.validationResult));
    }

    cleanAllPlayersInSquad(squadId: string): Observable<boolean> {
        const uri = `${this.baseUri}/cleanplayersinsquad/${squadId}`;
        return this.httpClient.post<BaseResponse<boolean>>(uri, null).pipe(map(this.validationResult));
    }
}
