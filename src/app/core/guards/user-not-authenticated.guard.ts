import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserNotAuthenticatedGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  canActivate() {
    if (this.authenticationService.userIsLogged) {
      this.router.navigate(['my-squads']);
      return false;
    }
    return true;
  }
}
