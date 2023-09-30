import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';

import { MySquadsRoutingModule } from "./my-squads-routing.module";
import { MySquadsComponent } from "./my-squads.component";
import { CreateSquadComponent } from './pages/create-squad/create-squad.component';
import { CreateSquadConfigComponent } from './components/create-squad-config/create-squad-config.component';
import { SquadComponent } from './pages/squad/squad.component';
import { ListSquadsComponent } from './pages/list-squads/list-squads.component';
import {StarRatingModule} from "angular-star-rating";

@NgModule({
  declarations: [
    MySquadsComponent,
    CreateSquadComponent,
    CreateSquadConfigComponent,
    SquadComponent,
    ListSquadsComponent,
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MySquadsRoutingModule,
    MatCardModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatListModule,
    StarRatingModule,
  ]
})
export class MySquadsModule { }
