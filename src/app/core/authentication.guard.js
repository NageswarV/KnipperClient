import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SecurityService } from './security.service';
import { ClientService } from './client.service';
import { ClassificationService } from './classification.service';
import { ReferenceDataService } from './reference-data.service';
import { ApplicationInsightsService } from './applications-insights.service';
var AuthenticationGuard = /** @class */ (function () {
    function AuthenticationGuard(authService, securityService, clientService, classificationService, referenceDataService, router, applicationInsightsService) {
        this.authService = authService;
        this.securityService = securityService;
        this.clientService = clientService;
        this.classificationService = classificationService;
        this.referenceDataService = referenceDataService;
        this.router = router;
        this.applicationInsightsService = applicationInsightsService;
    }
    AuthenticationGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        // Handles Pre-Authenticated TenantId query strings by storing it first before chacking ifLoggedIn()
        var tenantId = route.queryParams.tenantid;
        if (tenantId) {
            this.clientService.setClientId(tenantId);
        }
        // May move to service-client base
        // this.authService.refreshToken();
        if (this.authService.isLoggedIn()) {
            var permissions_1 = route.data['permissions'];
            if (permissions_1) {
                var requiresAllPermissions_1 = route.data['requiresAllPermissions'] ? true : false;
                return new Promise(function (resolve) {
                    var userAccess = null;
                    _this.securityService.getUserAccess().then(function (ua) {
                        userAccess = ua;
                        return _this.checkCacheReady();
                    }).then(function () {
                        _this.applicationInsightsService.setUserId(userAccess.username);
                        return _this.securityService.canNavigate(permissions_1, requiresAllPermissions_1);
                    }).then(function (hasAccess) {
                        if (!hasAccess) {
                            _this.router.navigate(['/error'], { queryParams: { noAccess: true } });
                        }
                        resolve(hasAccess);
                    }).catch(function (e) {
                        resolve(false);
                    });
                });
            }
            else {
                return true;
            }
        }
        this.authService.startAuthentication();
        return false;
    };
    AuthenticationGuard.prototype.canActivateChild = function (childRoute, state) {
        return this.canActivate(childRoute, state);
    };
    AuthenticationGuard.prototype.checkCacheReady = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Promise.all([
                _this.classificationService.cacheReadySubject.toPromise(),
                _this.referenceDataService.cacheReadySubject.toPromise()
            ]).then(function () {
                resolve(true);
            }).catch(function (e) {
                reject(false);
            });
        });
    };
    AuthenticationGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AuthService,
            SecurityService,
            ClientService,
            ClassificationService,
            ReferenceDataService,
            Router,
            ApplicationInsightsService])
    ], AuthenticationGuard);
    return AuthenticationGuard;
}());
export { AuthenticationGuard };
//# sourceMappingURL=authentication.guard.js.map