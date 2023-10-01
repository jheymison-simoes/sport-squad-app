import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlayerTypeDto} from "../../../../shared/models/player-type/player-type.dto";
import {ToastrService} from "ngx-toastr";
import {PlayerTypeService} from "../../../../shared/services/player-type.service";
import {PlayerService} from "../../../../shared/services/player.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PlayerDto} from "../../../../shared/models/player/player.dto";
import {UpdatePlayerDto} from "../../models/update-player.dto";

@Component({
  selector: 'app-update-player',
  templateUrl: './update-player.component.html',
  styleUrls: ['./update-player.component.scss']
})
export class UpdatePlayerComponent implements OnInit {

  updatePlayerForm: FormGroup;
  playerTypes: PlayerTypeDto[] = [];
  validationMessages: any;
  player: PlayerDto;
  playerUpdate: UpdatePlayerDto;

  constructor(
    private notify: ToastrService,
    private formBuilder: FormBuilder,
    private playerTypeService: PlayerTypeService,
    private playerService: PlayerService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllPlayersTypes();
    this.getPlayer();
    this.initValidationMessages();
  }

  private getPlayer(): void {
    const playerId = this.activeRouter.getParam<string>('playerId');

    this.playerService.getPlayerById(playerId).subscribe({
      next: (response) => {
        this.player = response;
        this.updatePlayerForm.patchValue({
          name: response.name,
          playerTypeId: response.playerTypeId,
          skillLevel: response.skillLevel
        });
      }
    });
  }

  onSubmitForm(event: SubmitEvent): void {
    event.preventDefault();

    if (!this.updatePlayerForm.valid) return;

    // TODO - quando adicionar o Login adicionar o usuarioId de quem está logado
    let playerUpdate: UpdatePlayerDto = Object.assign({}, this.playerUpdate, this.updatePlayerForm.value);
    playerUpdate.squadId = this.player.squadId;
    playerUpdate.id = this.player.id;

    this.updatePlayer(playerUpdate);
  }

  private updatePlayer(playerUpdate: UpdatePlayerDto){
    this.playerService.updatePlayer(playerUpdate).subscribe({
      next: response => {
        this.notify.success('Jogador atualizado com sucesso!');
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
    this.updatePlayerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      playerTypeId: ['', [Validators.required]],
      skillLevel: ['']
    });
  }

  private initValidationMessages(): void {
    this.validationMessages = {
      name: {
        required: 'O nome é obrigatório!'
      },
      playerTypeId: {
        required: 'Selecione um tipo de jogador!'
      }
    }
  }

}
