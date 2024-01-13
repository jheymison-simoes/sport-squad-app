import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UserSession } from '../../models/user/user-session.dto';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
    logoSrc = '../../../../assets/images/mr-logo.png';
    isLogged = false;
    userSession: UserSession;

    constructor(private authenticationService: AuthenticationService) {}

    ngOnInit(): void {
        this.isLogged = this.authenticationService.userIsLogged;
        if (this.isLogged) this.userSession = this.authenticationService.getUserLogged;
        this.authenticationService.getUserIsLogged().subscribe((isLogged) => (this.isLogged = isLogged));
    }

    logout() {
        this.authenticationService.logout();
    }
}
