import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssembleTeamsDto } from '../../models/assemble-teams.dto';
import { ActivatedRoute } from '@angular/router';
import { SquadService } from '../../services/squad.service';
import { ToastrService } from 'ngx-toastr';
import { AssembledTeamsDto } from '../../models/assembled-teams.dto';

@Component({
  selector: 'app-assemble-teams',
  templateUrl: './assemble-teams.component.html',
  styleUrls: ['./assemble-teams.component.scss'],
})
export class AssembleTeamsComponent implements OnInit {
  assembleTeamsForm: FormGroup;
  validationMessages: any;
  assembledTeams: Array<AssembledTeamsDto> = [];
  squadId: string;

  constructor(
    private formBuilder: FormBuilder,
    private activeRouteService: ActivatedRoute,
    private squadService: SquadService,
    private notifyService: ToastrService,
    private rendererService: Renderer2,
  ) {}

  ngOnInit(): void {
    this.initValidationMessages();
    this.initAssembleTeamsForm();
    this.getSquadIdFromRoute();
  }

  onSubmitForm(event: SubmitEvent): void {
    event.preventDefault();
    if (!this.assembleTeamsForm.valid) return;

    const assembleTeamsDto: AssembleTeamsDto = {
      squadId: this.squadId,
      quantityTeams: this.assembleTeamsForm.get('quantityTeams')?.value ?? 0,
      balanced: this.assembleTeamsForm.get('balanced')?.value ?? 0,
    };

    this.squadService.assembleTeams(assembleTeamsDto).subscribe({
      next: (response) => {
        this.notifyService.success('Times montados com successo!');
        this.assembledTeams = response;
      },
    });
  }

  assembleTeamsAgain(): void {
    this.assembledTeams = [];
  }

  sharingAssembledTeams(): void {
    this.squadService
      .getTextSharingAssembledTeams(this.squadId, this.assembledTeams)
      .subscribe({
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

  private initAssembleTeamsForm(): void {
    this.assembleTeamsForm = this.formBuilder.group({
      quantityTeams: ['', [Validators.required]],
      balanced: [false],
    });
  }

  private initValidationMessages(): void {
    this.validationMessages = {
      quantityTeams: {
        required: 'A quantidade de times é obrigatória!',
      },
    };
  }

  private getSquadIdFromRoute = () =>
    (this.squadId = this.activeRouteService.getParam<string>('squadId'));
}
