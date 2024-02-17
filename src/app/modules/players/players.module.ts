import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PlayersComponent } from './players.component';
import { PlayersRoutingModule } from './players-routing.module';
import { CreatePlayerComponent } from './pages/create-player/create-player.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StarRatingModule } from 'angular-star-rating';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UpdatePlayerComponent } from './pages/update-player/update-player.component';

@NgModule({
  declarations: [
    PlayersComponent,
    CreatePlayerComponent,
    UpdatePlayerComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    PlayersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    StarRatingModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class PlayersModule {}
