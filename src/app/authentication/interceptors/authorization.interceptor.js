import { __decorate, __metadata } from "tslib";
import { AuthenticationService } from '../authentication.service';
import { Injectable } from '@angular/core';
var AuthorizationInterceptor = /** @class */ (function () {
    function AuthorizationInterceptor(auth) {
        this.auth = auth;
    }
    AuthorizationInterceptor.prototype.intercept = function (req, next) {
        // Get the auth token from the service.
        if (this.auth.accessTokenData && !req.url.endsWith('Token')) {
            var authToken = 'Bearer ' + this.auth.accessTokenData.access_token;
            // If you are calling an outside domain then do not add the token.
            //if (!req.url.match(/www.mydomain.com\//)) {
            //  return next.handle(req);
            //}
            // Clone the request and replace the original headers with
            // cloned headers, updated with the authorization.
            var authReq = req.clone({
                headers: req.headers.set('Authorization', authToken)
            });
            // configure Inactivity timeout
            this.auth.configureInactivityTimeout();
            // send cloned request with header to the next handler.
            return next.handle(authReq);
        }
        else {
            return next.handle(req);
        }
    };
    AuthorizationInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AuthenticationService])
    ], AuthorizationInterceptor);
    return AuthorizationInterceptor;
}());
export { AuthorizationInterceptor };
//# sourceMappingURL=authorization.interceptor.js.map