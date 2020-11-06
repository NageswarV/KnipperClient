import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { System } from '../shared/service-clients/system';
var SystemService = /** @class */ (function () {
    function SystemService(systemClient) {
        this.systemClient = systemClient;
    }
    SystemService.prototype.searchBlackoutHolds = function (filter) {
        return this.systemClient.searchBlackoutHolds(filter);
    };
    SystemService.prototype.searchReportDefinition = function (filter) {
        return this.systemClient.getReportDefinitions(filter);
    };
    SystemService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [System])
    ], SystemService);
    return SystemService;
}());
export { SystemService };
//# sourceMappingURL=system.service.js.map