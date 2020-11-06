
import { timer as observableTimer, of as observableOf, Subscription, Subject, BehaviorSubject, Observable } from 'rxjs';
import { skip, refCount, publishLast, map, tap } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
//import { ServiceClient, UserLoginInfoDto, PasswordResetDto, ImpersonateDto } from '../../generated/service-client';
import { ServiceClient, User } from '../../generated/service-client';
import { Permissions } from '../../generated/permission-set';
import { EnvService, InitConfiguration } from '../env';
import { ValidationService } from '../validation';
import { TenantService } from '../tenant/tenant.service';
import { NotifyService } from '../shared/notify.service';
import { HttpClient, HttpParams, HttpUrlEncodingCodec, HttpHeaders } from '@angular/common/http';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { nextTick } from 'process';

@Injectable()
export class AuthenticationService implements OnDestroy {
    showPrivacyPolicy: boolean;
    redirectToAfterLoginUrl: string;
    private loginTimeoutTimer: Subscription;
    private inactivityTimeoutTimer: Subscription;
    public accessTokenData: AccessTokenData;
    private userInformationData: User;
    private userPermissions: string[];
    private readonly loginStatusSubject = new BehaviorSubject<boolean>(false);
    private readonly isLoginObservable = this.loginStatusSubject.asObservable().pipe(skip(1));
    private externalAccessToken: string;
    isExternalLoginRequestSubject = new BehaviorSubject<boolean>(false);
    private readonly isExternalLoginRequestObservable = this.isExternalLoginRequestSubject.asObservable();

    constructor(
        private http: HttpClient,
        private serviceClient: ServiceClient,
        private initConfigService: EnvService,
        private localStorageService: LocalStorageService,
        private validationService: ValidationService,
        private notifyService: NotifyService,
        private tenantService: TenantService,
        private router: Router
    ) {
        this.isLoginObservable.subscribe(isLoggedIn => {
            if (!isLoggedIn) {
                this.signOutHandler();
                this.tenantService.clearTenantData();
                $('ngb-modal-window, ngb-modal-backdrop').remove();
            }
        });
    }

    login(data?: LoginData): void {
        if (data) {
            this.serviceClient.signIn(data.userName, data.password).subscribe(x => {
                if(x){
                    this.userInformationData = x;
                    this.loginStatusSubject.next(true);
                    this.router.navigateByUrl('home');
                }
            });
        } 
    }

    // OKTA SSO Login
    externalLogin(externalAccessToken: string, data?: LoginData): Observable<any> {
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
        } else {
            this.checkAndConfigureAccessToken();
        }
    }

    ssoLogin(tenantAccessToken: string): Observable<any> {
        var requestBody: HttpParams = new HttpParams({ encoder: new CustomQueryEncoderHelper() });
        requestBody = requestBody.set('tenantAccessTokenString', tenantAccessToken);
        requestBody = requestBody.set('tenantName', this.tenantService.currentTenantName);

        return this.sendSSOLoginRequest(requestBody.toString(), this.processLoginResult(true));
    }

    get isLoggedIn(): Observable<boolean> {
        return this.isLoginObservable;
    }

    get isLoggedInVal(): boolean {
        return this.loginStatusSubject.value;
    }

    get userInformation(): User {
        if (this.userInformationData) {
            return this.userInformationData.clone();
        }

        throw new Error('user is not logged in. call this method in isLoggedIn subscriber');
    }

    get isExternalLogin(): Observable<boolean> {
        return this.isExternalLoginRequestObservable;
    }

    get isExternalLoginVal(): boolean {
        return this.isExternalLoginRequestSubject.value;
    }

    checkPermissions(permissions: string[], requiresAll: boolean = true): boolean {
        requiresAll = requiresAll !== false;

        if (this.isLoggedInVal) {
            if (permissions != null && permissions.length > 0) {
                if (this.userPermissions != null && this.userPermissions.length > 0) {
                    if (requiresAll) {
                        return permissions.every(x => this.userPermissions.indexOf(x) > -1);
                    } else {
                        return permissions.some(x => this.userPermissions.indexOf(x) > -1);
                    }
                }

                return false;
            }

            return true;
        }

        return false;
    }

    signOut(): void {
        this.loginStatusSubject.next(false);
        this.router.navigateByUrl("login")
    }

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

    setExternalLoginRequest(): void {
        const savedAccessTokenData = this.localStorageService.get('access-token') as AccessTokenData;

        if (savedAccessTokenData && savedAccessTokenData.external_token) {
            this.isExternalLoginRequestSubject.next(true);
        }
    }

    public signIn(redirectToHome: boolean = false, asObservable: boolean = false): Observable<any> {
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
    }

    private loginWithRefreshToken(initialLogin: boolean): void {
        if (this.accessTokenData) {
            var requestBody = new HttpParams();

            requestBody = requestBody.set('client_id', this.initConfigService.get().clientId);
            requestBody = requestBody.set('grant_type', 'refresh_token');
            requestBody = requestBody.set('refresh_token', this.accessTokenData.refresh_token);

            this.sendLoginRequest(requestBody.toString(), this.processLoginResult(initialLogin));
        }
    }

    private sendLoginRequest(body: string, loginResultProcessor: (boolean?) => void): Observable<any> {
        this.validationService.clearMessage('global');

        let loginRequest = this.http.request('post', this.initConfigService.get().webApiUrl + this.initConfigService.get().tokenEndPointUri, {
            body: body,
            headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json; charset=UTF-8' }),
        });
        loginRequest = loginRequest.pipe(publishLast(), refCount());

        loginRequest.subscribe((res) => {
            loginResultProcessor(res);
        }, (res) => {
            if (res.status) {
                if (res.error.error_description === 'UserPasswordExpired' || res.error.error_description === 'PasswordResetRequired') {
                    // These are handled in component
                    return;
                } else if (res.error.error_description === 'LockedOut') {
                    this.validationService.error('repportal-system-lockedout');
                } else {
                    this.validationService.error('repportal-system-authenticationfailed');
                }
            } else {
                this.notifyService.error({
                    title: 'repportal-system-errormessage',
                    text: 'repportal-system-cannotconnect'
                });
            }

            this.signOut();
        });

        return loginRequest;
    }

    private processLoginResult(initialLogin = false, redirectToHomePage = false): (any) => void {
        var accessToken = this.localStorageService.get('access-token');
        return (loginResponse: any) => {
            if (!loginResponse.error) {
                if (accessToken != undefined && accessToken != null) {
                    this.showPrivacyPolicy = false;
                }
                else {
                    this.showPrivacyPolicy = true;
                }
                const accessTokenData = loginResponse as AccessTokenData;
                const accessTokenLoginTimestamp = new Date().getTime();
                const accessTokenExpiresIn = accessTokenData.expires_in * 1000;

                this.accessTokenData = {
                    access_token: accessTokenData.access_token,
                    expires_in: accessTokenExpiresIn,
                    loginTimestamp: accessTokenLoginTimestamp,
                    refresh_token: accessTokenData.refresh_token,
                    token_type: accessTokenData.token_type,
                    external_token: this.externalAccessToken
                };

                delete accessTokenData.access_token;
                accessTokenData.loginTimestamp = accessTokenLoginTimestamp;
                accessTokenData.expires_in = accessTokenExpiresIn;
                accessTokenData.external_token = this.externalAccessToken;

                this.localStorageService.set('access-token', accessTokenData);
            } else {
                this.validationService.error('repportal-system-authenticationfailed');
            }

            this.checkAndConfigureAccessToken(initialLogin, redirectToHomePage);
        };
    }

    private sendSSOLoginRequest(body: string, loginResultProcessor: (any) => void): Observable<any> {

        let ssoLoginRequest = this.http.request('post', this.initConfigService.get().webApiUrl + '/api/TenantAccessToken', {
            body: body,
            headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json; charset=UTF-8' }),
        });

        ssoLoginRequest = ssoLoginRequest.pipe(publishLast(), refCount());

        ssoLoginRequest.subscribe((res) => {
            loginResultProcessor(res);
        }, (res) => {
            if (res.status) {
                this.validationService.error('repportal-system-authenticationfailed');
            } else {
                this.notifyService.error({
                    title: 'repportal-system-errormessage',
                    text: 'repportal-system-cannotconnect'
                });
            }

            this.signOut();
        });

        return ssoLoginRequest;
    }

    private checkAndConfigureAccessToken(initialLogin = false, redirectToHomePage = false) {
        if (!this.accessTokenData) {
            this.useSavedAccessToken();
        } else if (this.validateAccessToken()) {
            this.configureLoginTimeout();

            if (initialLogin) {
                this.signIn(redirectToHomePage);
            }
        } else {
            this.signOut();
        }
    }

    private useSavedAccessToken(): void {
        const savedAccessTokenData = this.localStorageService.get('access-token') as AccessTokenData;

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
            } else {
                this.signOut();
            }
        } else {
            this.signOut();
        }
    }

    private configureLoginTimeout(): void {
        if (this.loginTimeoutTimer) {
            this.loginTimeoutTimer.unsubscribe();
        }

        if (this.accessTokenData) {
            // logout 10 seconds before the authentication token expires
            this.loginTimeoutTimer = observableTimer(this.accessTokenData.expires_in - 10000).subscribe(() => {
                if (this.validateRefreshToken()) {
                    this.loginWithRefreshToken(false);
                } else {
                    this.signOut();
                }
            });
        }
    }

    public configureInactivityTimeout(): void {
        if (this.inactivityTimeoutTimer) {
            this.inactivityTimeoutTimer.unsubscribe();
        }

        // logout 10 seconds before the refresh token expires
        this.inactivityTimeoutTimer = observableTimer(this.initConfigService.get().refreshTokenLiftime - 10000).subscribe(() => {
            this.signOut();
        });
    }

    private signOutHandler(): void {
        this.accessTokenData = null;
        this.userPermissions = null;
        this.localStorageService.remove('access-token');
    }

    private validateAccessToken(): boolean {
        return this.accessTokenData && this.accessTokenData.access_token && this.accessTokenData.expires_in
            && this.accessTokenData.loginTimestamp && this.getRemainingTokenValidityPeriodForAccessToken(this.accessTokenData) > 0;
    }

    private getRemainingTokenValidityPeriodForAccessToken(data: AccessTokenData): number {
        return data.expires_in - (new Date().getTime() - data.loginTimestamp);
    }

    private validateRefreshToken(): boolean {
        return this.accessTokenData
            && this.initConfigService.get().refreshTokenLiftime - (new Date().getTime() - this.accessTokenData.loginTimestamp) > 0;
    }

    ngOnDestroy(): void {
        this.loginStatusSubject.unsubscribe();
        this.isExternalLoginRequestSubject.unsubscribe();
    }
}

export class LoginData {
    userName: string;
    password: string;
}

export interface AccessTokenData {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token: string;
    loginTimestamp: number;
    external_token: string;
}

export class CustomQueryEncoderHelper extends HttpUrlEncodingCodec {
    encodeKey(k: string): string {
        k = super.encodeKey(k);
        return k.replace(/\+/gi, '%2B');
    }
    encodeValue(v: string): string {
        v = super.encodeValue(v);
        return v.replace(/\+/gi, '%2B');
    }
}
