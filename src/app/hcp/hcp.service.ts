
import { map, tap } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Address, Communication, DtrOrder, HandCarryDisbursement, HandCarrySignatureAudit, Rep, ServiceClient } from '../../generated/service-client';

@Injectable()
export class HcpService implements OnDestroy {

    constructor(
        private serviceClient: ServiceClient
    ) { }

    ngOnDestroy(): void {
    }

    GetCommunicationsyOrderId(id): Observable<Communication[]> {
        return this.serviceClient.getCommunicationsyOrderId(id);
    }

    GetHcpsIncludingDtpOrders(): Observable<Rep[]> {
        return this.serviceClient.getHcpsIncludingDtpOrders();
        // return this.serviceClient.getRepsIncludingDtpOrders();
    }

    GetDtrOrdersByHcpId(hcpId: string): Observable<DtrOrder[]> {
        return this.serviceClient.getDtrOrdersByHcpId(hcpId);
    }
    GetAdressByUser(userId: string ): Observable<Address[]>{
       return this.serviceClient.getAddressesByUser(userId);
           
    }
    GetHandCarryDisbursementsByHcp(hcpId: string): Observable<HandCarryDisbursement[]> {
        return this.serviceClient.getHandCarryDisbursementsByHcp(hcpId)
    }

    GetHandCarrySignatureAuditsByHcp(hcpId: string): Observable<HandCarrySignatureAudit[]> {
        return this.serviceClient.getHandCarrySignatureAuditsByHcp(hcpId)
    }
}
