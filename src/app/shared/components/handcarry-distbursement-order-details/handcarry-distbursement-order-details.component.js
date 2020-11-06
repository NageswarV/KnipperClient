import { __decorate, __extends, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusySpinner } from '../../../common/busy-spinner';
import { ServiceClient } from '../../../../generated/service-client';
var HandcarryDistbursementOrderDetailsComponent = /** @class */ (function (_super) {
    __extends(HandcarryDistbursementOrderDetailsComponent, _super);
    function HandcarryDistbursementOrderDetailsComponent(activedRoute, serviceClient, router) {
        var _this = _super.call(this) || this;
        _this.activedRoute = activedRoute;
        _this.serviceClient = serviceClient;
        _this.router = router;
        return _this;
    }
    HandcarryDistbursementOrderDetailsComponent.prototype.ngOnInit = function () {
        this.getBreadCrumbUrl(this.router.url);
        this.transactionID = this.activedRoute.snapshot.params['id'];
    };
    HandcarryDistbursementOrderDetailsComponent.prototype.getBreadCrumbUrl = function (url) {
        var prevPage = url.split('/');
        if (prevPage[1] == 'hcp') {
            this.breadCrumbs = 'HCPs';
            this.breadCrumbNavigationUrl = '/hcp/orders';
        }
        else if (prevPage[1] == 'rep') {
            this.breadCrumbs = 'Sales Reps';
            this.breadCrumbNavigationUrl = '/rep/orders';
        }
        else if (prevPage[1] == 'products') {
            this.breadCrumbs = 'Products';
            this.breadCrumbNavigationUrl = '/products';
        }
    };
    HandcarryDistbursementOrderDetailsComponent = __decorate([
        Component({
            selector: 'app-handcarry-distbursement-order-details',
            templateUrl: './handcarry-distbursement-order-details.component.html',
            styleUrls: ['./handcarry-distbursement-order-details.component.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, ServiceClient, Router])
    ], HandcarryDistbursementOrderDetailsComponent);
    return HandcarryDistbursementOrderDetailsComponent;
}(BusySpinner));
export { HandcarryDistbursementOrderDetailsComponent };
//# sourceMappingURL=handcarry-distbursement-order-details.component.js.map