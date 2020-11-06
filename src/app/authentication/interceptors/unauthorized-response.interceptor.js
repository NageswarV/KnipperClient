import { __decorate, __metadata } from "tslib";
import { finalize, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
var UnAuthorizedInterceptor = /** @class */ (function () {
    function UnAuthorizedInterceptor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    UnAuthorizedInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        var ok;
        // extend server response observable with logging
        return next.handle(req)
            .pipe(tap(
        // Succeeds when there is a response; ignore other events
        function (r) { ok = r; }, 
        // Operation failed; error is an HttpErrorResponse
        function (e) { ok = e; }), 
        // Log when response observable either completes or errors
        finalize(function () {
            if (ok.status === 401) {
                _this.authenticationService.signOut();
            }
        }));
    };
    UnAuthorizedInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AuthenticationService])
    ], UnAuthorizedInterceptor);
    return UnAuthorizedInterceptor;
}());
export { UnAuthorizedInterceptor };
//# sourceMappingURL=unauthorized-response.interceptor.js.map