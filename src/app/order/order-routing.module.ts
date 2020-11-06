import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../routing/authentication.guard';
import { DtpOrderDetailsComponent } from '../shared/components/dtp-order-details/dtp-order-details.component';
import { HCPSalesRepComponent } from './order-detail/hcp-sales-rep/hcp-sales-rep.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';


const routes: Routes = [
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

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class OrderDetailRoutingModule { }
