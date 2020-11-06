import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../../core/client.service';
import { SecurityService } from '../../../../core/security.service';
var ClientSelectComponent = /** @class */ (function () {
    function ClientSelectComponent(router, route, clientService, securityService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.clientService = clientService;
        this.securityService = securityService;
        this.clients = [];
        this.isShowing = false;
        // Admin Routes
        this.adminRoutes = [
            '/error',
            '/admin/roles',
            '/admin/users',
            '/admin/users/ad-users',
            '/admin/dataentryaudit'
        ];
        this.securityServiceUserAccessSub = this.securityService.onUserAccessChange.subscribe({
            next: function (userAccess) {
                _this.handleUserAccess(userAccess);
            }
        });
    }
    Object.defineProperty(ClientSelectComponent.prototype, "selectedClientId", {
        get: function () {
            return this.clientService.selectedClientIdAsync;
        },
        enumerable: false,
        configurable: true
    });
    ;
    ClientSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routerEventsSub = this.router.events.subscribe(function (event) {
            if (event instanceof NavigationEnd) {
                if (_this.adminRoutes.findIndex(function (x) { return event.url.startsWith(x); }) >= 0) {
                    _this.isShowing = false;
                }
                else {
                    _this.isShowing = true;
                    _this.securityService.userAccessSubject.subscribe(function (userAccess) {
                        _this.handleUserAccess(userAccess);
                    });
                }
            }
        });
    };
    ClientSelectComponent.prototype.ngOnDestroy = function () {
        if (this.routerEventsSub) {
            this.routerEventsSub.unsubscribe();
        }
        if (this.securityServiceUserAccessSub) {
            this.securityServiceUserAccessSub.unsubscribe();
        }
    };
    ClientSelectComponent.prototype.onChange = function (event) {
        this.setClient(event.target.value);
    };
    ClientSelectComponent.prototype.setClient = function (clientId) {
        var client = this.lookupClient(clientId);
        this.clientService.changeClient(client.tenantId);
    };
    ClientSelectComponent.prototype.lookupClient = function (clientId) {
        if (this.clients) {
            var client = this.clients.find(function (x) { return x.tenantId === Number(clientId); });
            if (client) {
                return client;
            }
        }
        return null;
    };
    ClientSelectComponent.prototype.SimpleTenantDtoSorter = function (a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    };
    ClientSelectComponent.prototype.handleUserAccess = function (userAccess) {
        var _this = this;
        this.clientService.getSimpleClients(userAccess.tenants, userAccess.hasAllTenants).subscribe(function (tenants) {
            _this.clients = tenants.sort(_this.SimpleTenantDtoSorter);
        });
    };
    ClientSelectComponent = __decorate([
        Component({
            selector: 'samplicity-client-select',
            templateUrl: './client-select.component.html',
            styleUrls: ['./client-select.component.scss']
        }),
        __metadata("design:paramtypes", [Router,
            ActivatedRoute,
            ClientService,
            SecurityService])
    ], ClientSelectComponent);
    return ClientSelectComponent;
}());
export { ClientSelectComponent };
//# sourceMappingURL=client-select.component.js.map