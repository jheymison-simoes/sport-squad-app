import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySquadsComponent } from "./my-squads.component";
import { CreateSquadComponent } from "./pages/create-squad/create-squad.component";
import { SquadComponent } from "./pages/squad/squad.component";
import { ListSquadsComponent } from "./pages/list-squads/list-squads.component";

const routes: Routes = [
  {
    path: '',
    component: MySquadsComponent,
    children: [
      {
        path: '',
        component: ListSquadsComponent
      },
      {
        path: 'create',
        component: CreateSquadComponent
      },
      {
        path: 'squad/:squadId',
        component: SquadComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MySquadsRoutingModule { }
