import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserSession } from '../../shared/models/user/user-session.dto';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    user: SocialUser;
    userSession: UserSession;
    accessTokenKey = 'access_token';

    constructor(
        private socialAuthService: SocialAuthService,
        private notify: ToastrService,
        private authenticationService: AuthenticationService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.checkUserIsLogged();
    }

    //#region Private Methods
    private checkUserIsLogged(): void {
        const userIsLogged = this.authenticationService.userIsLogged;
        if (userIsLogged) {
            this.userSession = this.authenticationService.getUserLogged;
            this.navigateToMySquads();
            return;
        }

        this.subscribeAuthGoogle();
    }

    private subscribeAuthGoogle(): void {
        this.socialAuthService.authState.subscribe({
            next: (user) => this.loginWithGoogle(user),
            error: (error) => this.notify.error(error),
        });
    }

    private loginWithGoogle(user: SocialUser): void {
        this.authenticationService.loginWithGoogle(user).subscribe((response) => {
            this.userSession = response;
            this.authenticationService.setUserInLocalStorage(this.userSession);
            this.navigateToMySquads();
        });
    }

    private navigateToMySquads = () => this.router.navigate(['my-squads']);
    //#endregion
}
