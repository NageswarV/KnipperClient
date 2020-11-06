import { __decorate, __metadata, __values } from "tslib";
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Tenant } from '../shared/service-clients/tenant';
import { FilterService } from '../core/filter.service';
import { ClassificationValues } from '../common/classification-value';
import { BehaviorSubject } from 'rxjs';
// Also known as the Tenant Service
var ClientService = /** @class */ (function () {
    function ClientService(tenantClient, router, filterService, route) {
        this.tenantClient = tenantClient;
        this.router = router;
        this.filterService = filterService;
        this.route = route;
        this.clientIdStorageKey = 'samplicity-dtp-current-client';
        this.clientIdChangeKey = 'samplicity-dtp-changed-client';
        this.notificationQueryStrings = [
            '?activated=',
            '?discarded=',
            '?created='
        ];
        this._selectedClientId = new BehaviorSubject(null);
        this._isClientActive = new BehaviorSubject(null);
    }
    Object.defineProperty(ClientService.prototype, "selectedClientIdAsync", {
        get: function () {
            return this._selectedClientId.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClientService.prototype, "isCurrentClientActiveAsync", {
        get: function () {
            return this._isClientActive.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClientService.prototype, "isClientActive", {
        get: function () {
            return this._isClientActive.value;
        },
        enumerable: false,
        configurable: true
    });
    ClientService.prototype.setSelectedClientId = function (id) {
        this._selectedClientId.next(id);
    };
    ClientService.prototype.setIsCurrentClientActive = function (isActive) {
        this._isClientActive.next(isActive);
    };
    ClientService.prototype.getClientId = function () {
        var item = sessionStorage.getItem(this.clientIdStorageKey);
        this.setSelectedClientId(item);
        return Number(item);
    };
    ClientService.prototype.setClientChange = function () {
        localStorage.setItem(this.clientIdChangeKey, JSON.stringify(true));
    };
    ClientService.prototype.getSimpleClients = function (tenantIds, getAllTenants) {
        return this.tenantClient.getSimpleTenants(tenantIds, getAllTenants).map(function (x) {
            return x.result;
        }, function (e) {
            console.log(e);
        });
    };
    ClientService.prototype.getActiveClients = function (includeActiveOnly) {
        if (includeActiveOnly === void 0) { includeActiveOnly = true; }
        return this.tenantClient.getActiveSimpleTenants(includeActiveOnly).map(function (x) {
            return x.result;
        }, function (e) {
            console.log(e);
        });
    };
    ClientService.prototype.getCurrentClient = function () {
        var clientId = this.getClientId();
        return this.getClientById(clientId);
    };
    ClientService.prototype.isCurrentClientActive = function (client) {
        if (client.tenantModules.length === 1) {
            var status_1 = client.tenantModules[0].tenantModuleStatusClassificationValueId;
            var isActive = (status_1 === ClassificationValues.TENANT_MODULE_STATUS_ACTIVE);
            return isActive;
        }
        else {
            return false;
        }
    };
    ClientService.prototype.isCurrentClientActiveOrNew = function (client) {
        if (client.tenantModules.length === 1) {
            var status_2 = client.tenantModules[0].tenantModuleStatusClassificationValueId;
            return status_2 === ClassificationValues.TENANT_MODULE_STATUS_ACTIVE
                || status_2 === ClassificationValues.TENANT_MODULE_STATUS_NEW;
        }
        else {
            return false;
        }
    };
    ClientService.prototype.getClientById = function (clientId) {
        return this.tenantClient.getTenantInfoById(clientId).map(function (x) {
            return x.result;
        }, function (e) {
            console.log(e);
        });
    };
    ClientService.prototype.getCurrentClientDetails = function () {
        var clientId = this.getClientId();
        return this.getClientDetailsById(clientId);
    };
    ClientService.prototype.getClientDetailsById = function (clientId) {
        if (clientId === 0) {
            return Observable.of(null);
        }
        return this.tenantClient.getTenantDetails(clientId).map(function (x) {
            return x.result;
        }, function (e) {
            console.log(e);
        });
    };
    ClientService.prototype.setClientId = function (clientId) {
        this.setSelectedClientId(clientId);
        sessionStorage.setItem(this.clientIdStorageKey, clientId);
    };
    ClientService.prototype.clearClientId = function () {
        sessionStorage.removeItem(this.clientIdStorageKey);
        this.setSelectedClientId(null);
    };
    ClientService.prototype.changeClient = function (clientId) {
        var e_1, _a;
        var _this = this;
        var currentClientId = this.getClientId();
        if (currentClientId !== Number(clientId)) {
            this.setClientId(clientId);
            var redirectUrl = this.router.url;
            var urlSegments = redirectUrl.split('/');
            urlSegments[1] = this.getClientId().toString();
            redirectUrl = urlSegments.join('/');
            try {
                for (var _b = __values(this.notificationQueryStrings), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var nqs = _c.value;
                    var i = redirectUrl.indexOf(nqs);
                    if (i >= 0) {
                        redirectUrl = redirectUrl.substring(0, i);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.filterService.clearAllFilter();
            this.router.navigate([redirectUrl])
                .then(function () {
                _this.setClientChange();
                location.reload();
            });
        }
    };
    ClientService.prototype.deactivateClientForDtp = function (clientId) {
        return this.tenantClient.deactivateTenantForDtp(clientId).map(function (x) {
            return x.result;
        });
    };
    ClientService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Tenant,
            Router,
            FilterService,
            ActivatedRoute])
    ], ClientService);
    return ClientService;
}());
export { ClientService };
var Item = /** @class */ (function () {
    function Item(value, label) {
        this.value = value;
        this.label = label;
    }
    return Item;
}());
export { Item };
//# sourceMappingURL=client.service.js.map