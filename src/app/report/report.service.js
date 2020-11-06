import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { ServiceClient } from '../../generated/service-client';
var ReportService = /** @class */ (function () {
    function ReportService(serviceClient) {
        this.serviceClient = serviceClient;
    }
    ReportService.prototype.ngOnDestroy = function () {
    };
    ReportService.prototype.GetReportDefinitions = function () {
        return this.serviceClient.getReportDefinitions();
    };
    ReportService.prototype.GetGeneratedReports = function () {
        return this.serviceClient.getGeneratedReports();
    };
    ReportService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ServiceClient])
    ], ReportService);
    return ReportService;
}());
export { ReportService };
//# sourceMappingURL=report.service.js.map