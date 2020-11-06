import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
// Reference to this stackoverflow post to resolve the #id_token issue with Angular HashLocationStrategy:
// https://stackoverflow.com/questions/49367651/angular4-azure-active-directory-authentication-using-ng2-adal-library-fails-when
var OAuthCallbackHandlerGuard = /** @class */ (function () {
    function OAuthCallbackHandlerGuard(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    OAuthCallbackHandlerGuard.prototype.canActivate = function (route, state) {
        var hash = window.location.hash;
        if (hash.indexOf('id_token') > 0) {
            this.authService.completeAuthentication();
        }
        else if (hash.indexOf('access_token') > 0) {
            this.authService.receiveAccessToken();
        }
        return true;
    };
    OAuthCallbackHandlerGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router, AuthService])
    ], OAuthCallbackHandlerGuard);
    return OAuthCallbackHandlerGuard;
}());
export { OAuthCallbackHandlerGuard };
//# sourceMappingURL=oauth-callback-handler.guard.js.map