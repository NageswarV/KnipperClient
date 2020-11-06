import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { ServiceClient } from '../../generated/service-client';
var HcpService = /** @class */ (function () {
    function HcpService(serviceClient) {
        this.serviceClient = serviceClient;
    }
    HcpService.prototype.ngOnDestroy = function () {
    };
    HcpService.prototype.GetCommunicationsyOrderId = function (id) {
        return this.serviceClient.getCommunicationsyOrderId(id);
    };
    HcpService.prototype.GetHcpsIncludingDtpOrders = function () {
        return this.serviceClient.getHcpsIncludingDtpOrders();
        // return this.serviceClient.getRepsIncludingDtpOrders();
    };
    HcpService.prototype.GetDtrOrdersByHcpId = function (hcpId) {
        return this.serviceClient.getDtrOrdersByHcpId(hcpId);
    };
    HcpService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ServiceClient])
    ], HcpService);
    return HcpService;
}());
export { HcpService };
//# sourceMappingURL=hcp.service.js.map