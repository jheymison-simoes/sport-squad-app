import { Component, OnInit } from '@angular/core';
import {PlayerTypeDto} from "../../../../shared/models/player-type/player-type.dto";
import {PlayerTypeService} from "../../../../shared/services/player-type.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlayerDto} from "../../../../shared/models/player/player.dto";
import {PlayerService} from "../../../../shared/services/player.service";
import {CreatePlayerDto} from "../../models/create-player.dto";
import {ActivatedRoute, Router} from "@angular/router";

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllPlayersTypes();
    this.initForm();
    this.initValidationMessages();
    this.squadId = this.activeRouter.getParam<string>('squadId');
  }

  onSubmitForm(event: SubmitEvent): void {
    event.preventDefault();

    if (!this.createPlayerForm.valid) return;

    // TODO - quando adicionar o Login adicionar o usuarioId de quem está logado
    let playerCreated: CreatePlayerDto = Object.assign({}, this.player, this.createPlayerForm.value);
    playerCreated.squadId = this.squadId;

    this.createPlayer(playerCreated);
  }

  private createPlayer(playerCreate: CreatePlayerDto){
    this.playerService.createPlayer(playerCreate).subscribe({
      next: response => {
        this.notify.success('Jogador adicionado com sucesso!');
        this.router.navigate(['/my-squads/squad/', response.squadId]);
      },
      error: (error: Error) => this.notify.error(error.message)
    })
  }

  private getAllPlayersTypes(): void {
    this.playerTypeService.getAll().subscribe({
      next: (response: PlayerTypeDto[]) => this.playerTypes = response,
      error: (error) => this.notify.error(error)
    });
  }

  private initForm(): void {
    this.createPlayerForm = this.formBuilder.group({
      name: ['', [ Validators.required]],
      playerTypeId: ['', [Validators.required]],
      skillLevel: ['']
    })
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
