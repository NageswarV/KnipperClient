import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CustomDatePipe } from '../shared/pipes/custom-date.pipe';
import { ProductService } from './product.service';
import { ProductComponent } from './product.component';
import { ProductsFilterComponent } from './products-filter/products-filter.component';
import { ProductsInventoryComponent } from './products-inventory/products-inventory.component';
import { ProductsDataTableComponent } from './products-inventory/product-data-table/product-data-table.component';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
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
    exports: [
    ]
})
export class ProductModule { }
