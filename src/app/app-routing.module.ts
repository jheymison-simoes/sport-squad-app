import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthenticatedGuard } from './core/guards/user-authenticated.guard';
import { UserNotAuthenticatedGuard } from './core/guards/user-not-authenticated.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
        canActivate: [UserNotAuthenticatedGuard],
    },
    {
        path: 'my-squads',
        loadChildren: () => import('./modules/my-squads/my-squads.module').then((m) => m.MySquadsModule),
        canActivate: [UserAuthenticatedGuard],
    },
    {
        path: 'players',
        loadChildren: () => import('./modules/players/players.module').then((m) => m.PlayersModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
