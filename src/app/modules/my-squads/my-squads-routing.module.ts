import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySquadsComponent } from "./my-squads.component";

const routes: Routes = [
  {
    path: '',
    component: MySquadsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MySquadsRoutingModule { }
