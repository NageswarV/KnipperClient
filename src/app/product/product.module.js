import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProductService } from './product.service';
import { ProductComponent } from './product.component';
import { ProductsFilterComponent } from './products-filter/products-filter.component';
import { ProductsInventoryComponent } from './products-inventory/products-inventory.component';
import { ProductsDataTableComponent } from './products-inventory/product-data-table/product-data-table.component';
import { MyDatePickerModule } from 'mydatepicker';
var ProductModule = /** @class */ (function () {
    function ProductModule() {
    }
    ProductModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                CommonModule,
                MyDatePickerModule
            ],
            providers: [
                ProductService
            ],
            declarations: [
                ProductComponent,
                ProductsInventoryComponent,
                ProductsFilterComponent,
                ProductsDataTableComponent
            ],
            exports: []
        })
    ], ProductModule);
    return ProductModule;
}());
export { ProductModule };
//# sourceMappingURL=product.module.js.map