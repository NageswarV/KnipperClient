import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
var SearchByProductComponent = /** @class */ (function () {
    function SearchByProductComponent() {
        this.searchName = new EventEmitter();
    }
    SearchByProductComponent.prototype.ngOnInit = function () {
    };
    SearchByProductComponent.prototype.back = function () {
        this.searchName.emit('');
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SearchByProductComponent.prototype, "searchName", void 0);
    SearchByProductComponent = __decorate([
        Component({
            selector: 'sg-search-by-product',
            templateUrl: './search-by-product.component.html',
            styleUrls: ['../../home.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], SearchByProductComponent);
    return SearchByProductComponent;
}());
export { SearchByProductComponent };
//# sourceMappingURL=search-by-product.component.js.map