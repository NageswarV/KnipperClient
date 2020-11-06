import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { ServiceClient } from '../../../generated/service-client';
var dashboardService = /** @class */ (function () {
    function dashboardService(serviceClient) {
        this.serviceClient = serviceClient;
    }
    dashboardService.prototype.ngOnDestroy = function () {
    };
    dashboardService.prototype.GetWeeklyOrderVolumeTrends = function () {
        return this.serviceClient.getWeeklyOrderVolumeTrends();
    };
    dashboardService.prototype.GetMonthlySVLVolumeTrends = function () {
        return this.serviceClient.getMonthlySVLVolumeTrends();
    };
    dashboardService.prototype.Get14DayOrderEventsTrends = function () {
        return this.serviceClient.get14DayOrderEventsTrends();
    };
    dashboardService.prototype.GetWeeklyAODTracking = function () {
        return this.serviceClient.getWeeklyAODTracking();
    };
    dashboardService.prototype.GetWeeklyCommunicationVolumeTrends = function () {
        return this.serviceClient.getWeeklyCommunicationsVolumeTrends();
    };
    dashboardService.prototype.GetHandCarryMetrics = function () {
        return this.serviceClient.getHandCarryMetrics();
    };
    dashboardService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ServiceClient])
    ], dashboardService);
    return dashboardService;
}());
export { dashboardService };
//# sourceMappingURL=dashboard-service.js.map