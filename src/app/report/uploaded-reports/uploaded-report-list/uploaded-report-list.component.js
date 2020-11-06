import { __decorate, __extends, __metadata, __values } from "tslib";
import { Component } from '@angular/core';
import { BusySpinner } from './../../../common/busy-spinner';
import { ReportService } from './../../report.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material';
import { UploadReportsComponent } from '../upload-reports/upload-reports.component';
var UploadedReportListComponent = /** @class */ (function (_super) {
    __extends(UploadedReportListComponent, _super);
    function UploadedReportListComponent(reportService, dialog) {
        var _this = _super.call(this) || this;
        _this.reportService = reportService;
        _this.dialog = dialog;
        _this.pageSize = 10;
        _this.currentPage = 1;
        _this.fromReport = true;
        _this.pages = [];
        _this.columns = [
            { title: 'Report Name' },
            { title: 'Report Type' },
            { title: 'Report Category' },
            { title: 'Date and Time of Export' },
            { title: 'Report Format' },
            { title: 'Uploaded By' }
        ];
        return _this;
    }
    UploadedReportListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setBusySpinner(this.reportService.GetGeneratedReports(), "Reports").subscribe(function (report) {
            var e_1, _a;
            _this.collection = report;
            console.log(_this.collection);
            _this.totalRecordCount = _this.collection.length;
            _this.reportsPerPage = _this.collection.slice(0, _this.pageSize);
            for (var i = 1; i <= Math.ceil(_this.totalRecordCount / _this.pageSize); i++) {
                _this.pages.push(i);
            }
            try {
                for (var _b = __values(_this.reportsPerPage), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var report_1 = _c.value;
                    report_1["format"] = report_1.attachment.slice(report_1.attachment.indexOf('.') + 1);
                    report_1["exportDate"] = report_1.uploadedOn.toLocaleDateString() + " at " + report_1.uploadedOn.toLocaleTimeString() + " " + report_1.uploadedOn.toUTCString().slice(-3);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    };
    UploadedReportListComponent.prototype.paginate = function (pageNumber) {
        this.currentPage = pageNumber;
        this.onSubmit({}, true);
    };
    UploadedReportListComponent.prototype.onSubmit = function (filterObj, isPagination) {
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
    UploadedReportListComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(UploadReportsComponent, {
            panelClass: 'custom-dialog'
            //data: {show:dataToShow}
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
    };
    UploadedReportListComponent = __decorate([
        Component({
            selector: 'app-uploaded-report-list',
            templateUrl: './uploaded-report-list.component.html',
            styleUrls: ['./uploaded-report-list.component.scss'],
            providers: [NgbModalConfig, NgbModal]
        }),
        __metadata("design:paramtypes", [ReportService, MatDialog])
    ], UploadedReportListComponent);
    return UploadedReportListComponent;
}(BusySpinner));
export { UploadedReportListComponent };
//# sourceMappingURL=uploaded-report-list.component.js.map