import { __decorate, __extends, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceClient } from '../../../../generated/service-client';
import { BusySpinner } from '../../../common/busy-spinner';
import { CustomDatePipe } from '../../../shared/pipes/custom-date.pipe';
var HCPSalesRepComponent = /** @class */ (function (_super) {
    __extends(HCPSalesRepComponent, _super);
    function HCPSalesRepComponent(activedRoute, serviceClient, router) {
        var _this = _super.call(this) || this;
        _this.activedRoute = activedRoute;
        _this.serviceClient = serviceClient;
        _this.router = router;
        _this.perPage = 10;
        _this.dtpOrderCount = 0;
        _this.selectedTab = 'dtp';
        _this.loading = false;
        _this.columnSortChanged = false;
        _this.panelExpanded = false;
        return _this;
    }
    HCPSalesRepComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.getBreadCrumbUrl(this.router.url);
        this.activedRoute.queryParams.subscribe(function (params) {
            _this.orderID = params['orderId'];
        });
        this.setBusySpinner(this.serviceClient.getHcpsIncludingDtpOrders(), 'dtp').subscribe(function (response) {
            _this.hcpDataSet = response.find(function (x) { return x.dtpOrders.find(function (y) { return y.id === _this.orderID; }); });
            var tmp = [_this.hcpDataSet.dtpOrders.find(function (y) { return y.id === _this.orderID; })];
            _this.hcpDataSet.dtpOrders = tmp;
            _this.loading = false;
        });
    };
    Object.defineProperty(HCPSalesRepComponent.prototype, "columnSchema", {
        get: function () {
            if (this.columnSortChanged) {
                return this.sortedColumns;
            }
            if (this.selectedTab === 'dtp') {
                return this.getDTPColumnSchema();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HCPSalesRepComponent.prototype, "getDataSet", {
        get: function () {
            if (this.selectedTab === 'dtp' && this.hcpDataSet) {
                return this.hcpDataSet.dtpOrders;
            }
        },
        enumerable: false,
        configurable: true
    });
    HCPSalesRepComponent.prototype.getDTPColumnSchema = function () {
        return [
            {
                name: 'id',
                displayName: 'Order ID',
                visibility: 'md',
                customTemplate: true,
                sortDir: 'asc'
            },
            {
                name: 'shipToAddress',
                displayName: 'Ship to Address',
                visibility: 'md',
                customTemplate: true,
                sortEnabled: false
            },
            {
                name: 'orderDate',
                displayName: 'Order Received Date',
                visibility: 'md',
                pipe: new CustomDatePipe(),
                pipeArg2: true
            },
            {
                name: 'status',
                displayName: 'Order Status',
                visibility: 'md',
                warningProp: ['On Hold', 'Pending Corrections'],
                errorProp: ['Canceled', 'Lost In Transit', 'Lost In Transit - Partial', 'Rejected']
            },
            {
                name: 'orderSource',
                displayName: 'Order Source',
                visibility: 'md'
            },
            {
                name: 'programName',
                displayName: 'Program',
                visibility: 'md',
                customTemplate: true
            },
            {
                name: 'salesRep',
                displayName: 'Sales Rep',
                visibility: 'md',
                customTemplate: true
            },
            {
                name: 'repId',
                displayName: 'Rep ID',
                visibility: 'xxl4'
            },
            {
                name: 'territoryId',
                displayName: 'Territory Code',
                visibility: 'xxl4'
            },
            {
                name: 'communicationLabel',
                displayName: 'Communication(s)',
                visibility: 'xxl4',
                customTemplate: true
            }
        ];
    };
    HCPSalesRepComponent.prototype.getBreadCrumbUrl = function (url) {
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
    HCPSalesRepComponent.prototype.updateColumnSort = function (value) {
        this.columnSortChanged = true;
        this.sortedColumns = value;
    };
    HCPSalesRepComponent.prototype.loadRepData = function () {
        // this.setBusySpinner(this.hcpService.GetDtrOrdersByHcpId(this.hcpDataSet.id), 'rep').subscribe(x => {
        //   this.dtrOrders = x;
        // });
    };
    HCPSalesRepComponent.prototype.loadTableData = function () {
        this.panelExpanded = true;
    };
    HCPSalesRepComponent.prototype.hideTableData = function () {
        this.panelExpanded = false;
    };
    HCPSalesRepComponent.prototype.showLessClick = function () {
        this.perPage -= 10;
        this.loading = !this.loading;
    };
    HCPSalesRepComponent.prototype.showMoreClick = function () {
        this.perPage += 10;
        this.loading = !this.loading;
    };
    HCPSalesRepComponent.prototype.changeTabs = function (value) {
        if (value === this.selectedTab)
            return;
        this.columnSortChanged = false;
        this.perPage = 10;
        if (value === 'rep') {
            this.loadRepData();
        }
        this.selectedTab = value;
    };
    HCPSalesRepComponent.prototype.openDialog = function (id) {
        // let dataToShow;
        //   this.hcpService.GetCommunicationsyOrderId(id).subscribe((result)=>{
        //     dataToShow=result;
        //     console.log("dataToShow",dataToShow);
        //     const dialogRef = this.dialog.open(HcpDialogComponent, {
        //       panelClass: 'custom-dialog',
        //       data: {show:dataToShow}
        //     });
        //     dialogRef.afterClosed().subscribe(result => {
        //       console.log('The dialog was closed');
        //     });
        //   });
    };
    HCPSalesRepComponent.prototype.openCreateTaskDialog = function () {
        // console.log("Hello");
        // this.dialog.open(CreateNewTaskComponent, {
        //   panelClass: 'custom-dialog',
        //   width: '1000px',
        // });
    };
    HCPSalesRepComponent = __decorate([
        Component({
            selector: 'app-hcp-sales-rep-details',
            templateUrl: './hcp-sales-rep.component.html',
            styleUrls: ['./hcp-sales-rep.component.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, ServiceClient, Router])
    ], HCPSalesRepComponent);
    return HCPSalesRepComponent;
}(BusySpinner));
export { HCPSalesRepComponent };
//# sourceMappingURL=hcp-sales-rep.component.js.map