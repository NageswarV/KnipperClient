import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Rep } from '../../../../generated/service-client';
import { BusySpinner } from '../../../common/busy-spinner';
import { CustomDatePipe } from '../../../shared/custom-date.pipe';
import { HcpService } from '../../hcp.service';
import { HcpDialogComponent } from '../hcp-dialog/hcp-dialog.component';
import { MatDialog } from '@angular/material';
import { CreateNewTaskComponent } from '../../../shared/components/create-new-task/create-new-task.component';
var HcpOrderDataTableComponent = /** @class */ (function (_super) {
    __extends(HcpOrderDataTableComponent, _super);
    function HcpOrderDataTableComponent(hcpService, dialog) {
        var _this = _super.call(this) || this;
        _this.hcpService = hcpService;
        _this.dialog = dialog;
        _this.perPage = 10;
        _this.dtrOrders = [];
        _this.dtpOrderCount = 0;
        _this.selectedTab = 'dtp';
        _this.loading = false;
        _this.columnSortChanged = false;
        _this.panelExpanded = false;
        return _this;
    }
    Object.defineProperty(HcpOrderDataTableComponent.prototype, "columnSchema", {
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
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HcpOrderDataTableComponent.prototype, "getDataSet", {
        get: function () {
            if (this.selectedTab === 'dtp') {
                return this.hcpDataSet.dtpOrders;
            }
            else if (this.selectedTab === 'rep') {
                return this.dtrOrders;
            }
        },
        enumerable: false,
        configurable: true
    });
    HcpOrderDataTableComponent.prototype.ngOnInit = function () {
        this.dtpOrderCount = this.hcpDataSet.dtpOrders.length;
    };
    HcpOrderDataTableComponent.prototype.getDTPColumnSchema = function () {
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
                sortFunc: this.customProgramNameSort,
                customTemplate: true
            },
            {
                name: 'salesRep',
                displayName: 'Sales Rep',
                visibility: 'md',
                sortFunc: this.customNameSort,
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
    HcpOrderDataTableComponent.prototype.getDTRColumnSchema = function () {
        return [{
                name: 'id',
                displayName: 'Order #',
                visibility: 'xs',
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
                visibility: 'xs',
                pipe: new CustomDatePipe(),
                pipeArg2: true
            },
            {
                name: 'orderType',
                displayName: 'Order Type',
                visibility: 'xs'
            },
            {
                name: 'rushFlag',
                displayName: 'Rush Order',
                visibility: 'xs',
                sortEnabled: false,
                customTemplate: true
            },
            {
                name: 'orderedByAddress',
                displayName: 'Ordered By',
                visibility: 'xs',
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
    HcpOrderDataTableComponent.prototype.updateColumnSort = function (value) {
        this.columnSortChanged = true;
        this.sortedColumns = value;
    };
    HcpOrderDataTableComponent.prototype.loadRepData = function () {
        var _this = this;
        this.setBusySpinner(this.hcpService.GetDtrOrdersByHcpId(this.hcpDataSet.id), 'rep').subscribe(function (x) {
            _this.dtrOrders = x;
        });
    };
    HcpOrderDataTableComponent.prototype.loadTableData = function () {
        this.panelExpanded = true;
    };
    HcpOrderDataTableComponent.prototype.hideTableData = function () {
        this.panelExpanded = false;
    };
    HcpOrderDataTableComponent.prototype.showLessClick = function () {
        this.perPage -= 10;
        this.loading = !this.loading;
    };
    HcpOrderDataTableComponent.prototype.showMoreClick = function () {
        this.perPage += 10;
        this.loading = !this.loading;
    };
    HcpOrderDataTableComponent.prototype.changeTabs = function (value) {
        if (value === this.selectedTab)
            return;
        this.columnSortChanged = false;
        this.perPage = 10;
        if (value === 'rep') {
            this.loadRepData();
        }
        this.selectedTab = value;
    };
    HcpOrderDataTableComponent.prototype.openDialog = function (id) {
        var _this = this;
        var dataToShow;
        this.hcpService.GetCommunicationsyOrderId(id).subscribe(function (result) {
            dataToShow = result;
            console.log("dataToShow", dataToShow);
            var dialogRef = _this.dialog.open(HcpDialogComponent, {
                panelClass: 'custom-dialog',
                data: { show: dataToShow }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                console.log('The dialog was closed');
            });
        });
    };
    HcpOrderDataTableComponent.prototype.customNameSort = function (a, b, event) {
        var result = a.repFirstName.localeCompare(b.repFirstName);
        if (result === 0) {
            result = a.repLastName.localeCompare(b.repLastName);
        }
        return (event.sortDir === 'asc' ? result : -result);
    };
    HcpOrderDataTableComponent.prototype.customProgramNameSort = function (a, b, event) {
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
    HcpOrderDataTableComponent.prototype.openCreateTaskDialog = function () {
        console.log("Hello");
        this.dialog.open(CreateNewTaskComponent, {
            panelClass: 'custom-dialog',
            width: '1000px',
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Rep)
    ], HcpOrderDataTableComponent.prototype, "hcpDataSet", void 0);
    HcpOrderDataTableComponent = __decorate([
        Component({
            selector: 'hcp-data-table',
            templateUrl: './hcp-order-table.component.html',
            styleUrls: ['./hcp-order-table.component.scss'],
            encapsulation: ViewEncapsulation.Emulated
        }),
        __metadata("design:paramtypes", [HcpService, MatDialog])
    ], HcpOrderDataTableComponent);
    return HcpOrderDataTableComponent;
}(BusySpinner));
export { HcpOrderDataTableComponent };
//# sourceMappingURL=hcp-order-table.component.js.map