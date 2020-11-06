import { __decorate, __metadata } from "tslib";
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ServiceClient } from '../../generated/service-client';
import { CacheService } from '../cache/cache.service';
import { EnvService } from '../env/env.service';
var TenantService = /** @class */ (function () {
    function TenantService(envService, cacheService, serviceClient) {
        this.envService = envService;
        this.cacheService = cacheService;
        this.serviceClient = serviceClient;
        this.abpTenantHeaderName = 'Abp.TenantId';
        this.abpLocalizationHeaderName = 'Abp.Localization.CultureName';
    }
    Object.defineProperty(TenantService.prototype, "tenantHeaderName", {
        get: function () {
            return this.abpTenantHeaderName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TenantService.prototype, "currentTenantId", {
        get: function () {
            if (this.tenantInfo) {
                return this.tenantInfo.id.toString();
            }
            else {
                return undefined;
            }
        },
        enumerable: false,
        configurable: true
    });
    TenantService.prototype.getProgramByUrl = function (url, culture) {
        return this.serviceClient.getDefaultProgram(culture).pipe(map(function (x) { return x; }));
    };
    Object.defineProperty(TenantService.prototype, "currentTenantAllocationUrl", {
        get: function () {
            return "";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TenantService.prototype, "currentTenantName", {
        get: function () {
            return this.tenantInfo.tenancyName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TenantService.prototype, "maintenanceMode", {
        get: function () {
            return this.tenantInfo.inMaintenance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TenantService.prototype, "isCacheReady", {
        get: function () {
            return this.cacheService.cacheReady;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TenantService.prototype, "tenantInfo", {
        get: function () {
            return this.cacheService.tenantInfo;
        },
        enumerable: false,
        configurable: true
    });
    TenantService.prototype.clearTenantData = function () {
        this.cacheService.clearCache();
    };
    TenantService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [EnvService,
            CacheService,
            ServiceClient])
    ], TenantService);
    return TenantService;
}());
export { TenantService };
//# sourceMappingURL=tenant.service.js.map