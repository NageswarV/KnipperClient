import { __decorate, __extends, __metadata } from "tslib";
import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { RepService } from '../rep.service';
import { BusySpinner } from '../../common/busy-spinner';
var RepPushShipmentListComponent = /** @class */ (function (_super) {
    __extends(RepPushShipmentListComponent, _super);
    function RepPushShipmentListComponent(repService, cdr) {
        var _this = _super.call(this) || this;
        _this.repService = repService;
        _this.cdr = cdr;
        _this.reps = [];
        _this.repsPerPage = [];
        _this.pageSize = 3;
        _this.currentPage = 1;
        _this.perPage = 10;
        _this.startCount = 0;
        _this.endCount = 0;
        _this.pageNum = 1;
        _this.totalCount = 0;
        _this.currentList = [];
        _this.columns = [
            { title: 'Order #', classes: 'col-xs-2' },
            { title: 'Order Status', classes: 'col-xs-2' },
            { title: 'Order Date', classes: 'col-xs-1' },
            { title: 'Order Type', classes: 'col-xs-1' },
            { title: 'Rush Order', classes: 'col-xs-1' },
            { title: 'Order By', classes: 'col-xs-3' },
            { title: 'Ship To', classes: 'col-xs-4' },
        ];
        return _this;
    }
    RepPushShipmentListComponent.prototype.ngOnInit = function () {
    };
    RepPushShipmentListComponent.prototype.pageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.repsPerPage = this.reps.slice(this.currentPage == 1 ? 0 : (this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    };
    RepPushShipmentListComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            if (changes.hasOwnProperty(propName)) {
                switch (propName) {
                    case 'filterObj': {
                        this.getRepPushShipmenst(changes.filterObj.currentValue);
                    }
                }
            }
        }
    };
    RepPushShipmentListComponent.prototype.getRepPushShipmenst = function (filterObjList) {
        var _this = this;
        this.setBusySpinner(this.repService.GetRepPushShipments(), "Reps").subscribe(function (response) {
            if ((filterObjList && filterObjList.isReset) || filterObjList == undefined || Object.values(filterObjList.filter).every(function (x) { return (x === null || x === ''); })) {
                _this.reps = response;
            }
            else {
                _this.reps = _this.getFilteredData(response, filterObjList.filter);
            }
            _this.totalRecordCount = _this.reps.length;
            _this.currentPage = 1;
            _this.repsPerPage = _this.reps.slice(0, _this.pageSize);
        });
    };
    RepPushShipmentListComponent.prototype.getFilteredData = function (repList, filter) {
        return repList.filter(function (item) {
            var data = Object.keys(filter).map(function (key) {
                return filter[key] && item[key].toLowerCase().includes(filter[key].toLowerCase());
            });
            if (data.includes(true)) {
                return item;
            }
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], RepPushShipmentListComponent.prototype, "filterObj", void 0);
    RepPushShipmentListComponent = __decorate([
        Component({
            selector: 'app-rep-push-shipment-list',
            templateUrl: './rep-push-shipment-list.component.html',
            styleUrls: ['./rep-push-shipment-list.component.scss']
        }),
        __metadata("design:paramtypes", [RepService, ChangeDetectorRef])
    ], RepPushShipmentListComponent);
    return RepPushShipmentListComponent;
}(BusySpinner));
export { RepPushShipmentListComponent };
//# sourceMappingURL=rep-push-shipment-list.component.js.map