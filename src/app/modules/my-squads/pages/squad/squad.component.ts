import {Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { PlayerService } from "../../../../shared/services/player.service";
import { ToastrService } from "ngx-toastr";
import { PlayerGroupedPlayerDto, PlayerGroupedTypeDto } from "../../../../shared/models/player/player-grouped-type.dto";
import Swal from 'sweetalert2';
import {SquadService} from "../../services/squad.service";

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.scss']
})
export class SquadComponent implements OnInit {

  squadId: string;
  playersGrouped: PlayerGroupedTypeDto[] = [];

  constructor(
    private activeRouteService: ActivatedRoute,
    private notify: ToastrService,
    private playerService: PlayerService,
    private squadService: SquadService,
    private router: Router,
    private rendererService: Renderer2
  ) { }

  ngOnInit(): void {
    this.getPlayersBySquadById();
  }

  openConfirmDelete(playerId: string, name: string): void {
    Swal.fire({
      title: 'Atenção',
      text: `Tem certeza que deseja remover este jogador ${name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then(result => this.deletePlayer(playerId, result.isConfirmed));
  }

  trackByPlayerGroupedFn(index: number, playerGrouped: PlayerGroupedTypeDto): string {
    return index.toString();
  }

  trackByPlayerFn(index: number, player: PlayerGroupedPlayerDto): string {
    return player.playerId;
  }

  shareSquad(): void {
    this.squadService.getSquadTextShared(this.squadId).subscribe({
      next: response => {
        const textShared = encodeURIComponent(response);
        const url = `https://api.whatsapp.com/send?text=${textShared}`;
        this.rendererService.setAttribute(window.open(url, '_blank'), 'noopener', 'true');
        // if (!navigator.share) return;
        // this.sharedTextSquad(response);
      },
      error: ({message}: Error) => this.notify.error(message)
    });


  }

  private sharedTextSquad(textShared: string): void {
    if (!navigator.share) return;
    navigator.share({
      text: textShared
    }).then(() => console.log('Compartilhado'))
      .catch(() => console.log('Erro ao compartilhar'));
  }

  private deletePlayer(playerId: string, confirmed: boolean){
    if (!confirmed) return;

    this.playerService.deletePlayer(playerId).subscribe({
      next: response => {
        this.playersGrouped.forEach((pt) => {
          pt.players = pt.players.filter(pt => pt.playerId != response.id);
          pt.quantityPlayers = pt.players.length;
          pt.players.forEach((pt2, index) => {
            pt2.index = index + 1;
            pt2.substitute = pt2.index > pt.quantityPlayers;
          })
        });

        this.notify.success('Jogador removido com sucesso!')
      },
      error: ({message}: Error) => this.notify.error(message)
    });
  }

  private getPlayersBySquadById(): void {
    this.squadId = this.activeRouteService.getParam<string>('squadId');

    this.playerService.getAllBySquadId(this.squadId).subscribe({
      next: (response: PlayerGroupedTypeDto[]) => {
        this.playersGrouped = response
      },
      error: ({message}: Error) => this.notify.error(message)
    })
  }

}
