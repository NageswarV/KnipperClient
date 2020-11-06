import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RepService } from './rep.service';
import { RepOrderListComponent } from './rep-order-list/rep-order-list.component';
import { RepOrderListFilterComponent } from './rep-order-list-filter/rep-order-list-filter.component';
import { RepTerritoryHistoryComponent } from './rep-territory-history/rep-territory-history.component';
import { RepComponent } from './rep/rep.component';
import { RepPushShipmentListComponent } from './rep-push-shipment-list/rep-push-shipment-list.component';
import { MyDatePickerModule } from 'mydatepicker';
var RepModule = /** @class */ (function () {
    function RepModule() {
    }
    RepModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                MyDatePickerModule
            ],
            entryComponents: [RepTerritoryHistoryComponent],
            providers: [
                RepService
            ],
            declarations: [
                RepOrderListComponent,
                RepOrderListFilterComponent,
                RepTerritoryHistoryComponent,
                RepComponent,
                RepPushShipmentListComponent
            ],
            exports: []
        })
    ], RepModule);
    return RepModule;
}());
export { RepModule };
//# sourceMappingURL=rep.module.js.map