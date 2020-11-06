import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var FilterService = /** @class */ (function () {
    function FilterService() {
        this.filterStorageKey = 'Filter.Storage.Key';
        this.isFilterShown = new Subject();
        this.filterNameList = new Set();
    }
    FilterService.prototype.hasFilter = function (filterName) {
        return localStorage.getItem(filterName) != null;
    };
    FilterService.prototype.saveFilter = function (filterName, filterData) {
        localStorage.setItem(filterName, JSON.stringify(filterData));
        this.filterNameList.add(filterName);
        localStorage.setItem(this.filterStorageKey, JSON.stringify(Array.from(this.filterNameList)));
    };
    FilterService.prototype.loadFilter = function (filterName) {
        return JSON.parse(localStorage.getItem(filterName));
    };
    FilterService.prototype.clearFilter = function (filterName) {
        localStorage.removeItem(filterName);
    };
    FilterService.prototype.clearAllFilter = function () {
        var _this = this;
        this.filterNameList = this.loadFilter(this.filterStorageKey);
        if (this.filterNameList) {
            this.filterNameList.forEach(function (x) {
                _this.clearFilter(x);
            });
            this.clearFilter(this.filterStorageKey);
        }
    };
    FilterService.prototype.toggleFilter = function (isShown) {
        this.isFilterShown.next(isShown);
    };
    FilterService.prototype.getFilterShown = function () {
        return this.isFilterShown.asObservable();
    };
    FilterService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], FilterService);
    return FilterService;
}());
export { FilterService };
//# sourceMappingURL=filter.service.js.map