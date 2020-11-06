import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { SalesFilterCriteria } from '../rep.model';
var RepOrderListFilterComponent = /** @class */ (function () {
    function RepOrderListFilterComponent() {
        this.emitSearch = new EventEmitter();
        this.init(null);
    }
    RepOrderListFilterComponent.prototype.ngOnInit = function () {
        this.initDatePicker();
    };
    RepOrderListFilterComponent.prototype.init = function (salesFilterCriteria) {
        //get and fill initial data if any
        this.salesFilterCriteria = new SalesFilterCriteria();
        this.salesFilterCriteria.firstName = '';
        this.salesFilterCriteria.lastName = '';
    };
    RepOrderListFilterComponent.prototype.onSubmit = function (resetValue) {
        this.emitSearch.emit({ filter: this.salesFilterCriteria, isReset: resetValue || false });
    };
    RepOrderListFilterComponent.prototype.resetFilter = function () {
        this.salesFilterCriteria.firstName = '';
        this.salesFilterCriteria.lastName = '';
        this.onSubmit(true);
    };
    RepOrderListFilterComponent.prototype.initDatePicker = function () {
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
    ], RepOrderListFilterComponent.prototype, "emitSearch", void 0);
    __decorate([
        ViewChild('accordian', { static: true }),
        __metadata("design:type", NgbAccordion)
    ], RepOrderListFilterComponent.prototype, "accordian", void 0);
    RepOrderListFilterComponent = __decorate([
        Component({
            selector: 'app-rep-order-list-filter',
            templateUrl: './rep-order-list-filter.component.html',
            styleUrls: ['./rep-order-list-filter.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], RepOrderListFilterComponent);
    return RepOrderListFilterComponent;
}());
export { RepOrderListFilterComponent };
//# sourceMappingURL=rep-order-list-filter.component.js.map