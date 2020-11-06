import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { ServiceClient } from '../../generated/service-client';
var RepService = /** @class */ (function () {
    function RepService(serviceClient) {
        this.serviceClient = serviceClient;
    }
    RepService.prototype.ngOnDestroy = function () {
    };
    RepService.prototype.GetRepPushShipments = function () {
        return this.serviceClient.getRepsIncludingPushShipments();
    };
    RepService.prototype.GetRepsIncludingDtpOrders = function () {
        return this.serviceClient.getRepsIncludingDtpOrders();
    };
    RepService.prototype.GetDtrOrdersByRepId = function (repId) {
        return this.serviceClient.getDtrOrdersByRepId(repId);
    };
    RepService.prototype.GetRepTerritoryHistory = function (repId) {
        return this.serviceClient.getRepTerritoryHistory(repId);
    };
    RepService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ServiceClient])
    ], RepService);
    return RepService;
}());
export { RepService };
//# sourceMappingURL=rep.service.js.map