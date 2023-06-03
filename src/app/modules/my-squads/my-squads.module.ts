import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


import { MySquadsRoutingModule } from "./my-squads-routing.module";
import { MySquadsComponent } from "./my-squads.component";
import {MatCardModule} from "@angular/material/card";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [MySquadsComponent],
  imports: [
    MatButtonModule,
    CommonModule,
    MySquadsRoutingModule,
    MatCardModule,
    MatTooltipModule,
  ]
})
export class MySquadsModule { }
