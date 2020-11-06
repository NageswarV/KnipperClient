import { __decorate, __extends, __metadata, __values } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportService } from '../../report.service';
import { BusySpinner } from './../../../common/busy-spinner';
var ReportDetailsComponent = /** @class */ (function (_super) {
    __extends(ReportDetailsComponent, _super);
    function ReportDetailsComponent(reportService) {
        var _this = _super.call(this) || this;
        _this.reportService = reportService;
        _this.currentPage = 1;
        _this.pageSize = 20;
        _this.generateReportFlag = false;
        _this.showListevent = new EventEmitter();
        _this.initDatePicker();
        return _this;
    }
    ReportDetailsComponent.prototype.ngOnInit = function () {
    };
    ReportDetailsComponent.prototype.initDatePicker = function () {
        this.myDatePickerOptions = {
            dateFormat: 'mm/dd/yyyy',
            firstDayOfWeek: "su",
            selectionTxtFontSize: '15px',
            showClearDateBtn: true,
            editableDateField: false,
            inline: false,
            height: '45px'
        };
    };
    ReportDetailsComponent.prototype.generateReport = function () {
        this.prepareDataSet();
        this.generateReportFlag = true;
    };
    ReportDetailsComponent.prototype.parseData = function (data) {
        var _this = this;
        return data.map(function (object) {
            var e_1, _a;
            try {
                for (var _b = __values(_this.columnkeys), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    if (object[key] instanceof Date) {
                        object[key] = object[key].toLocaleDateString();
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return object;
        });
    };
    ReportDetailsComponent.prototype.prepareDataSet = function () {
        var _this = this;
        if (this.reportDetails !== "Open AOC Report") {
            this.setBusySpinner(this.reportService.getInventoryShippedByItemReport(), "Reports").subscribe(function (report) {
                _this.collection = report;
                _this.totalRecordCount = _this.collection.length;
                _this.columnkeys = Object.keys(_this.collection[0]);
                _this.collection = _this.parseData(_this.collection);
                _this.columns = Object.keys(_this.collection[0])
                    .map(function (column) {
                    return column.charAt(0).toUpperCase() + column.slice(1);
                })
                    .map(function (column) { return { title: column }; });
            });
        }
        else {
            this.setBusySpinner(this.reportService.getAOCReportDetails(), "Reports").subscribe(function (report) {
                _this.collection = report;
                _this.totalRecordCount = _this.collection.length;
                _this.columnkeys = Object.keys(_this.collection[0]);
                _this.collection = _this.parseData(_this.collection);
                _this.columns = Object.keys(_this.collection[0])
                    .map(function (column) {
                    return column.charAt(0).toUpperCase() + column.slice(1);
                })
                    .map(function (column) { return { title: column }; });
            });
        }
    };
    ReportDetailsComponent.prototype.goToList = function () {
        this.showListevent.emit("list");
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ReportDetailsComponent.prototype, "reportDetails", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ReportDetailsComponent.prototype, "showListevent", void 0);
    ReportDetailsComponent = __decorate([
        Component({
            selector: 'app-report-details',
            templateUrl: './report-details.component.html',
            styleUrls: ['./report-details.component.scss']
        }),
        __metadata("design:paramtypes", [ReportService])
    ], ReportDetailsComponent);
    return ReportDetailsComponent;
}(BusySpinner));
export { ReportDetailsComponent };
//# sourceMappingURL=report-details.component.js.map