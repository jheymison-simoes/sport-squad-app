import { Component, OnInit } from '@angular/core';
import {PlayerTypeDto} from "../../../../shared/models/player-type/player-type.dto";
import {PlayerTypeService} from "../../../../shared/services/player-type.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlayerService} from "../../../../shared/services/player.service";
import {CreatePlayerDto} from "../../models/create-player.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {PlayerCacheService} from "../../../../shared/services/player-cache.service";
import Swal from "sweetalert2";
import {PlayerDto} from "../../../../shared/models/player/player.dto";

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.scss']
})
export class CreatePlayerComponent implements OnInit {

  createPlayerForm: FormGroup;
  playerTypes: PlayerTypeDto[] = [];
  validationMessages: any;
  player: CreatePlayerDto;
  squadId: string;

  constructor(
    private notify: ToastrService,
    private formBuilder: FormBuilder,
    private playerTypeService: PlayerTypeService,
    private playerService: PlayerService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private playerCacheService: PlayerCacheService
  ) { }

  ngOnInit(): void {
    this.getAllPlayersTypes();
    this.initForm();
    this.initValidationMessages();
    this.squadId = this.activeRouter.getParam<string>('squadId');
    this.getPlayerInCache();
  }

  onSubmitForm(event: SubmitEvent): void {
    event.preventDefault();

    const skillLevel = this.createPlayerForm.get('skillLevel')?.value;
    if (!skillLevel) {
      this.notify.warning('Selecione o nivel de habilidade');
    }

    if (!this.createPlayerForm.valid) return;

    // TODO - quando adicionar o Login adicionar o usuarioId de quem está logado
    let playerCreated: CreatePlayerDto = Object.assign({}, this.player, this.createPlayerForm.value);
    playerCreated.squadId = this.squadId;

    this.createPlayer(playerCreated);
  }

  private createPlayer(playerCreate: CreatePlayerDto): void{
    this.playerService.createPlayer(playerCreate).subscribe({
      next: response => {
        this.playerCacheService.setPlayerInCache(response);
        this.notify.success('Jogador adicionado com sucesso!');
        this.router.navigate(['/my-squads/squad/', response.squadId]);
      }
    });
  }

  private getAllPlayersTypes(): void {
    this.playerTypeService.getAll().subscribe({
      next: (response: PlayerTypeDto[]) => this.playerTypes = response
    });
  }

  private initForm(): void {
    this.createPlayerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      playerTypeId: ['', [Validators.required]],
      skillLevel: ['', [Validators.required]]
    })
  }

  private initValidationMessages(): void {
    this.validationMessages = {
      name: {
        required: 'O nome é obrigatório!'
      },
      playerTypeId: {
        required: 'Selecione um tipo de jogador!'
      },
      skillLevel: {
        required: 'O nível de habilidade é obrigatório!'
      }
    }
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
      cancelButtonText: 'Não sou eu'
    }).then(result => {
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
      squadId: player.squadId
    };
    this.createPlayer(createPlayer);
  }
}
