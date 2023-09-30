import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-squads',
    pathMatch: 'full'
  },
  {
    path: 'my-squads',
    loadChildren: () => import('./modules/my-squads/my-squads.module').then(m => m.MySquadsModule)
  },
  {
    path: 'players',
    loadChildren: () => import('./modules/players/players.module').then(m => m.PlayersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
