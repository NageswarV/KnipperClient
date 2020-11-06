import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { ServiceClient } from '../../generated/service-client';
var ProductService = /** @class */ (function () {
    function ProductService(serviceClient) {
        this.serviceClient = serviceClient;
    }
    ProductService.prototype.ngOnDestroy = function () {
    };
    ProductService.prototype.GetProductsByInventory = function () {
        return this.serviceClient.getProductsByInventory();
    };
    ProductService.prototype.GetProductForViewByOrder = function () {
        return this.serviceClient.getProductsIncludingDtpOrders();
    };
    ProductService.prototype.GetRelatedDtrOrdersByProductId = function (id) {
        return this.serviceClient.getRelatedDtrOrdersByProductId(id);
    };
    ProductService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ServiceClient])
    ], ProductService);
    return ProductService;
}());
export { ProductService };
//# sourceMappingURL=product.service.js.map