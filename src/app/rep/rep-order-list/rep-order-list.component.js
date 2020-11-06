import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { BusySpinner } from '../../common/busy-spinner';
import { RepService } from '../rep.service';
import { MatDialog } from '@angular/material';
import { RepTerritoryHistoryComponent } from '../rep-territory-history/rep-territory-history.component';
var RepOrderListComponent = /** @class */ (function (_super) {
    __extends(RepOrderListComponent, _super);
    function RepOrderListComponent(repService, dialogue) {
        var _this = _super.call(this) || this;
        _this.repService = repService;
        _this.dialogue = dialogue;
        _this.reps = [];
        _this.pageSize = 3;
        _this.currentPage = 1;
        _this.repsActivities = [];
        _this.repsActivitiesPerPage = [];
        _this.dtpcolumns = [
            { title: 'Order #', classes: 'col-xs-2' },
            { title: 'Ship To Address', classes: 'col-xs-3' },
            { title: 'Order Received Date', classes: 'col-xs-2' },
            { title: 'Order Status', classes: 'col-xs-2' },
            { title: 'Order Source', classes: 'col-xs-2' },
            { title: 'Program', classes: 'col-xs-2' },
            { title: 'Communication(s)', classes: 'col-xs-2' },
        ];
        _this.dtrcolumns = [
            { title: 'Order #', classes: 'col-xs-1' },
            { title: 'Order Status', classes: 'col-xs-1' },
            { title: 'Order Date', classes: 'col-xs-1' },
            { title: 'Order Type', classes: 'col-xs-1' },
            { title: 'Rush Order', classes: 'col-xs-1' },
            { title: 'Ordered By', classes: 'col-xs-3' },
            { title: 'Ship To', classes: 'col-xs-3' },
        ];
        _this.handCarryMetrics = [
            { title: 'Order #', classes: 'col-xs-1' },
            { title: 'Order Status', classes: 'col-xs-1' },
            { title: 'Order Date', classes: 'col-xs-1' },
            { title: 'Order Type', classes: 'col-xs-1' },
            { title: 'Rush Order', classes: 'col-xs-1' },
            { title: 'Ordered By', classes: 'col-xs-3' },
            { title: 'Ship To', classes: 'col-xs-3' },
        ];
        return _this;
    }
    RepOrderListComponent.prototype.ngOnInit = function () {
    };
    RepOrderListComponent.prototype.pageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.repsActivitiesPerPage = this.repsActivities.slice(this.currentPage == 1 ? 0 : (this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    };
    RepOrderListComponent.prototype.loadDtrOrders = function (repId) {
        var _this = this;
        this.setBusySpinner(this.repService.GetDtrOrdersByRepId(repId), 'repDtrOrders').subscribe(function (x) {
            _this.repsActivitiesPerPage.filter(function (y) { return y.Rep.id == repId; })[0].DtrOrders = x;
        });
    };
    RepOrderListComponent.prototype.openDialogue = function (repId) {
        var _this = this;
        this.repService.GetRepTerritoryHistory(repId).subscribe(function (res) {
            _this.dialogue.open(RepTerritoryHistoryComponent, {
                panelClass: 'custom-dialog',
                data: { rep: res },
                width: '1000px',
            });
        });
    };
    RepOrderListComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            if (changes.hasOwnProperty(propName)) {
                switch (propName) {
                    case 'filterObj': {
                        this.getRepActivities(changes.filterObj.currentValue);
                    }
                }
            }
        }
    };
    RepOrderListComponent.prototype.getRepActivities = function (filterObjList) {
        var _this = this;
        this.setBusySpinner(this.repService.GetRepsIncludingDtpOrders(), "Reps").subscribe(function (x) {
            if ((filterObjList && filterObjList.isReset) || filterObjList == undefined || Object.values(filterObjList.filter).every(function (x) { return (x === null || x === ''); })) {
                _this.reps = x;
            }
            else {
                _this.reps = _this.getFilteredData(x, filterObjList.filter);
            }
            _this.repsActivities = [];
            _this.reps.forEach(function (y) {
                var repActivity = {
                    Rep: y,
                    DtrOrders: []
                };
                _this.repsActivities.push(repActivity);
            });
            _this.totalRecordCount = _this.reps.length;
            _this.currentPage = 1;
            _this.repsActivitiesPerPage = _this.repsActivities.slice(0, _this.pageSize);
        });
    };
    RepOrderListComponent.prototype.getFilteredData = function (repList, filter) {
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
    ], RepOrderListComponent.prototype, "filterObj", void 0);
    RepOrderListComponent = __decorate([
        Component({
            selector: 'app-rep-order-list',
            templateUrl: './rep-order-list.component.html',
            styleUrls: ['./rep-order-list.component.scss']
        }),
        __metadata("design:paramtypes", [RepService, MatDialog])
    ], RepOrderListComponent);
    return RepOrderListComponent;
}(BusySpinner));
export { RepOrderListComponent };
//# sourceMappingURL=rep-order-list.component.js.map