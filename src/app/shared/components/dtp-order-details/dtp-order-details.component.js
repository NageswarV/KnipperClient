import { __decorate, __extends, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusySpinner } from '../../../common/busy-spinner';
import { ServiceClient } from '../../../../generated/service-client';
var DtpOrderDetailsComponent = /** @class */ (function (_super) {
    __extends(DtpOrderDetailsComponent, _super);
    function DtpOrderDetailsComponent(activedRoute, serviceClient, router) {
        var _this = _super.call(this) || this;
        _this.activedRoute = activedRoute;
        _this.serviceClient = serviceClient;
        _this.router = router;
        _this.perPage = 3;
        _this.loading = true;
        _this.orderLineItems = [];
        _this.lifeCycleHeaders = [
            {
                classificationValueName: 'Capture',
                status: 3
            },
            {
                classificationValueName: 'Validate',
                status: 3
            },
            {
                classificationValueName: 'Process',
                status: 3
            },
            {
                classificationValueName: 'Fulfill',
                status: 3
            },
            {
                classificationValueName: 'Close',
                status: 3
            }
        ];
        return _this;
    }
    DtpOrderDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getBreadCrumbUrl(this.router.url);
        this.orderID = this.activedRoute.snapshot.params['id'];
        this.setBusySpinner(this.serviceClient.getDtpOrderDetail(this.orderID)).subscribe(function (details) {
            _this.orderDetails = details;
            _this.orderLineItems = details.orderLineItems;
            if (_this.orderDetails.orderLifeCycleStage) {
                for (var i = 0; i < _this.lifeCycleHeaders.length; i++) {
                    if (_this.lifeCycleHeaders[i].classificationValueName === _this.orderDetails.orderLifeCycleStage) {
                        _this.lifeCycleHeaders[i].status = _this.orderDetails.lifeCycleStatus;
                        break;
                    }
                    _this.lifeCycleHeaders[i].status = 1;
                }
            }
            _this.loading = false;
        });
        this.columnSchema = [
            {
                name: 'productName',
                displayName: 'Product Name',
                visibility: 'md',
                sortDir: 'asc',
                customTemplate: true
            },
            {
                name: 'productDescription',
                displayName: 'Product Description',
                visibility: 'md',
                customTemplate: true,
                sortEnabled: false
            },
            {
                name: 'status',
                displayName: 'Line Item Status',
                visibility: 'md',
                warningProp: ['On Hold', 'Pending Corrections'],
                errorProp: ['Canceled', 'Lost In Transit', 'Lost In Transit - Partial', 'Rejected']
            },
            {
                name: 'orderQty',
                displayName: 'Ordered Qty',
                visibility: 'md',
                customTemplate: true
            },
            {
                name: 'adjustedOrderQty',
                displayName: 'Adjusted Ordered Qty',
                visibility: 'md'
            },
            {
                name: 'shippedQty',
                displayName: 'Shipped Qty',
                visibility: 'md'
            },
            {
                name: 'deliveredQty',
                displayName: 'Delivered Qty',
                visibility: 'md'
            },
            {
                name: 'adjustedDeliveredQty',
                displayName: 'Adjusted Delivered Qty',
                visibility: 'md'
            },
            {
                name: 'returnedQty',
                displayName: 'Returned Qty',
                visibility: 'md'
            }
        ];
    };
    DtpOrderDetailsComponent.prototype.getBreadCrumbUrl = function (url) {
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
    DtpOrderDetailsComponent.prototype.updateColumnSort = function (value) {
    };
    DtpOrderDetailsComponent.prototype.checkStatusIsWarning = function (value) {
        var tmp = ['On Hold', 'Pending Corrections'];
        return !!tmp.find(function (x) { return x === value; });
    };
    DtpOrderDetailsComponent.prototype.checkStatusIsError = function (value) {
        var tmp = ['Canceled', 'Lost In Transit', 'Lost In Transit - Partial', 'Rejected'];
        return !!tmp.find(function (x) { return x === value; });
    };
    DtpOrderDetailsComponent = __decorate([
        Component({
            selector: 'app-dtp-order-details',
            templateUrl: './dtp-order-details.component.html',
            styleUrls: ['./dtp-order-details.component.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, ServiceClient, Router])
    ], DtpOrderDetailsComponent);
    return DtpOrderDetailsComponent;
}(BusySpinner));
export { DtpOrderDetailsComponent };
//# sourceMappingURL=dtp-order-details.component.js.map