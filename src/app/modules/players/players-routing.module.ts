import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './players.component';
import { CreatePlayerComponent } from './pages/create-player/create-player.component';
import { UpdatePlayerComponent } from './pages/update-player/update-player.component';

const routes: Routes = [
    {
        path: '',
        component: PlayersComponent,
        children: [
            {
                path: 'create/:squadId',
                component: CreatePlayerComponent,
            },
            {
                path: 'update/:playerId',
                component: UpdatePlayerComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlayersRoutingModule {}
