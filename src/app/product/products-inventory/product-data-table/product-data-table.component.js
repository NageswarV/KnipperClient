import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../../../generated/service-client';
import { BusySpinner } from '../../../common/busy-spinner';
import { CustomDatePipe } from '../../../shared/custom-date.pipe';
var ProductsDataTableComponent = /** @class */ (function (_super) {
    __extends(ProductsDataTableComponent, _super);
    function ProductsDataTableComponent(productService) {
        var _this = _super.call(this) || this;
        _this.productService = productService;
        _this.perPage = 10;
        _this.dtrOrders = [];
        _this.dtpOrderCount = 0;
        _this.selectedTab = 'dtp';
        _this.loading = false;
        _this.columnSortChanged = false;
        _this.panelExpanded = false;
        return _this;
    }
    Object.defineProperty(ProductsDataTableComponent.prototype, "columnSchema", {
        get: function () {
            if (this.columnSortChanged) {
                return this.sortedColumns;
            }
            if (this.selectedTab === 'dtp') {
                return this.getDTPColumnSchema();
            }
            else if (this.selectedTab === 'rep') {
                return this.getDTRColumnSchema();
            }
            else if (this.selectedTab === 'hc') {
                return this.getHcColumnSchema();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProductsDataTableComponent.prototype, "getDataSet", {
        get: function () {
            if (this.selectedTab === 'dtp') {
                return this.productDataSet.dtpOrders;
            }
            else if (this.selectedTab === 'rep') {
                return this.dtrOrders;
            }
            else if (this.selectedTab === 'hc') {
                return this.hcDataSet;
            }
        },
        enumerable: false,
        configurable: true
    });
    ProductsDataTableComponent.prototype.ngOnInit = function () {
        this.dtpOrderCount = this.productDataSet.dtpOrders.length;
    };
    ProductsDataTableComponent.prototype.getDTPColumnSchema = function () {
        return [
            {
                name: 'id',
                displayName: 'Order ID',
                visibility: 'md',
                linkParam: 'id',
                linkRoute: 'orders',
                linkDisplay: 'id',
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
                customTemplate: true,
                sortFunc: this.customProgramNameSort
            },
            {
                name: 'salesRep',
                displayName: 'Sales Rep',
                visibility: 'md',
                customTemplate: true,
                sortFunc: this.customNameSort
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
    ProductsDataTableComponent.prototype.getDTRColumnSchema = function () {
        return [{
                name: 'id',
                displayName: 'Order #',
                visibility: 'md',
                linkParam: 'id',
                linkRoute: 'orders',
                linkDisplay: 'id',
                sortDir: 'asc'
            },
            {
                name: 'status',
                displayName: 'Order Status',
                visibility: 'md',
                warningProp: ['Pending Approval'],
                errorProp: ['Canceled']
            },
            {
                name: 'orderDate',
                displayName: 'Order Received Date',
                visibility: 'md',
                pipe: new CustomDatePipe(),
                pipeArg2: true
            },
            {
                name: 'orderType',
                displayName: 'Order Type',
                visibility: 'md'
            },
            {
                name: 'rushFlag',
                displayName: 'Rush Order',
                visibility: 'md',
                sortEnabled: false,
                customTemplate: true
            },
            {
                name: 'orderedByAddress',
                displayName: 'Ordered By',
                visibility: 'md',
                sortEnabled: false,
                customTemplate: true
            },
            {
                name: 'shipToAddress',
                displayName: 'Ship to Address',
                visibility: 'xs',
                customTemplate: true,
                sortEnabled: false
            }];
    };
    ProductsDataTableComponent.prototype.getHcColumnSchema = function () {
        return [{
                name: 'id',
                displayName: 'ID',
                visibility: 'md',
                linkParam: 'id',
                linkRoute: 'orders',
                linkDisplay: 'id',
                sortDir: 'asc'
            },
            {
                name: 'img',
                displayName: 'Img',
                visibility: 'md',
                customTemplate: true,
                sortEnabled: false
            },
            {
                name: 'type',
                displayName: 'Type',
                visibility: 'md'
            },
            {
                name: 'docRef',
                displayName: 'Doc /Ref #',
                visibility: 'md'
            },
            {
                name: 'date',
                displayName: 'Date',
                visibility: 'md',
                pipe: new CustomDatePipe(),
                pipeArg2: true
            },
            {
                name: 'status',
                displayName: 'Status',
                visibility: 'md',
                errorProp: ['Exception'],
                successProp: ['Success']
            },
            {
                name: 'validfor',
                displayName: 'Valid for Recon ?',
                visibility: 'md',
                customTemplate: true,
                sortEnabled: false
            },
            {
                name: 'paperRef',
                displayName: 'Paper Ref #',
                visibility: 'md'
            },
            {
                name: 'pac',
                displayName: 'PAC Form(s)',
                visibility: 'md',
                linkParam: 'pac',
                linkRoute: 'orders',
                linkDisplay: 'pac',
            },];
    };
    ProductsDataTableComponent.prototype.updateColumnSort = function (value) {
        this.columnSortChanged = true;
        this.sortedColumns = value;
    };
    ProductsDataTableComponent.prototype.loadRepData = function () {
        var _this = this;
        this.setBusySpinner(this.productService.GetRelatedDtrOrdersByProductId(this.productDataSet.id), 'rep').subscribe(function (x) {
            _this.dtrOrders = x;
        });
    };
    ProductsDataTableComponent.prototype.loadHcData = function () {
        // this.setBusySpinner(this.productService.GetRelatedDtrOrdersByProductId(this.productDataSet.id), 'rep').subscribe(x => {
        //   this.hcDataSet = x;
        // });
        this.hcDataSet = [
            { id: "369137486", img: "not present", type: 'Disbursement', docRef: '12345678901', date: 'Dec 03, 2019 ', status: 'Success', validfor: 'true', paperRef: '123456', pac: '2' },
            { id: "771106146", img: "not present", type: 'Disbursement', docRef: '12345678901', date: 'Dec 03, 2019 ', status: 'Exception', validfor: 'true', paperRef: '123456', pac: '1' },
            { id: "819877504", img: "not present", type: 'Shipment', docRef: '12345678901', date: 'Dec 03, 2019 ', status: 'Waived', validfor: 'true', paperRef: '123456', pac: '2' }
        ];
    };
    ProductsDataTableComponent.prototype.loadTableData = function () {
        this.panelExpanded = true;
    };
    ProductsDataTableComponent.prototype.hideTableData = function () {
        this.panelExpanded = false;
    };
    ProductsDataTableComponent.prototype.showLessClick = function () {
        this.perPage -= 10;
        this.loading = !this.loading;
    };
    ProductsDataTableComponent.prototype.showMoreClick = function () {
        this.perPage += 10;
        this.loading = !this.loading;
    };
    ProductsDataTableComponent.prototype.changeTabs = function (value) {
        if (value === this.selectedTab)
            return;
        this.columnSortChanged = false;
        this.perPage = 10;
        if (value === 'rep') {
            this.loadRepData();
        }
        if (value === 'hc') {
            this.loadHcData();
        }
        this.selectedTab = value;
    };
    ProductsDataTableComponent.prototype.customNameSort = function (a, b, event) {
        var result = a.repFirstName.localeCompare(b.repFirstName);
        if (result === 0) {
            result = a.repLastName.localeCompare(b.repLastName);
        }
        return (event.sortDir === 'asc' ? result : -result);
    };
    ProductsDataTableComponent.prototype.customProgramNameSort = function (a, b, event) {
        var result = 0;
        if (!a.programId) {
            result = 1;
        }
        else if (!b.programId) {
            result = -1;
        }
        else {
            result = a.programId.localeCompare(b.programId);
        }
        return (event.sortDir === 'asc' ? result : -result);
    };
    __decorate([
        Input(),
        __metadata("design:type", Product)
    ], ProductsDataTableComponent.prototype, "productDataSet", void 0);
    ProductsDataTableComponent = __decorate([
        Component({
            selector: 'app-products-data-table',
            templateUrl: './product-data-table.component.html',
            styleUrls: ['./product-data-table.component.scss']
        }),
        __metadata("design:paramtypes", [ProductService])
    ], ProductsDataTableComponent);
    return ProductsDataTableComponent;
}(BusySpinner));
export { ProductsDataTableComponent };
//# sourceMappingURL=product-data-table.component.js.map