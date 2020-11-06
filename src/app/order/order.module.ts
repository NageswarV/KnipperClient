import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OrderDetailRoutingModule } from './order-routing.module';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { HCPSalesRepComponent } from './order-detail/hcp-sales-rep/hcp-sales-rep.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        OrderDetailRoutingModule
    ],
    declarations: [
        OrderDetailComponent,
        HCPSalesRepComponent
    ],
    providers: [

    ],
    exports: [
        OrderDetailRoutingModule
    ]
})
export class OrderModule {
    constructor() { }
}
