import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {AssembleTeamsDto} from "../../models/assemble-teams.dto";
import {ActivatedRoute} from "@angular/router";
import {SquadService} from "../../services/squad.service";
import {ToastrService} from "ngx-toastr";
import {AssembledTeamsDto} from "../../models/assembled-teams.dto";

@Component({
  selector: 'app-assemble-teams',
  templateUrl: './assemble-teams.component.html',
  styleUrls: ['./assemble-teams.component.scss']
})
export class AssembleTeamsComponent implements OnInit {

  assembleTeamsForm: FormGroup;
  validationMessages: any;
  assembledTeams: Array<AssembledTeamsDto> = [];

  constructor(
    private formBuilder: FormBuilder,
    private activeRouteService: ActivatedRoute,
    private squadService: SquadService,
    private notifyService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initValidationMessages();
    this.initAssembleTeamsForm();
  }

  onSubmitForm(event: SubmitEvent): void {
    event.preventDefault();
    if (!this.assembleTeamsForm.valid) return;

    const assembleTeamsDto: AssembleTeamsDto = {
      squadId: this.activeRouteService.getParam<string>('squadId'),
      quantityTeams: this.assembleTeamsForm.get('quantityTeams')?.value ?? 0,
      balanced: this.assembleTeamsForm.get('balanced')?.value ?? 0,
    };

    this.squadService.assembleTeams(assembleTeamsDto).subscribe({
      next: response => {
        this.notifyService.success('Times montados com successo!');
        this.assembledTeams = response;
      },
      error: ({message}: Error) => this.notifyService.error(message)
    })
  }

  assembleTeamsAgain(): void {
      this.assembledTeams = [];
  }

  private initAssembleTeamsForm(): void {
    this.assembleTeamsForm = this.formBuilder.group({
      quantityTeams: ['', [Validators.required]],
      balanced: [false]
    });
  }

  private initValidationMessages(): void {
    this.validationMessages = {
      quantityTeams: {
        required: 'A quantidade de times é obrigatória!'
      }
    }
  }
}
