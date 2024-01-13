import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateSquadConfigForm} from '../../models/create-squad-config-form.model';
import {ToastrService} from 'ngx-toastr';
import {SquadService} from '../../services/squad.service';
import {CreateSquadForm} from '../../models/create-squad-form.model';
import {CreateSquadDto} from '../../models/create-squad.dto';
import {Router} from '@angular/router';
import {SquadDto} from '../../../../shared/models/squad/squad.dto';

@Component({
    selector: 'app-create-squad',
    templateUrl: './create-squad.component.html',
    styleUrls: ['./create-squad.component.scss'],
})
export class CreateSquadComponent implements OnInit {
    createSquadForm: FormGroup;
    validationMessages: any;
    squadConfigsCreated: CreateSquadConfigForm[] = [];
    squadCreated: CreateSquadForm;

    constructor(
        private notifyService: ToastrService,
        private formBuilder: FormBuilder,
        private router: Router,
        private squadService: SquadService,
    ) {}

    ngOnInit(): void {
        this.initValidationMessages();
        this.initCreatedSquadForm();
    }

    onSubmitForm(event: SubmitEvent): void {
        event.preventDefault();
        if (!this.formIsValid) return;

        const squadCreatedData = Object.assign({}, this.squadCreated, this.createSquadForm.value) as CreateSquadForm;
        const createSquadDto = this.generateCreateSquadDto(squadCreatedData);

        this.createSquad(createSquadDto);
    }

    private generateCreateSquadDto(squadCreatedData: CreateSquadForm): CreateSquadDto {
      return {
          name: squadCreatedData.name,
          allowSkillLevel: squadCreatedData.allowSkillLevel,
          squadConfigs: this.squadConfigsCreated.map((sc) => {
            return {
              quantityPlayers: sc.quantity,
              allowSubstitutes: sc.allowsAlternate ?? false,
              playerTypeId: sc.playerTypeId,
            };
          }),
        };
    }

    private createSquad(createSquadDto: CreateSquadDto): void {
        this.squadService.create(createSquadDto).subscribe({
            next: (response: SquadDto) => {
                this.notifyService.success('Squad criado com sucesso!');
                this.redirectToSquad(response.id);
            },
        });
    }

    private redirectToSquad(squadId: string): void {
        this.router.navigate([`/my-squads/squad/${squadId}`]);
    }

    private initValidationMessages(): void {
        this.validationMessages = {
            name: {
                required: 'O nome do raxa deve ser preenchido!',
            },
        };
    }

    private initCreatedSquadForm(): void {
        this.createSquadForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            allowSkillLevel: [false],
        });
    }

    get formIsValid(): boolean {
        if (this.squadConfigsCreated.length === 0) {
            this.notifyService.warning('Não foi adicionada nenhuma configuração do squad!');
            return false;
        }

        return this.createSquadForm.valid === true;
    }
}
