import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { AuthService } from '../../../../core/auth.service';
import { SecurityService } from '../../../../core/security.service';
import { ClientService } from '../../../../core/client.service';
import { UserLogDto } from '../../../../shared/service-clients/security';
import { FilterService } from '../../../../core/filter.service';
import { ClassificationValues } from '../../../../common/classification-value';
import { HttpClient } from '@angular/common/http';
var UserDropdownComponent = /** @class */ (function () {
    function UserDropdownComponent(authService, clientService, securityService, filterService, http) {
        this.authService = authService;
        this.clientService = clientService;
        this.securityService = securityService;
        this.filterService = filterService;
        this.http = http;
    }
    UserDropdownComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.authService.isLoggedIn()) {
            this.securityService.userAccessSubject.subscribe(function (userAccess) {
                if (userAccess) {
                    _this.userAccess = userAccess;
                }
            });
        }
    };
    UserDropdownComponent.prototype.signout = function () {
        var _this = this;
        if (this.authService.isLoggedIn()) {
            var proxyurl = 'https://cors-anywhere.herokuapp.com/';
            this.http.get(proxyurl + 'http://api.ipify.org/?format=json').subscribe(function (data) {
                var userLogDto = new UserLogDto({
                    userId: _this.userAccess.userId,
                    userAgent: navigator.userAgent,
                    logTime: new Date(),
                    logTypeId: ClassificationValues.LogType.LOG_OUT,
                    terminalId: data['ip']
                });
                _this.securityService.logUserSession(userLogDto).subscribe().add(function () {
                    _this.securityService.clearUserAccess();
                    _this.clientService.clearClientId();
                    _this.filterService.clearAllFilter();
                    _this.authService.signout();
                });
            });
        }
    };
    UserDropdownComponent.prototype.refreshUserAccess = function () {
        if (this.authService.isLoggedIn()) {
            this.securityService.refreshUserAccess().then(function () {
            }).catch(function (e) {
            });
        }
    };
    UserDropdownComponent = __decorate([
        Component({
            selector: 'samplicity-user-dropdown',
            templateUrl: './user-dropdown.component.html',
            styleUrls: ['./user-dropdown.component.scss']
        }),
        __metadata("design:paramtypes", [AuthService,
            ClientService,
            SecurityService,
            FilterService,
            HttpClient])
    ], UserDropdownComponent);
    return UserDropdownComponent;
}());
export { UserDropdownComponent };
//# sourceMappingURL=user-dropdown.component.js.map