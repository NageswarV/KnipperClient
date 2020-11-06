import { __decorate, __metadata } from "tslib";
import { of as observableOf } from 'rxjs';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication';
import { TenantService } from '../tenant';
var AuthenticationGuard = /** @class */ (function () {
    function AuthenticationGuard(authService, router, tenantService, location) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        this.tenantService = tenantService;
        this.isLoading = true;
        this.authService.isLoggedIn.subscribe(function (result) {
            _this.isLoggedIn = result;
            _this.isLoading = false;
            var url = _this.isLoggedIn ? _this.router.url : '';
            _this.checkRedirectionAfterLogin(url);
            _this.checkIfSignedOut();
        });
        this.authService.login();
    }
    AuthenticationGuard.prototype.checkIfSignedOut = function () {
        if (!this.isLoggedIn && !this.isLoading) {
            this.router.navigate(['/login']);
        }
    };
    AuthenticationGuard.prototype.checkRedirectionAfterLogin = function (url) {
        if ((this.authService.redirectToAfterLoginUrl !== null && this.authService.redirectToAfterLoginUrl !== undefined) || url.startsWith('/login') || url.startsWith('/passwordforgot')
            || url.startsWith('/passwordreset') || url.startsWith('/sso')) {
            var redirectUrl = this.authService.redirectToAfterLoginUrl ? this.authService.redirectToAfterLoginUrl : '';
            this.authService.redirectToAfterLoginUrl = null;
            this.router.navigateByUrl(redirectUrl);
        }
        else if (this.isLoggedIn) {
            this.router.navigate(['/home']);
        }
    };
    AuthenticationGuard.prototype.canActivate = function (route, state) {
        return this.checkLogin(state.url);
    };
    AuthenticationGuard.prototype.canActivateChild = function (childRoute, state) {
        return this.canActivate(childRoute, state);
    };
    AuthenticationGuard.prototype.checkLogin = function (url) {
        if (this.isLoading) {
            this.authService.redirectToAfterLoginUrl = url;
        }
        if (!this.authService.isLoggedInVal
        // && !this.isLoading
        ) {
            this.authService.redirectToAfterLoginUrl = url;
            this.redirectToAuthenticationMethod();
        }
        return observableOf(this.authService.isLoggedInVal);
    };
    AuthenticationGuard.prototype.redirectToAuthenticationMethod = function () {
        this.router.navigate(['/login']);
    };
    AuthenticationGuard.prototype.ngOnDestroy = function () {
        //this.loginStatusChangeSubscription.unsubscribe();
    };
    AuthenticationGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AuthenticationService,
            Router,
            TenantService,
            Location])
    ], AuthenticationGuard);
    return AuthenticationGuard;
}());
export { AuthenticationGuard };
//# sourceMappingURL=authentication.guard.js.map