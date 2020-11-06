import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { ProductFilterCriteria } from '../product.model';
var ProductsFilterComponent = /** @class */ (function () {
    function ProductsFilterComponent() {
        this.emitProductSearch = new EventEmitter();
        this.productName = '';
    }
    ProductsFilterComponent.prototype.ngOnInit = function () {
        this.initDatePicker();
        this.initFilter();
    };
    ProductsFilterComponent.prototype.initFilter = function () {
        //get and fill initial data if any
        this.productFilterCriteria = new ProductFilterCriteria();
        this.productFilterCriteria.productName = this.productName;
    };
    ProductsFilterComponent.prototype.onSubmit = function () {
        this.productFilterCriteria = new ProductFilterCriteria();
        this.productFilterCriteria.productName = this.productName;
        this.emitProductSearch.emit(this.productFilterCriteria);
    };
    ProductsFilterComponent.prototype.resetFilter = function () {
        this.productName = '';
        this.onSubmit();
    };
    ProductsFilterComponent.prototype.initDatePicker = function () {
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
    ], ProductsFilterComponent.prototype, "emitProductSearch", void 0);
    __decorate([
        ViewChild('accordian', { static: true }),
        __metadata("design:type", NgbAccordion)
    ], ProductsFilterComponent.prototype, "accordian", void 0);
    ProductsFilterComponent = __decorate([
        Component({
            selector: 'app-products-filter',
            templateUrl: './products-filter.component.html',
            styleUrls: ['./products-filter.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], ProductsFilterComponent);
    return ProductsFilterComponent;
}());
export { ProductsFilterComponent };
//# sourceMappingURL=products-filter.component.js.map