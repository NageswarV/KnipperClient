import { __decorate, __extends, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusySpinner } from '../../common/busy-spinner';
var OrderDetailComponent = /** @class */ (function (_super) {
    __extends(OrderDetailComponent, _super);
    function OrderDetailComponent(router, route) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.route = route;
        _this.pageState = "Valid";
        return _this;
    }
    OrderDetailComponent.prototype.ngOnInit = function () {
        this.orderId = this.route.snapshot.params['id'];
        this.onGotoPage('OrderDetail', 'orderdetail');
    };
    OrderDetailComponent.prototype.onGotoPage = function (name, path) {
        if (path === void 0) { path = ''; }
        this.sectionSelected = name;
        this.router.navigate(['hcp/orders/dtporders/' + this.orderId + '/' + path], { queryParams: { orderId: this.orderId } });
    };
    OrderDetailComponent.prototype.selected = function (name) {
        return this.sectionSelected === name;
    };
    OrderDetailComponent = __decorate([
        Component({
            selector: 'app-order-detail-home',
            templateUrl: './order-detail.component.html',
            styleUrls: ['./order-detail.component.scss']
        }),
        __metadata("design:paramtypes", [Router,
            ActivatedRoute])
    ], OrderDetailComponent);
    return OrderDetailComponent;
}(BusySpinner));
export { OrderDetailComponent };
//# sourceMappingURL=order-detail.component.js.map