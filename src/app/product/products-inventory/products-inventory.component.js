import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { BusySpinner } from '../../common/busy-spinner';
import { ProductFilterCriteria } from '../product.model';
var ProductsInventoryComponent = /** @class */ (function (_super) {
    __extends(ProductsInventoryComponent, _super);
    function ProductsInventoryComponent(productService) {
        var _this = _super.call(this) || this;
        _this.productService = productService;
        _this.byInventory = true;
        _this.lotPageSize = 10;
        _this.pageSize = 3;
        _this.currentPageInventory = 1;
        _this.currentPagebyOrder = 1;
        _this.columns = [
            { title: 'Lot #', classes: 'col-xs-2' },
            { title: 'Lot # Expiration Date', classes: 'col-xs-2' },
            { title: 'Last Use Date', classes: 'col-xs-2' },
            { title: 'Available Quantity', classes: 'col-xs-2' },
            { title: 'Marked Quantity', classes: 'col-xs-2' },
            { title: 'Unavailable Quantity', classes: 'col-xs-2' }
        ];
        _this.componentId = performance.now().toString();
        return _this;
    }
    ProductsInventoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setBusySpinner(this.productService.GetProductsByInventory(), 'byOrder').subscribe(function (x) {
            _this.productsByInventory = x;
            _this.allInventoryProducts = x;
            _this.totalRecordCount = _this.productsByInventory.length;
            _this.productsPerPage = _this.productsByInventory.slice(0, _this.pageSize);
        });
        this.setBusySpinner(this.productService.GetProductForViewByOrder()).subscribe(function (x) {
            _this.viewByOrderProducts = x;
            _this.allOrderProducts = x;
        });
    };
    ProductsInventoryComponent.prototype.viewByOrder = function () {
        if (this.byInventory) {
            this.byInventory = !this.byInventory;
        }
        this.totalRecordCount = this.viewByOrderProducts.length;
        this.productsPerPage = this.viewByOrderProducts.slice(0, this.pageSize);
    };
    ProductsInventoryComponent.prototype.viewByInventory = function () {
        if (!this.byInventory) {
            this.byInventory = !this.byInventory;
        }
        this.totalRecordCount = this.productsByInventory.length;
        this.productsPerPage = this.productsByInventory.slice(0, this.pageSize);
    };
    ProductsInventoryComponent.prototype.pageChange = function (pageNumber) {
        //--------------------
        //   this.currentPage = pageNumber;
        //   if(this.byInventory)
        //     this.productsPerPage = this.productsByInventory.slice(this.currentPage == 1 ? 0 : (this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
        //   else 
        //     this.productsPerPage = this.viewByOrderProducts.slice(this.currentPage == 1 ? 0 : (this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
        if (this.byInventory) {
            this.currentPageInventory = pageNumber;
            this.productsPerPage = this.productsByInventory.slice(this.currentPageInventory == 1 ? 0 : (this.currentPageInventory - 1) * this.pageSize, this.currentPageInventory * this.pageSize);
        }
        else {
            this.currentPagebyOrder = pageNumber;
            var remainingItemsCount = this.totalRecordCount - ((this.currentPagebyOrder - 1) * this.pageSize);
            var itemsToLoad = remainingItemsCount > this.pageSize ? this.pageSize : remainingItemsCount;
            this.productsPerPage = this.viewByOrderProducts.slice((this.currentPagebyOrder - 1) * this.pageSize, itemsToLoad + (this.currentPagebyOrder - 1) * this.pageSize);
        }
    };
    ProductsInventoryComponent.prototype.ngOnChanges = function () {
        var _this = this;
        console.log(this.productsFilter);
        if ((this.productsFilter.productName) === '') {
            this.productsByInventory = this.allInventoryProducts;
            this.viewByOrderProducts = this.allOrderProducts;
        }
        else {
            var filteredProducts = this.allInventoryProducts.filter(function (event) {
                return (event.name).toUpperCase() == (_this.productsFilter.productName).toUpperCase();
            });
            this.productsByInventory = filteredProducts;
            //view by order
            this.viewByOrderProducts = this.allOrderProducts.filter(function (event) {
                return (event.name).toUpperCase() == (_this.productsFilter.productName).toUpperCase();
            });
        }
        if (this.byInventory && this.productsByInventory) {
            this.totalRecordCount = this.productsByInventory.length;
            this.currentPageInventory = 1;
            this.productsPerPage = this.productsByInventory.slice(0, this.pageSize);
        }
        if ((!this.byInventory) && this.viewByOrderProducts) {
            this.totalRecordCount = this.viewByOrderProducts.length;
            this.currentPagebyOrder = 1;
            this.productsPerPage = this.viewByOrderProducts.slice(0, this.pageSize);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", ProductFilterCriteria)
    ], ProductsInventoryComponent.prototype, "productsFilter", void 0);
    ProductsInventoryComponent = __decorate([
        Component({
            selector: 'app-products-inventory',
            templateUrl: './products-inventory.component.html',
            styleUrls: ['./products-inventory.component.scss']
        }),
        __metadata("design:paramtypes", [ProductService])
    ], ProductsInventoryComponent);
    return ProductsInventoryComponent;
}(BusySpinner));
export { ProductsInventoryComponent };
//# sourceMappingURL=products-inventory.component.js.map