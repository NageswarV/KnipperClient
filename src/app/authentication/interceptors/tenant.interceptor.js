import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { TenantService } from '../../tenant/tenant.service';
import { EnvService } from '../../env/env.service';
var TenantInterceptor = /** @class */ (function () {
    function TenantInterceptor(tenantService, envService) {
        this.tenantService = tenantService;
        this.envService = envService;
        this.abpTenantHeaderName = 'Abp.TenantId';
        this.abpLocalizationHeaderName = 'Abp.Localization.CultureName';
    }
    TenantInterceptor.prototype.intercept = function (req, next) {
        // If you are calling an outside domain then do not add the token.
        //if (!req.url.match(/www.mydomain.com\//)) {
        //  return next.handle(req);
        //}
        if (this.tenantService.currentTenantId != undefined) {
            var tenantReq = req.clone({
                setHeaders: {
                    'Abp.TenantId': this.tenantService.currentTenantId,
                    'Abp.Localization.CultureName': this.envService.languageCode,
                }
            });
            return next.handle(tenantReq);
        }
        else {
            var tenantReq = req.clone({
                setHeaders: {
                    'Abp.Localization.CultureName': this.envService.languageCode
                }
            });
            return next.handle(tenantReq);
        }
    };
    TenantInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [TenantService,
            EnvService])
    ], TenantInterceptor);
    return TenantInterceptor;
}());
export { TenantInterceptor };
//# sourceMappingURL=tenant.interceptor.js.map