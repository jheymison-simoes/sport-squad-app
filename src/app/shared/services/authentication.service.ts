import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subject} from "rxjs";
import {BaseResponse} from "../models/base-response.model";
import {BaseService} from "../base/base.service";
import {SocialUser} from "@abacritt/angularx-social-login";
import {UserSession} from "../models/user/user-session.dto";
import {Router} from "@angular/router";
import {Buffer} from "buffer";
import * as moment from "moment";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {
  baseUri: string = `${this.baseUrl}/authenticated`;
  userSession: UserSession;
  accessTokenKey = "access_token";
  private userIsLoggedSubject = new Subject<boolean>();

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    super();
    this.userIsLoggedSubject = new Subject<boolean>();
  }

  loginWithGoogle(user: SocialUser): Observable<UserSession> {
    const uri = `${this.baseUri}/loginwithgoogle/`;
    return this.httpClient.post<BaseResponse<UserSession>>(uri, user)
      .pipe(map(this.validationResult));
  }

  get getUserLogged(): UserSession {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) return null;

    const accessTokenDecode = JSON.parse(Buffer.from(accessToken, 'base64').toString('binary'));
    this.userSession = Object.assign({}, this.userSession, accessTokenDecode);

    return this.userSession;
  }

  get userIsLogged(): boolean {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) return false;

    const accessTokenDecode = JSON.parse(Buffer.from(accessToken, 'base64').toString('binary'));
    this.userSession = Object.assign({}, this.userSession, accessTokenDecode) as UserSession;

    const currentDate =  moment.utc();
    const tokenDateExpire = moment(this.userSession.expireTimeSpan);
    return !(currentDate.isAfter(tokenDateExpire));
  }

  setUserInLocalStorage(userSession: UserSession): void {
    let userSessionJson = Buffer.from(JSON.stringify(userSession)).toString("base64");
    localStorage.setItem(this.accessTokenKey, userSessionJson);
    this.userIsLoggedSubject.next(true);
  }

  get getToken(): string | null {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) return null;

    const accessTokenDecode = JSON.parse(Buffer.from(accessToken, 'base64').toString('binary'));
    this.userSession = Object.assign({}, this.userSession, accessTokenDecode);

    return this.userSession.token;
  }

  getUserIsLogged(): Observable<boolean> {
    return this.userIsLoggedSubject.asObservable();
  }

  logout() {
    localStorage.removeItem(this.accessTokenKey);
    this.userIsLoggedSubject.next(false);
    this.router.navigate(['home']).then(() => window.location.reload());
  }
}
