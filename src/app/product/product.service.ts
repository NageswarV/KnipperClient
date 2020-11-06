
import {map, tap} from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ServiceClient, Product, Communication } from '../../generated/service-client';

@Injectable()
export class ProductService implements OnDestroy {

    constructor(
        private serviceClient: ServiceClient
    ) {

    }
    
    ngOnDestroy(): void {
    }

    GetProductsByInventory(): Observable<Product[]>{
        return this.serviceClient.getProductsByInventory();
    }

    GetProductForViewByOrder(): Observable<Product[]> {
        return this.serviceClient.getProductsIncludingDtpOrders();
    }

    GetRelatedDtrOrdersByProductId(id) {
        return this.serviceClient.getRelatedDtrOrdersByProductId(id);
    }
    
    GetRelatedDtpOrdersByProductId(id) {
        return this.serviceClient.getRelatedDtpOrdersByProductId(id);
    }
    GetRelatedHandCarryTransactionsByProductId(id : string){
        return this.serviceClient.getRelatedHandCarryTransactionsByProductId(id);
    }
    GetCommunicationsyOrderId(id):Observable<Communication[]> {
        return this.serviceClient.getCommunicationsyOrderId(id);
    }
}
