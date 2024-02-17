import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HomeComponent],
  imports: [HomeRoutingModule, SocialLoginModule, MatButtonModule],
})
export class HomeModule {}
