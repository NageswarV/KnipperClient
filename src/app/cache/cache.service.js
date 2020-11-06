import { __decorate, __metadata, __read } from "tslib";
import { Injectable } from '@angular/core';
import { forkJoin, AsyncSubject } from 'rxjs';
import { ServiceClient } from '../../generated/service-client';
import { EnvService } from '../env';
var CacheService = /** @class */ (function () {
    function CacheService(envService, serviceClient) {
        this.envService = envService;
        this.serviceClient = serviceClient;
        this.cacheReady = new AsyncSubject();
    }
    CacheService.prototype.loadData = function () {
        var _this = this;
        var data = forkJoin(this.serviceClient.getDefaultProgram("en"), this.serviceClient.getClassificationValues(), this.serviceClient.getCountries(), this.serviceClient.getStates());
        return data.do(function (_a) {
            var _b = __read(_a, 4), tenantData = _b[0], classificationCache = _b[1], countriesData = _b[2], statesData = _b[3];
            _this.tenantInfoCache = tenantData;
            _this.classificationCache = classificationCache;
            _this.countryCache = countriesData;
            _this.stateCache = statesData;
            _this.cacheReady.next(true);
            _this.cacheReady.complete();
        }).toPromise();
    };
    CacheService.prototype.loadTenantData = function () {
        var _this = this;
        var data = forkJoin(this.serviceClient.getCountries());
        return data.do(function (_a) {
            var _b = __read(_a, 1), countryCache = _b[0];
            _this.countryCache = countryCache;
        }).toPromise();
    };
    Object.defineProperty(CacheService.prototype, "tenantInfo", {
        get: function () {
            return this.tenantInfoCache;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CacheService.prototype, "countries", {
        get: function () {
            return this.countryCache;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CacheService.prototype, "classificationValues", {
        get: function () {
            return this.classificationCache;
        },
        enumerable: false,
        configurable: true
    });
    CacheService.prototype.clearCache = function () {
    };
    CacheService.prototype.ngOnDestroy = function () {
    };
    CacheService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [EnvService,
            ServiceClient])
    ], CacheService);
    return CacheService;
}());
export { CacheService };
//# sourceMappingURL=cache.service.js.map