import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../routing/authentication.guard';
import { DtpOrderDetailsComponent } from '../shared/components/dtp-order-details/dtp-order-details.component';
import { HCPSalesRepComponent } from './order-detail/hcp-sales-rep/hcp-sales-rep.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
var routes = [
    {
        path: '',
        component: OrderDetailComponent,
        canActivate: [AuthenticationGuard],
        children: [
            {
                path: 'orderdetail',
                component: DtpOrderDetailsComponent,
                canActivate: [AuthenticationGuard]
            },
            {
                path: 'hcpandsalesrep',
                component: HCPSalesRepComponent,
                canActivate: [AuthenticationGuard]
            }
        ]
    }
];
var OrderDetailRoutingModule = /** @class */ (function () {
    function OrderDetailRoutingModule() {
    }
    OrderDetailRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)]
        })
    ], OrderDetailRoutingModule);
    return OrderDetailRoutingModule;
}());
export { OrderDetailRoutingModule };
//# sourceMappingURL=order-routing.module.js.map