import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
var GenerateReportFilterComponent = /** @class */ (function () {
    function GenerateReportFilterComponent() {
        this.emitSearch = new EventEmitter();
        this.init(null);
    }
    GenerateReportFilterComponent.prototype.ngOnInit = function () {
    };
    GenerateReportFilterComponent.prototype.init = function (generateReportFilterCriteria) {
        this.generateReportFilterCriteria = new GenerateReportFilterCriteria();
        this.setDefaultFilters();
    };
    GenerateReportFilterComponent.prototype.setDefaultFilters = function () {
        this.generateReportFilterCriteria.reportName = "";
    };
    GenerateReportFilterComponent.prototype.onSubmit = function () {
        this.emitSearch.emit(this.generateReportFilterCriteria);
    };
    GenerateReportFilterComponent.prototype.resetFilter = function () {
        this.setDefaultFilters();
        this.onSubmit();
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], GenerateReportFilterComponent.prototype, "emitSearch", void 0);
    GenerateReportFilterComponent = __decorate([
        Component({
            selector: 'app-generate-report-filter',
            templateUrl: './generate-report-filter.component.html',
            styleUrls: ['./generate-report-filter.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], GenerateReportFilterComponent);
    return GenerateReportFilterComponent;
}());
export { GenerateReportFilterComponent };
var GenerateReportFilterCriteria = /** @class */ (function () {
    function GenerateReportFilterCriteria() {
    }
    GenerateReportFilterCriteria.prototype.clone = function () {
        var generateReportFilterCriteria = new GenerateReportFilterCriteria();
        generateReportFilterCriteria.reportName = this.reportName;
        return generateReportFilterCriteria;
    };
    return GenerateReportFilterCriteria;
}());
export { GenerateReportFilterCriteria };
//# sourceMappingURL=generate-report-filter.component.js.map