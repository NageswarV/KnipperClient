import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../core/can-deactivate.guard';
import { SamplicityPermission } from '../common/permissions';
import { DashboardDetailComponent } from './dashboard/dashboard-detail.component';
var routes = [
    {
        path: '',
        component: DashboardDetailComponent,
        canDeactivate: [CanDeactivateGuard],
        data: {
            permissions: [SamplicityPermission.Dashboard.DashboardView]
        }
    }
];
var DashboardRoutingModule = /** @class */ (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)]
        })
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());
export { DashboardRoutingModule };
//# sourceMappingURL=dashboard-routing.module.js.map