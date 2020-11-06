import { __decorate, __metadata } from "tslib";
import { Adal5Service } from 'adal-angular5';
import { Injectable } from '@angular/core';
import { AppConfiguration } from '../shared/app-configuration';
import { ApplicationInsightsService } from '../core/applications-insights.service';
import { Observable } from 'rxjs/Observable';
var AuthService = /** @class */ (function () {
    function AuthService(_adal, applicationInsightsService) {
        this._adal = _adal;
        this.applicationInsightsService = applicationInsightsService;
        this.idTokenKey = 'samplicity-id-token';
        this.accessTokenKey = 'samplicity-access-token';
        this._config = AppConfiguration.azureAADConfig;
        this._adal.init(this._config);
    }
    AuthService.prototype.isLoggedIn = function () {
        return this._adal.userInfo.authenticated;
    };
    AuthService.prototype.signout = function () {
        this.applicationInsightsService.clearUserId();
        this._adal.logOut();
    };
    AuthService.prototype.startAuthentication = function () {
        this._adal.login();
    };
    AuthService.prototype.getProfile = function () {
        if (this._adal.userInfo) {
            return this._adal.userInfo.profile;
        }
        return null;
    };
    AuthService.prototype.getUsername = function () {
        var profile = this.getProfile();
        if (profile) {
            if (profile.email) {
                return profile.email;
            }
            if (profile.upn) {
                return profile.upn;
            }
        }
        return null;
    };
    AuthService.prototype.getCachedToken = function (resource) {
        return this._adal.getCachedToken(resource);
    };
    AuthService.prototype.refreshToken = function (resource) {
        if (resource === void 0) { resource = null; }
        this.acquireToken(resource).subscribe(function (token) {
            return token;
        });
    };
    AuthService.prototype.acquireToken = function (resource) {
        if (resource === void 0) { resource = null; }
        /*
                  Need to call acquireToken to check for/handle token refresh.
     
                   See the following for more information on token renewals:
                   https://stackoverflow.com/questions/45517630/angular-2-adal-token-refresh-for-implicit-flow-using-adal-angular4?rq=1
         */
        if (resource === null) {
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
        return new Observable(function (observer) {
            var handler = function (e) { return observer.next(resource); };
            return function () {
                // Detach the event handler from the target
            };
        });
    };
    AuthService.prototype.receiveAccessToken = function () {
        var hash = window.location.hash;
        var token = hash.substring('#access_token='.length);
        localStorage.setItem(this.accessTokenKey, token);
    };
    AuthService.prototype.completeAuthentication = function () {
        var _this = this;
        this._adal.handleWindowCallback();
        this._adal.getUser().subscribe(function (user) {
            localStorage.setItem(_this.idTokenKey, _this._adal.userInfo.token);
        });
    };
    AuthService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Adal5Service,
            ApplicationInsightsService])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map