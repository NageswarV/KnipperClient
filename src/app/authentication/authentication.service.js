import { __decorate, __extends, __metadata } from "tslib";
import { timer as observableTimer, BehaviorSubject } from 'rxjs';
import { skip, refCount, publishLast } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
//import { ServiceClient, UserLoginInfoDto, PasswordResetDto, ImpersonateDto } from '../../generated/service-client';
import { ServiceClient } from '../../generated/service-client';
import { EnvService } from '../env';
import { ValidationService } from '../validation';
import { TenantService } from '../tenant/tenant.service';
import { NotifyService } from '../shared/notify.service';
import { HttpClient, HttpParams, HttpUrlEncodingCodec, HttpHeaders } from '@angular/common/http';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, serviceClient, initConfigService, localStorageService, validationService, notifyService, tenantService, router) {
        var _this = this;
        this.http = http;
        this.serviceClient = serviceClient;
        this.initConfigService = initConfigService;
        this.localStorageService = localStorageService;
        this.validationService = validationService;
        this.notifyService = notifyService;
        this.tenantService = tenantService;
        this.router = router;
        this.loginStatusSubject = new BehaviorSubject(false);
        this.isLoginObservable = this.loginStatusSubject.asObservable().pipe(skip(1));
        this.isExternalLoginRequestSubject = new BehaviorSubject(false);
        this.isExternalLoginRequestObservable = this.isExternalLoginRequestSubject.asObservable();
        this.isLoginObservable.subscribe(function (isLoggedIn) {
            if (!isLoggedIn) {
                _this.signOutHandler();
                _this.tenantService.clearTenantData();
                $('ngb-modal-window, ngb-modal-backdrop').remove();
            }
        });
    }
    AuthenticationService.prototype.login = function (data) {
        var _this = this;
        if (data) {
            this.serviceClient.signIn(data.userName, data.password).subscribe(function (x) {
                if (x) {
                    _this.userInformationData = x;
                    _this.loginStatusSubject.next(true);
                    _this.router.navigateByUrl('home');
                }
            });
        }
    };
    // OKTA SSO Login
    AuthenticationService.prototype.externalLogin = function (externalAccessToken, data) {
        if (data) {
            this.externalAccessToken = externalAccessToken;
            var requestBody = new HttpParams();
            requestBody = requestBody.set('client_id', this.initConfigService.get().clientId);
            requestBody = requestBody.set('grant_type', 'password');
            requestBody = requestBody.set('username', data.userName);
            requestBody = requestBody.set('tenant_name', this.tenantService.currentTenantName);
            requestBody = requestBody.set('tenant_id', this.tenantService.currentTenantId);
            requestBody = requestBody.set('external_access_token', externalAccessToken);
            return this.sendLoginRequest(requestBody.toString(), this.processLoginResult(true));
        }
        else {
            this.checkAndConfigureAccessToken();
        }
    };
    AuthenticationService.prototype.ssoLogin = function (tenantAccessToken) {
        var requestBody = new HttpParams({ encoder: new CustomQueryEncoderHelper() });
        requestBody = requestBody.set('tenantAccessTokenString', tenantAccessToken);
        requestBody = requestBody.set('tenantName', this.tenantService.currentTenantName);
        return this.sendSSOLoginRequest(requestBody.toString(), this.processLoginResult(true));
    };
    Object.defineProperty(AuthenticationService.prototype, "isLoggedIn", {
        get: function () {
            return this.isLoginObservable;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthenticationService.prototype, "isLoggedInVal", {
        get: function () {
            return this.loginStatusSubject.value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthenticationService.prototype, "userInformation", {
        get: function () {
            if (this.userInformationData) {
                return this.userInformationData.clone();
            }
            throw new Error('user is not logged in. call this method in isLoggedIn subscriber');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthenticationService.prototype, "isExternalLogin", {
        get: function () {
            return this.isExternalLoginRequestObservable;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthenticationService.prototype, "isExternalLoginVal", {
        get: function () {
            return this.isExternalLoginRequestSubject.value;
        },
        enumerable: false,
        configurable: true
    });
    AuthenticationService.prototype.checkPermissions = function (permissions, requiresAll) {
        var _this = this;
        if (requiresAll === void 0) { requiresAll = true; }
        requiresAll = requiresAll !== false;
        if (this.isLoggedInVal) {
            if (permissions != null && permissions.length > 0) {
                if (this.userPermissions != null && this.userPermissions.length > 0) {
                    if (requiresAll) {
                        return permissions.every(function (x) { return _this.userPermissions.indexOf(x) > -1; });
                    }
                    else {
                        return permissions.some(function (x) { return _this.userPermissions.indexOf(x) > -1; });
                    }
                }
                return false;
            }
            return true;
        }
        return false;
    };
    AuthenticationService.prototype.signOut = function () {
        this.loginStatusSubject.next(false);
        this.router.navigateByUrl("login");
    };
    // resetUserPasswordRequest(emailAddress: string): Observable<void> {
    //     return this.serviceClient.requestUserPasswordReset(new PasswordResetDto({
    //         emailAddress: emailAddress
    //     })).pipe(map(x => x.result));
    // }
    // validateUserPasswordResetToken(emailAddress: string, resetToken: string): Observable<boolean> {
    //     return this.serviceClient.validateUserPasswordResetToken(new PasswordResetDto({
    //         emailAddress: emailAddress,
    //         resetToken: resetToken
    //     })).pipe(map(x => x.result));
    // }
    // resetUserPassword(emailAddress: string, resetToken: string, newPassword: string): Observable<void> {
    //     return this.serviceClient.resetUserPassword(new PasswordResetDto({
    //         emailAddress: emailAddress,
    //         resetToken: resetToken,
    //         newPassword: newPassword
    //     })).pipe(map(x => x.result));
    // }
    // renewExpiredUserPassword(emailAddress: string, oldPassword: string, newPassword: string): Observable<void> {
    //     return this.serviceClient.renewExpiredUserPassword(new PasswordResetDto({
    //         emailAddress: emailAddress,
    //         oldPassword: oldPassword,
    //         newPassword: newPassword
    //     })).pipe(map(x => x.result));
    // }
    AuthenticationService.prototype.setExternalLoginRequest = function () {
        var savedAccessTokenData = this.localStorageService.get('access-token');
        if (savedAccessTokenData && savedAccessTokenData.external_token) {
            this.isExternalLoginRequestSubject.next(true);
        }
    };
    AuthenticationService.prototype.signIn = function (redirectToHome, asObservable) {
        // if (asObservable) {
        //     return this.serviceClient.getCurrentLoginInformations().pipe(
        //         map(p => {
        //             if (p.result) {
        //                 return p.result;
        //             }
        //         }), tap(p => {
        //             if (p) {
        //                 this.userInformationData = p.user;
        //                 this.userPermissions = p.user.userPermissions != null ? p.user.userPermissions.map(x => x.name) : [];
        //                 this.impersonatingUserInformationData = p.impersonatingUser;
        if (redirectToHome === void 0) { redirectToHome = false; }
        if (asObservable === void 0) { asObservable = false; }
        //                 var accessSiteinMaintenanceMode = this.userPermissions.indexOf(Permissions.AccessSiteinMaintenanceMode);
        //                 if ((this.tenantService.maintenanceMode && accessSiteinMaintenanceMode > -1) || !this.tenantService.maintenanceMode) {
        //                     this.loginStatusSubject.next(true);
        //                     if (redirectToHome) {
        //                         const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        //                         this.router.navigate(['/home'], { queryParams: { id: id } });
        //                     }
        //                 }
        //                 else {
        //                     this.loginStatusSubject.next(false);
        //                     this.router.navigate(['/undermaintenance']);
        //                 }
        //             } else {
        //                 this.signOut();
        //             }
        //         }));
        // }
        // else {
        //     this.serviceClient.getCurrentLoginInformations().pipe(
        //         map(p => {
        //             if (p.result) {
        //                 return p.result;
        //             }
        //         })).subscribe(p => {
        //             if (p) {
        //                 this.userInformationData = p.user;
        //                 this.userPermissions = p.user.userPermissions != null ? p.user.userPermissions.map(x => x.name) : [];
        //                 this.impersonatingUserInformationData = p.impersonatingUser;
        //                 var accessSiteinMaintenanceMode = this.userPermissions.indexOf(Permissions.AccessSiteinMaintenanceMode);
        //                 if ((this.tenantService.maintenanceMode && accessSiteinMaintenanceMode > -1) || !this.tenantService.maintenanceMode) {
        //                     this.loginStatusSubject.next(true);
        //                     if (redirectToHome) {
        //                         const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        //                         this.router.navigate(['/home'], { queryParams: { id: id } });
        //                     }
        //                 }
        //                 else {
        //                     this.loginStatusSubject.next(false);
        //                     this.router.navigate(['/undermaintenance']);
        //                 }
        //             } else {
        //                 this.signOut();
        //             }
        //         });
        //     return null;
        // }
        //TODO: Remove
        return null;
    };
    AuthenticationService.prototype.loginWithRefreshToken = function (initialLogin) {
        if (this.accessTokenData) {
            var requestBody = new HttpParams();
            requestBody = requestBody.set('client_id', this.initConfigService.get().clientId);
            requestBody = requestBody.set('grant_type', 'refresh_token');
            requestBody = requestBody.set('refresh_token', this.accessTokenData.refresh_token);
            this.sendLoginRequest(requestBody.toString(), this.processLoginResult(initialLogin));
        }
    };
    AuthenticationService.prototype.sendLoginRequest = function (body, loginResultProcessor) {
        var _this = this;
        this.validationService.clearMessage('global');
        var loginRequest = this.http.request('post', this.initConfigService.get().webApiUrl + this.initConfigService.get().tokenEndPointUri, {
            body: body,
            headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json; charset=UTF-8' }),
        });
        loginRequest = loginRequest.pipe(publishLast(), refCount());
        loginRequest.subscribe(function (res) {
            loginResultProcessor(res);
        }, function (res) {
            if (res.status) {
                if (res.error.error_description === 'UserPasswordExpired' || res.error.error_description === 'PasswordResetRequired') {
                    // These are handled in component
                    return;
                }
                else if (res.error.error_description === 'LockedOut') {
                    _this.validationService.error('repportal-system-lockedout');
                }
                else {
                    _this.validationService.error('repportal-system-authenticationfailed');
                }
            }
            else {
                _this.notifyService.error({
                    title: 'repportal-system-errormessage',
                    text: 'repportal-system-cannotconnect'
                });
            }
            _this.signOut();
        });
        return loginRequest;
    };
    AuthenticationService.prototype.processLoginResult = function (initialLogin, redirectToHomePage) {
        var _this = this;
        if (initialLogin === void 0) { initialLogin = false; }
        if (redirectToHomePage === void 0) { redirectToHomePage = false; }
        var accessToken = this.localStorageService.get('access-token');
        return function (loginResponse) {
            if (!loginResponse.error) {
                if (accessToken != undefined && accessToken != null) {
                    _this.showPrivacyPolicy = false;
                }
                else {
                    _this.showPrivacyPolicy = true;
                }
                var accessTokenData = loginResponse;
                var accessTokenLoginTimestamp = new Date().getTime();
                var accessTokenExpiresIn = accessTokenData.expires_in * 1000;
                _this.accessTokenData = {
                    access_token: accessTokenData.access_token,
                    expires_in: accessTokenExpiresIn,
                    loginTimestamp: accessTokenLoginTimestamp,
                    refresh_token: accessTokenData.refresh_token,
                    token_type: accessTokenData.token_type,
                    external_token: _this.externalAccessToken
                };
                delete accessTokenData.access_token;
                accessTokenData.loginTimestamp = accessTokenLoginTimestamp;
                accessTokenData.expires_in = accessTokenExpiresIn;
                accessTokenData.external_token = _this.externalAccessToken;
                _this.localStorageService.set('access-token', accessTokenData);
            }
            else {
                _this.validationService.error('repportal-system-authenticationfailed');
            }
            _this.checkAndConfigureAccessToken(initialLogin, redirectToHomePage);
        };
    };
    AuthenticationService.prototype.sendSSOLoginRequest = function (body, loginResultProcessor) {
        var _this = this;
        var ssoLoginRequest = this.http.request('post', this.initConfigService.get().webApiUrl + '/api/TenantAccessToken', {
            body: body,
            headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json; charset=UTF-8' }),
        });
        ssoLoginRequest = ssoLoginRequest.pipe(publishLast(), refCount());
        ssoLoginRequest.subscribe(function (res) {
            loginResultProcessor(res);
        }, function (res) {
            if (res.status) {
                _this.validationService.error('repportal-system-authenticationfailed');
            }
            else {
                _this.notifyService.error({
                    title: 'repportal-system-errormessage',
                    text: 'repportal-system-cannotconnect'
                });
            }
            _this.signOut();
        });
        return ssoLoginRequest;
    };
    AuthenticationService.prototype.checkAndConfigureAccessToken = function (initialLogin, redirectToHomePage) {
        if (initialLogin === void 0) { initialLogin = false; }
        if (redirectToHomePage === void 0) { redirectToHomePage = false; }
        if (!this.accessTokenData) {
            this.useSavedAccessToken();
        }
        else if (this.validateAccessToken()) {
            this.configureLoginTimeout();
            if (initialLogin) {
                this.signIn(redirectToHomePage);
            }
        }
        else {
            this.signOut();
        }
    };
    AuthenticationService.prototype.useSavedAccessToken = function () {
        var savedAccessTokenData = this.localStorageService.get('access-token');
        if (savedAccessTokenData) {
            this.accessTokenData = {
                access_token: undefined,
                refresh_token: savedAccessTokenData.refresh_token,
                token_type: savedAccessTokenData.token_type,
                loginTimestamp: savedAccessTokenData.loginTimestamp,
                expires_in: undefined,
                external_token: savedAccessTokenData.external_token
            };
            if (this.validateRefreshToken()) {
                this.loginWithRefreshToken(true);
            }
            else {
                this.signOut();
            }
        }
        else {
            this.signOut();
        }
    };
    AuthenticationService.prototype.configureLoginTimeout = function () {
        var _this = this;
        if (this.loginTimeoutTimer) {
            this.loginTimeoutTimer.unsubscribe();
        }
        if (this.accessTokenData) {
            // logout 10 seconds before the authentication token expires
            this.loginTimeoutTimer = observableTimer(this.accessTokenData.expires_in - 10000).subscribe(function () {
                if (_this.validateRefreshToken()) {
                    _this.loginWithRefreshToken(false);
                }
                else {
                    _this.signOut();
                }
            });
        }
    };
    AuthenticationService.prototype.configureInactivityTimeout = function () {
        var _this = this;
        if (this.inactivityTimeoutTimer) {
            this.inactivityTimeoutTimer.unsubscribe();
        }
        // logout 10 seconds before the refresh token expires
        this.inactivityTimeoutTimer = observableTimer(this.initConfigService.get().refreshTokenLiftime - 10000).subscribe(function () {
            _this.signOut();
        });
    };
    AuthenticationService.prototype.signOutHandler = function () {
        this.accessTokenData = null;
        this.userPermissions = null;
        this.localStorageService.remove('access-token');
    };
    AuthenticationService.prototype.validateAccessToken = function () {
        return this.accessTokenData && this.accessTokenData.access_token && this.accessTokenData.expires_in
            && this.accessTokenData.loginTimestamp && this.getRemainingTokenValidityPeriodForAccessToken(this.accessTokenData) > 0;
    };
    AuthenticationService.prototype.getRemainingTokenValidityPeriodForAccessToken = function (data) {
        return data.expires_in - (new Date().getTime() - data.loginTimestamp);
    };
    AuthenticationService.prototype.validateRefreshToken = function () {
        return this.accessTokenData
            && this.initConfigService.get().refreshTokenLiftime - (new Date().getTime() - this.accessTokenData.loginTimestamp) > 0;
    };
    AuthenticationService.prototype.ngOnDestroy = function () {
        this.loginStatusSubject.unsubscribe();
        this.isExternalLoginRequestSubject.unsubscribe();
    };
    AuthenticationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            ServiceClient,
            EnvService,
            LocalStorageService,
            ValidationService,
            NotifyService,
            TenantService,
            Router])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
var LoginData = /** @class */ (function () {
    function LoginData() {
    }
    return LoginData;
}());
export { LoginData };
var CustomQueryEncoderHelper = /** @class */ (function (_super) {
    __extends(CustomQueryEncoderHelper, _super);
    function CustomQueryEncoderHelper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomQueryEncoderHelper.prototype.encodeKey = function (k) {
        k = _super.prototype.encodeKey.call(this, k);
        return k.replace(/\+/gi, '%2B');
    };
    CustomQueryEncoderHelper.prototype.encodeValue = function (v) {
        v = _super.prototype.encodeValue.call(this, v);
        return v.replace(/\+/gi, '%2B');
    };
    return CustomQueryEncoderHelper;
}(HttpUrlEncodingCodec));
export { CustomQueryEncoderHelper };
//# sourceMappingURL=authentication.service.js.map