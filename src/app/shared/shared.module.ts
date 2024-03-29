import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { StarRatingModule } from 'angular-star-rating';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { DefaultHeaderComponent } from './components/default-header/default-header.component';

@NgModule({
  declarations: [NavComponent, DefaultHeaderComponent],
  exports: [NavComponent, DefaultHeaderComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    StarRatingModule.forRoot(),
    MatCardModule,
    MatMenuModule,
    MatIconModule,
  ],
})
export class SharedModule {}
