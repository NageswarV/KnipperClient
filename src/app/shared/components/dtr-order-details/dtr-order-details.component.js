import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceClient } from '../../../../generated/service-client';
var DtrOrderDetailsComponent = /** @class */ (function () {
    function DtrOrderDetailsComponent(activedRoute, serviceClient, router) {
        this.activedRoute = activedRoute;
        this.serviceClient = serviceClient;
        this.router = router;
        this.columns = [
            { title: 'Product Name' },
            { title: 'Product Code' },
            { title: 'Unit of Measure' },
            { title: 'Quantity' }
        ];
    }
    DtrOrderDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getBreadCrumbUrl(this.router.url);
        this.orderID = this.activedRoute.snapshot.params['id'];
        this.GetDtrOrderDetail(this.orderID).subscribe(function (details) {
            _this.orderDetails = details;
            console.log(_this.orderDetails);
        });
    };
    DtrOrderDetailsComponent.prototype.GetDtrOrderDetail = function (orderId) {
        return this.serviceClient.getDtrOrderDetail(orderId);
    };
    DtrOrderDetailsComponent.prototype.getBreadCrumbUrl = function (url) {
        var prevPage = url.split('/');
        if (prevPage[1] == 'hcp') {
            this.breadCrumbs = 'HCPs';
            this.breadCrumbNavigationUrl = '/hcp/orders';
        }
        else if (prevPage[1] == 'rep') {
            this.breadCrumbs = 'Sales Reps';
            this.breadCrumbNavigationUrl = '/rep/orders';
        }
    };
    DtrOrderDetailsComponent = __decorate([
        Component({
            selector: 'app-dtr-order-details',
            templateUrl: './dtr-order-details.component.html',
            styleUrls: ['./dtr-order-details.component.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, ServiceClient, Router])
    ], DtrOrderDetailsComponent);
    return DtrOrderDetailsComponent;
}());
export { DtrOrderDetailsComponent };
//# sourceMappingURL=dtr-order-details.component.js.map