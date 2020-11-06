import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
var SearchByRepComponent = /** @class */ (function () {
    function SearchByRepComponent() {
        this.searchName = new EventEmitter();
    }
    SearchByRepComponent.prototype.ngOnInit = function () {
    };
    SearchByRepComponent.prototype.back = function () {
        this.searchName.emit('');
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SearchByRepComponent.prototype, "searchName", void 0);
    SearchByRepComponent = __decorate([
        Component({
            selector: 'sg-search-by-rep',
            templateUrl: './search-by-rep.component.html',
            styleUrls: ['../../home.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], SearchByRepComponent);
    return SearchByRepComponent;
}());
export { SearchByRepComponent };
//# sourceMappingURL=search-by-rep.component.js.map