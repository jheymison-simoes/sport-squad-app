import { Component, OnInit, Renderer2 } from '@angular/core';
import { PlayerTypeDto } from '../../../../shared/models/player-type/player-type.dto';
import { PlayerTypeService } from '../../../../shared/services/player-type.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from '../../../../shared/services/player.service';
import { CreatePlayerDto } from '../../models/create-player.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerCacheService } from '../../../../shared/services/player-cache.service';
import Swal from 'sweetalert2';
import { PlayerDto } from '../../../../shared/models/player/player.dto';
import { SquadService } from '../../../my-squads/services/squad.service';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.scss'],
})
export class CreatePlayerComponent implements OnInit {
  createPlayerForm: FormGroup;
  playerTypes: PlayerTypeDto[] = [];
  validationMessages: any;
  player: CreatePlayerDto;
  squadId: string;
  playerSelected: PlayerTypeDto;

  constructor(
    private notify: ToastrService,
    private formBuilder: FormBuilder,
    private playerTypeService: PlayerTypeService,
    private playerService: PlayerService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private playerCacheService: PlayerCacheService,
    private squadService: SquadService,
    private rendererService: Renderer2,
  ) {
    this.initValidationMessages();
  }

  ngOnInit(): void {
    this.squadId = this.activeRouter.getParam<string>('squadId');
    this.initForm();
    this.getAllPlayersTypes();
  }

  onSubmitForm(event: SubmitEvent): void {
    event.preventDefault();

    const skillLevel = this.createPlayerForm.get('skillLevel')?.value;
    if (!skillLevel) {
      this.notify.warning('Selecione o nivel de habilidade');
    }

    if (!this.createPlayerForm.valid) return;

    // TODO - quando adicionar o Login adicionar o usuarioId de quem está logado
    let playerCreated: CreatePlayerDto = Object.assign(
      {},
      this.player,
      this.createPlayerForm.value,
    );
    playerCreated.squadId = this.squadId;

    this.createPlayer(playerCreated);
  }

  private createPlayer(playerCreate: CreatePlayerDto): void {
    this.playerService.createPlayer(playerCreate).subscribe({
      next: (response) => {
        this.playerCacheService.setPlayerInCache(response);
        this.notify.success('Jogador adicionado com sucesso!');
        this.confirmSharedSquad();
      },
    });
  }

  private confirmSharedSquad(): void {
    Swal.fire({
      title: 'Compartilhar',
      text: 'Deseja compartilhar a lista com seu nome?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) this.shareSquad();
      else this.router.navigate(['/my-squads/squad/', this.squadId]);
    });
  }

  private shareSquad(): void {
    this.squadService.getSquadTextShared(this.squadId).subscribe({
      next: (response) => {
        const textShared = encodeURIComponent(response);
        const url = `https://api.whatsapp.com/send?text=${textShared}`;
        this.rendererService.setAttribute(
          window.open(url, '_blank'),
          'noopener',
          'true',
        );
      },
    });
  }

  private getAllPlayersTypes(): void {
    this.playerTypeService.getAllBySquadId(this.squadId).subscribe({
      next: (response: PlayerTypeDto[]) => {
        this.playerTypes = response;
        this.playerSelected = response[0];
        this.initForm();
        this.getPlayerInCache();
      },
    });
  }

  private initForm(): void {
    this.createPlayerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      playerTypeId: ['', [Validators.required]],
      skillLevel: ['', [Validators.required]],
    });
  }

  private initValidationMessages(): void {
    this.validationMessages = {
      name: {
        required: 'O nome é obrigatório!',
      },
      playerTypeId: {
        required: 'Selecione um tipo de jogador!',
      },
      skillLevel: {
        required: 'O nível de habilidade é obrigatório!',
      },
    };
  }

  private getPlayerInCache(): void {
    const player = this.playerCacheService.getPlayerInCache();
    if (!player) return;

    const skillLevel = this.generateSkillLevel(player.skillLevel);

    Swal.fire({
      html: `<section>
                <h1>Parece que já adicionou o seu nome anteriormente</h1>
                <div><strong>Nome: </strong> ${player.name}</div>
                <div><strong>Nivel Habilidade: </strong> ${skillLevel}</div>
                <div><strong>Tipo Jogador: </strong> ${player.playerType?.name} </div>
            </section>`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Sou eu',
      cancelButtonText: 'Não sou eu',
    }).then((result) => {
      this.createPlayerInCache(result.isConfirmed, player);
    });
  }

  private generateSkillLevel(skillLevel: number): string {
    let result: string = '';
    for (let i = 0; i < skillLevel; i++) result += '&#9733';
    return result;
  }

  private createPlayerInCache(isConfirmed: boolean, player: PlayerDto): void {
    if (!isConfirmed) return;
    const createPlayer: CreatePlayerDto = {
      name: player.name,
      playerTypeId: player.playerTypeId,
      skillLevel: player.skillLevel,
      squadId: this.squadId,
    };
    this.createPlayer(createPlayer);
  }
}
