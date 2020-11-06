import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ProductFilterCriteria } from './product.model';
var ProductComponent = /** @class */ (function () {
    function ProductComponent() {
    }
    ProductComponent.prototype.ngOnInit = function () {
        this.isCollapsed = false;
        this.initFilter();
    };
    ProductComponent.prototype.onCollapse = function () {
        this.isCollapsed = !this.isCollapsed;
    };
    ProductComponent.prototype.initFilter = function () {
        this.productsFilter = new ProductFilterCriteria();
        this.productsFilter.productName = '';
    };
    ProductComponent.prototype.applyFilter = function (filter) {
        this.productsFilter = filter;
    };
    ProductComponent = __decorate([
        Component({
            selector: 'app-product',
            templateUrl: './product.component.html',
            styleUrls: ['./product.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], ProductComponent);
    return ProductComponent;
}());
export { ProductComponent };
//# sourceMappingURL=product.component.js.map