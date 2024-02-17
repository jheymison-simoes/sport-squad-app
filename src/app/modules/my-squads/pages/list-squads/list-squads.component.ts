import { Component, OnInit } from '@angular/core';
import { SquadDto } from '../../../../shared/models/squad/squad.dto';
import { ToastrService } from 'ngx-toastr';
import { SquadService } from '../../services/squad.service';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../../../shared/services/authentication.service';

@Component({
  selector: 'app-list-squads',
  templateUrl: './list-squads.component.html',
  styleUrls: ['./list-squads.component.scss'],
})
export class ListSquadsComponent implements OnInit {
  allSquadsUser: SquadDto[] = [];

  constructor(
    private notify: ToastrService,
    private mySquadService: SquadService,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    const userId = this.authenticationService.getUserLogged.userId;

    this.mySquadService.getAllByUserId(userId).subscribe({
      next: (response: SquadDto[]) => {
        this.allSquadsUser = response;
      },
    });
  }

  confirmDeleteSquad(squadId: string, name: string): void {
    Swal.fire({
      title: 'Atenção',
      html: `Tem certeza que deseja remover este squad: <strong>${name}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => this.deleteSquad(squadId, result.isConfirmed));
  }

  private deleteSquad(squadId: string, confirmed: boolean): void {
    if (!confirmed) return;

    this.mySquadService.delete(squadId).subscribe({
      next: (response) => {
        this.allSquadsUser = this.allSquadsUser.filter(
          (s) => s.id != response.id,
        );
        this.notify.success('Squad deletado com sucesso!');
      },
    });
  }
}
