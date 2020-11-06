import { __decorate, __extends, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ReportService } from '../../report.service';
import { BusySpinner } from '../../../common/busy-spinner';
var GenerateReportsListComponent = /** @class */ (function (_super) {
    __extends(GenerateReportsListComponent, _super);
    function GenerateReportsListComponent(reportService) {
        var _this = _super.call(this) || this;
        _this.reportService = reportService;
        _this.pageSize = 10;
        _this.currentPage = 1;
        _this.fromReport = true;
        _this.pages = [];
        _this.columns = [
            { title: 'Report Name', classes: 'col-xs-2' },
            { title: 'Report Description', classes: 'col-xs-3' },
            { title: 'Line Of Business', classes: 'col-xs-2' },
            { title: 'Category', classes: 'col-xs-2' }
        ];
        return _this;
    }
    GenerateReportsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setBusySpinner(this.reportService.GetReportDefinitions(), "Reports").subscribe(function (report) {
            _this.collection = report;
            _this.totalRecordCount = _this.collection.length;
            _this.reportsPerPage = _this.collection.slice(0, _this.pageSize);
            _this.totalPages = Math.ceil(_this.totalRecordCount / _this.pageSize);
            for (var i = 1; i <= Math.ceil(_this.totalRecordCount / _this.pageSize); i++) {
                _this.pages.push(i);
            }
        });
    };
    GenerateReportsListComponent.prototype.paginate = function (pageNumber) {
        this.currentPage = pageNumber;
        this.onSubmit({}, true);
    };
    GenerateReportsListComponent.prototype.onSubmit = function (filterObj, isPagination) {
        if (filterObj.isFilterChanged === true || isPagination === true) {
            if (!isPagination) {
                this.currentPage = 1;
            }
            ;
            var remainingItemsCount = this.totalRecordCount - ((this.currentPage - 1) * this.pageSize);
            var itemsToLoad = remainingItemsCount > this.pageSize ? this.pageSize : remainingItemsCount;
            this.reportsPerPage = this.collection.slice((this.currentPage - 1) * this.pageSize, itemsToLoad + ((this.currentPage - 1) * this.pageSize));
        }
    };
    GenerateReportsListComponent = __decorate([
        Component({
            selector: 'app-generate-reports-list',
            templateUrl: './generate-reports-list.component.html',
            styleUrls: ['./generate-reports-list.component.scss']
        }),
        __metadata("design:paramtypes", [ReportService])
    ], GenerateReportsListComponent);
    return GenerateReportsListComponent;
}(BusySpinner));
export { GenerateReportsListComponent };
//# sourceMappingURL=generate-reports-list.component.js.map