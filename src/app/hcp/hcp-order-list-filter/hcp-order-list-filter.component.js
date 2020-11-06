import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { CacheService } from '../../cache/cache.service';
import { HcpOrderFilterCriteria } from '../hcp-order.model';
var HcpOrderListFilterComponent = /** @class */ (function () {
    function HcpOrderListFilterComponent(cacheService) {
        this.cacheService = cacheService;
        this.emitHcpSearch = new EventEmitter();
        this.stateOptions = [];
        this.init(null);
    }
    HcpOrderListFilterComponent.prototype.ngOnInit = function () {
        this.initDatePicker();
        this.stateOptions = this.cacheService.stateCache;
    };
    HcpOrderListFilterComponent.prototype.init = function (hcpOrderFilterCriteria) {
        //get and fill initial data if any
        this.hcpOrderFilterCriteria = new HcpOrderFilterCriteria();
        this.hcpOrderFilterCriteria.firstName = '';
        this.hcpOrderFilterCriteria.lastName = '';
        this.hcpOrderFilterCriteria.stateCode = '';
    };
    HcpOrderListFilterComponent.prototype.onSubmit = function (reset) {
        this.emitHcpSearch.emit({ filter: this.hcpOrderFilterCriteria, isReset: reset || false });
    };
    HcpOrderListFilterComponent.prototype.resetFilter = function () {
        this.hcpOrderFilterCriteria.firstName = '';
        this.hcpOrderFilterCriteria.lastName = '';
        this.hcpOrderFilterCriteria.stateCode = '';
        this.onSubmit(true);
    };
    HcpOrderListFilterComponent.prototype.initDatePicker = function () {
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
    ], HcpOrderListFilterComponent.prototype, "emitHcpSearch", void 0);
    __decorate([
        ViewChild('accordian', { static: true }),
        __metadata("design:type", NgbAccordion)
    ], HcpOrderListFilterComponent.prototype, "accordian", void 0);
    HcpOrderListFilterComponent = __decorate([
        Component({
            selector: 'sg-hcp-order-list-filter',
            templateUrl: './hcp-order-list-filter.component.html',
            styleUrls: ['../hcp-order-list/hcp-order-list.component.scss']
        }),
        __metadata("design:paramtypes", [CacheService])
    ], HcpOrderListFilterComponent);
    return HcpOrderListFilterComponent;
}());
export { HcpOrderListFilterComponent };
//# sourceMappingURL=hcp-order-list-filter.component.js.map