import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../../../shared/services/player.service';
import { PlayerDto } from '../../../../shared/models/player/player.dto';

@Component({
  selector: 'app-change-skill-level-players',
  templateUrl: './change-skill-level-players.component.html',
  styleUrls: ['./change-skill-level-players.component.scss'],
})
export class ChangeSkillLevelPlayersComponent implements OnInit {
  showPlayers = false;
  players: Array<PlayerDto> = [];
  loading = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _playerService: PlayerService,
  ) {}

  ngOnInit(): void {
    this.subscribeInQueryParams();
  }

  //#region Private Methods
  private subscribeInQueryParams(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.showPlayers = params['changeSkillLevel'] === 'true';
      console.log(params['changeSkillLevel']);
      if (this.showPlayers) this.getPlayersBySquadById();
    });
  }

  private getPlayersBySquadById(): void {
    const squadId = this._activatedRoute.getParam<string>('squadId');

    this.loading = true;
    this._playerService.getAllNotGroupedBySquadId(squadId).subscribe({
      next: (response) => (this.players = response),
      error: () => (this.players = []),
      complete: () => (this.loading = false),
    });
  }
  //#endregion
  protected readonly indexedDB = indexedDB;
}
