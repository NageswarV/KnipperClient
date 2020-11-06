import { __decorate, __extends, __metadata } from "tslib";
import { Component } from '@angular/core';
import { BusySpinner } from '../../common/busy-spinner';
import { HcpService } from '../hcp.service';
var HcpOrderListComponent = /** @class */ (function (_super) {
    __extends(HcpOrderListComponent, _super);
    function HcpOrderListComponent(hcpService) {
        var _this = _super.call(this) || this;
        _this.hcpService = hcpService;
        _this.hcpsOrderList = [];
        _this.perPage = 3;
        _this.startCount = 0;
        _this.endCount = 0;
        _this.pageNum = 1;
        _this.totalCount = 0;
        _this.currentList = [];
        _this.sortingType = 'desc';
        return _this;
    }
    HcpOrderListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isCollapsed = false;
        this.setBusySpinner(this.hcpService.GetHcpsIncludingDtpOrders()).subscribe(function (x) {
            _this.hcpsOrderList = x;
            _this.totalCount = x.length;
            _this.sortHcps();
        });
    };
    HcpOrderListComponent.prototype.onCollapse = function () {
        this.isCollapsed = !this.isCollapsed;
    };
    HcpOrderListComponent.prototype.applyFilter = function (filterObj) {
        var _this = this;
        this.setBusySpinner(this.hcpService.GetHcpsIncludingDtpOrders()).subscribe(function (response) {
            if (filterObj.isReset || Object.values(filterObj.filter).every(function (x) { return (x === null || x === ''); })) {
                _this.hcpsOrderList = response;
            }
            else {
                _this.hcpsOrderList = _this.getFilteredData(response, filterObj.filter);
            }
            _this.totalCount = _this.hcpsOrderList.length;
            _this.sortHcps();
        });
    };
    HcpOrderListComponent.prototype.getFilteredData = function (hcpList, filter) {
        return hcpList.filter(function (item) {
            var data = Object.keys(filter).map(function (key) {
                return filter[key] && item[key].toLowerCase().includes(filter[key].toLowerCase());
            });
            if (data.includes(true)) {
                return item;
            }
        });
    };
    HcpOrderListComponent.prototype.updatePageDisplay = function () {
        this.startCount = (this.pageNum - 1) * this.perPage + 1;
        this.endCount = this.startCount + this.perPage - 1;
        if (this.endCount > this.totalCount) {
            this.endCount = this.totalCount;
        }
        if (this.totalCount === 0) {
            this.startCount = 0;
        }
        this.pageDisplay = "Display ($0 - $1) of $2 results"
            .replace('$0', this.startCount + '')
            .replace('$1', this.endCount + '')
            .replace('$2', this.hcpsOrderList.length + '');
    };
    HcpOrderListComponent.prototype.onPaginate = function (page) {
        var start = (page - 1) * this.perPage;
        var end = start + 3 > this.totalCount ? this.totalCount : start + 3;
        this.pageNum = page;
        this.currentList = this.hcpsOrderList.slice(start, end);
        this.updatePageDisplay();
    };
    HcpOrderListComponent.prototype.sortHcps = function () {
        if (this.sortingType == 'asc') {
            this.hcpsOrderList.sort(function (a, b) { return (a.firstName.toLowerCase() > b.firstName.toLowerCase()) ? 1 : (a.firstName.toLowerCase() === b.firstName.toLowerCase()) ? ((a.lastName.toLowerCase() > b.lastName.toLowerCase()) ? 1 : -1) : -1; });
        }
        else {
            this.hcpsOrderList.sort(function (a, b) { return (a.firstName.toLowerCase() < b.firstName.toLowerCase()) ? 1 : (a.firstName.toLowerCase() === b.firstName.toLowerCase()) ? ((a.lastName.toLowerCase() < b.lastName.toLocaleLowerCase()) ? 1 : -1) : -1; });
        }
        this.currentList = this.hcpsOrderList.slice(0, this.perPage);
        this.pageNum = 1;
        this.updatePageDisplay();
    };
    HcpOrderListComponent = __decorate([
        Component({
            selector: 'app-hcp-order-list',
            templateUrl: './hcp-order-list.component.html',
            styleUrls: ['./hcp-order-list.component.scss']
        }),
        __metadata("design:paramtypes", [HcpService])
    ], HcpOrderListComponent);
    return HcpOrderListComponent;
}(BusySpinner));
export { HcpOrderListComponent };
//# sourceMappingURL=hcp-order-list.component.js.map