import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "./components/nav/nav.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    NavComponent
  ],
  exports: [
    NavComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class SharedModule { }
