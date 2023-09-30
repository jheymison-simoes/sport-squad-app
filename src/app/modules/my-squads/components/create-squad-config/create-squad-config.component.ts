import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";

import { PlayerTypeService } from "../../../../shared/services/player-type.service";

import { PlayerTypeDto } from "../../../../shared/models/player-type/player-type.dto";
import { CreateSquadConfigForm } from "../../models/create-squad-config-form.model";
import { Guid } from "guid-typescript";

import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-create-squad-config',
  templateUrl: './create-squad-config.component.html',
  styleUrls: ['./create-squad-config.component.scss']
})
export class CreateSquadConfigComponent implements OnInit {

  @Input('squadsConfig') squadConfigsCreated: CreateSquadConfigForm[] = [];
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  createSquadConfigForm: FormGroup;

  playerTypes: PlayerTypeDto[] = [];
  squadConfigCreated: CreateSquadConfigForm;

  validationMessages: any;

  constructor(
    private notify: ToastrService,
    private formBuilder: FormBuilder,
    private playerTypeService: PlayerTypeService
  ) {}

  ngOnInit(): void {
    this.getAllPlayersTypes();
    this.initForm();
    this.initValidationMessages();
  }

  onSubmitForm(event: SubmitEvent): void {
    event.preventDefault();
    if(this.createSquadConfigForm.invalid) return;

    let squadConfigCreated = Object.assign({}, this.squadConfigCreated, this.createSquadConfigForm.value);
    const playerTypeSelected = this.playerTypes.find(pt => pt.id === squadConfigCreated.playerTypeId);

    const isDuplicated = this.checkDuplicatedSquadConfig(playerTypeSelected.id);
    if (isDuplicated) {
      this.notify.info("Este tipo de jogador já foi adicionado!")
      return;
    }

    squadConfigCreated.playerTypeName = playerTypeSelected.name;
    squadConfigCreated.playerTypeIcon = playerTypeSelected.icon;

    this.squadConfigsCreated.push(squadConfigCreated)

    this.formGroupDirective.resetForm();
  }

  private checkDuplicatedSquadConfig(playerTypeId: string): boolean {
    const exist = this.squadConfigsCreated.find(sc => sc.playerTypeId === playerTypeId);
    return !!exist;
  }

  removeSquadConfig(squadConfigAdded: CreateSquadConfigForm): void {
    const index = this.squadConfigsCreated.indexOf(squadConfigAdded);
    this.squadConfigsCreated.splice(index, 1);
  }

  private initValidationMessages(): void {
    this.validationMessages = {
      playerTypeId: {
        required: "Selecione um tipo de jogador!"
      },
      quantity: {
        required: "Defina a quantidade máxima de jogadores para o tipo selecionado!"
      }
    }
  }

  private initForm(): void {
    this.createSquadConfigForm = this.formBuilder.group({
      playerTypeId: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      allowsAlternate: [false]
    });
  }

  private getAllPlayersTypes(): void {
    this.playerTypeService.getAll().subscribe({
      next: (response: PlayerTypeDto[]) => this.playerTypes = response,
      error: (error) => this.notify.error(error)
    });
  }

}
