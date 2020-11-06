import { Adal5Service } from 'adal-angular5';
import { Injectable } from '@angular/core';
import { AppConfiguration } from '../shared/app-configuration';
import { ApplicationInsightsService } from '../core/applications-insights.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private readonly idTokenKey: string = 'samplicity-id-token';
  private readonly accessTokenKey: string = 'samplicity-access-token';
  private _config: any = AppConfiguration.azureAADConfig;

  constructor(
    private _adal: Adal5Service,
    private applicationInsightsService: ApplicationInsightsService
  ) {
    this._adal.init(this._config);
  }

  public isLoggedIn(): boolean {
    return this._adal.userInfo.authenticated;
  }

  public signout(): void {
    this.applicationInsightsService.clearUserId();
    this._adal.logOut();
  }

  public startAuthentication(): any {
    this._adal.login();
  }

  public getProfile(): any {
    if (this._adal.userInfo) {
      return this._adal.userInfo.profile;
    }
    return null;
  }

  public getUsername(): string {
    const profile = this.getProfile();
    if (profile) {
      if (profile.email) {
        return profile.email;
      }
      if (profile.upn) {
        return profile.upn;
      }
    }
    return null;
  }

  public getCachedToken(resource: string): string {
    return this._adal.getCachedToken(resource);
  }

  public refreshToken(resource: string = null): void {
    this.acquireToken(resource).subscribe(token => {
      return token;
    });
  }

  public acquireToken(resource: string = null): Observable<string> {
   /*
             Need to call acquireToken to check for/handle token refresh.

              See the following for more information on token renewals:
              https://stackoverflow.com/questions/45517630/angular-2-adal-token-refresh-for-implicit-flow-using-adal-angular4?rq=1
    */
    if ( resource === null) {
      resource = this._config.clientId;
    }
    /*
        Sets adal.config "extraQueryParameter" to "login_hint=<cached username>".

        This is required to handle 2 situations:

        1.  When there are multiple logged-in Microsoft accounts, this will identify the specific account to renew the token.
            Otherwise there will be an "interaction required" error returned.

            https://github.com/AzureAD/azure-activedirectory-library-for-js/issues/580

        2.  Adal.js automatically adds the "login_hint" above, if there exists a "upn" claim on the Azure AD JWT Token.
            This handles situations where we want to authenticate users without configuring Azure AD to provided "custom" claims.

            https://stackoverflow.com/questions/45047129/where-is-the-upn-claim-for-a-guested-user
            https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-optional-claims
    */
    if (this._adal.userInfo.username) {
      this._adal.config.extraQueryParameter = 'login_hint=' + this._adal.userInfo.username;
    }
    //return this._adal.acquireToken(new Observable<string>(observer => { observer.next(resource) });
    return new Observable((observer) => {
      const handler = (e) => observer.next(resource);

      return () => {
        // Detach the event handler from the target
      };
    });
  }

  public receiveAccessToken() {
    const hash = window.location.hash;
    const token = hash.substring('#access_token='.length);
    localStorage.setItem(this.accessTokenKey, token);
  }

  public completeAuthentication(): void {
    this._adal.handleWindowCallback();
    this._adal.getUser().subscribe((user) => {
      localStorage.setItem(this.idTokenKey, this._adal.userInfo.token);
    });
  }
}
