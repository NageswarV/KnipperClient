import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardDetailComponent } from './dashboard/dashboard-detail.component';
import { ChartsModule } from 'ng2-charts';
import { SamplicityChartComponent } from './components/chart/samplicity-chart.component';
import { OrderListModalComponent } from './dashboard/order-list-modal/order-list-modal.component';
import { ClientService } from '../core/client.service';
import { dashboardService } from './dashboard/dashboard-service';
var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                SharedModule,
                ChartsModule,
                DashboardRoutingModule,
                MatDialogModule,
            ],
            declarations: [
                SamplicityChartComponent,
                DashboardDetailComponent,
                OrderListModalComponent,
            ],
            exports: [
                SamplicityChartComponent,
                DashboardRoutingModule,
                OrderListModalComponent,
            ],
            entryComponents: [OrderListModalComponent],
            providers: [
                ClientService,
                dashboardService
            ]
        })
    ], DashboardModule);
    return DashboardModule;
}());
export { DashboardModule };
//# sourceMappingURL=dashboard.module.js.map