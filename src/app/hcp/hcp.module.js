import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HcpService } from './hcp.service';
import { HcpOrderListComponent } from './hcp-order-list/hcp-order-list.component';
import { HcpOrderListFilterComponent } from './hcp-order-list-filter/hcp-order-list-filter.component';
import { HcpOrderDataTableComponent } from './hcp-order-list/order-data-table/hcp-order-table.component';
import { MyDatePickerModule } from 'mydatepicker';
import { HcpDialogComponent } from './hcp-order-list/hcp-dialog/hcp-dialog.component';
import { RecipeintDialogComponent } from './hcp-order-list/recipeint-dialog/recipeint-dialog.component';
var HcpModule = /** @class */ (function () {
    function HcpModule() {
    }
    HcpModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                MyDatePickerModule
            ],
            providers: [
                HcpService
            ],
            declarations: [
                HcpOrderListComponent,
                HcpOrderListFilterComponent,
                HcpOrderDataTableComponent,
                HcpDialogComponent,
                RecipeintDialogComponent
            ],
            exports: [
                HcpOrderListComponent
            ],
            entryComponents: [HcpDialogComponent, RecipeintDialogComponent],
        })
    ], HcpModule);
    return HcpModule;
}());
export { HcpModule };
//# sourceMappingURL=hcp.module.js.map