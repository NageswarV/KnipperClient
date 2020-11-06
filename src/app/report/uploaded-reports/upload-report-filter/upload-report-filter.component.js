import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
var UploadReportFilterComponent = /** @class */ (function () {
    function UploadReportFilterComponent() {
        this.emitSearch = new EventEmitter();
        this.init(null);
    }
    UploadReportFilterComponent.prototype.ngOnInit = function () {
        this.initDatePicker();
    };
    UploadReportFilterComponent.prototype.init = function (uploadedReportFilterCriteria) {
        this.uploadedReportFilterCriteria = new UploadedReportFilterCriteria();
        this.setDefaultFilters();
    };
    UploadReportFilterComponent.prototype.setDefaultFilters = function () {
        this.uploadedReportFilterCriteria.firstName = "";
        this.uploadedReportFilterCriteria.lastName = "";
    };
    UploadReportFilterComponent.prototype.onSubmit = function () {
        this.emitSearch.emit(this.uploadedReportFilterCriteria);
    };
    UploadReportFilterComponent.prototype.resetFilter = function () {
        this.setDefaultFilters();
        this.onSubmit();
    };
    UploadReportFilterComponent.prototype.initDatePicker = function () {
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
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], UploadReportFilterComponent.prototype, "emitSearch", void 0);
    __decorate([
        ViewChild('accordian', { static: true }),
        __metadata("design:type", NgbAccordion)
    ], UploadReportFilterComponent.prototype, "accordian", void 0);
    UploadReportFilterComponent = __decorate([
        Component({
            selector: "app-upload-report-filter",
            templateUrl: "./upload-report-filter.component.html",
            styleUrls: ["./upload-report-filter.component.scss"],
        }),
        __metadata("design:paramtypes", [])
    ], UploadReportFilterComponent);
    return UploadReportFilterComponent;
}());
export { UploadReportFilterComponent };
var UploadedReportFilterCriteria = /** @class */ (function () {
    function UploadedReportFilterCriteria() {
    }
    UploadedReportFilterCriteria.prototype.clone = function () {
        var uploadedReportFilterCriteria = new UploadedReportFilterCriteria();
        uploadedReportFilterCriteria.firstName = this.firstName;
        uploadedReportFilterCriteria.lastName = this.lastName;
        return uploadedReportFilterCriteria;
    };
    return UploadedReportFilterCriteria;
}());
export { UploadedReportFilterCriteria };
//# sourceMappingURL=upload-report-filter.component.js.map