import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { ServiceClient } from '../../generated/service-client';
import { AuthenticationService } from '../authentication';
var HomeService = /** @class */ (function () {
    function HomeService(authenticationService, serviceClient) {
        this.authenticationService = authenticationService;
        this.serviceClient = serviceClient;
    }
    HomeService.prototype.ngOnDestroy = function () {
    };
    HomeService.prototype.GetActiveAnnouncements = function () {
        return this.serviceClient.getctiveAnnouncements();
    };
    HomeService.prototype.getPager = function (totalItems, currentPage, pageSize) {
        if (currentPage === void 0) { currentPage = 1; }
        if (pageSize === void 0) { pageSize = 5; }
        var totalPages = Math.ceil(totalItems / pageSize);
        if (currentPage < 1) {
            currentPage = 1;
        }
        else if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        return {
            currentPage: currentPage,
            totalPages: totalPages,
            startIndex: startIndex,
            endIndex: endIndex,
        };
    };
    HomeService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AuthenticationService,
            ServiceClient])
    ], HomeService);
    return HomeService;
}());
export { HomeService };
//# sourceMappingURL=home.service.js.map