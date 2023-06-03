import { Component, OnInit } from '@angular/core';
import {MySquadService} from "./services/my-squad.service";
import {SquadDto} from "./models/squad.dto";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-my-squads',
  templateUrl: './my-squads.component.html',
  styleUrls: ['./my-squads.component.scss']
})
export class MySquadsComponent implements OnInit {

  allSquadsUser: SquadDto[];

  constructor(private mySquadService: MySquadService) { }

  ngOnInit(): void {
    const userId= Guid.parse('6ef8a1e2-6572-4e80-be47-34fb991d37e6');

    this.mySquadService.getAllByUserId(userId).subscribe({
      next: (response: SquadDto[]) => {
        this.allSquadsUser = response;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
