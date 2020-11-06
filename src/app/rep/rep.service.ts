
import { map, tap } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DtrOrder, Rep, RepTerritory, ServiceClient, HandCarryInventory, Communication, Address, HandCarrySignatureAudit, HandCarryReconciliation, Reconciliation, RepSignatureAudit } from '../../generated/service-client';

@Injectable()
export class RepService implements OnDestroy {
    getReconciliations(): Observable<Reconciliation[]> {
      return this.serviceClient.getReconciliations();
    }

    constructor(
        private serviceClient: ServiceClient
    ) {

    }
    ngOnDestroy(): void {
    }

    GetCommunicationsyOrderId(id): Observable<Communication[]> {
        return this.serviceClient.getCommunicationsyOrderId(id);
    }

    GetRepPushShipments(): Observable<Rep[]> {
        return this.serviceClient.getRepsIncludingPushShipments();
    }

    GetRepsIncludingDtpOrders(): Observable<Rep[]> {
        return this.serviceClient.getRepsIncludingDtpOrders();
    }

    GetDtrOrdersByRepId(repId: string): Observable<DtrOrder[]> {
        return this.serviceClient.getDtrOrdersByRepId(repId);
    }

    GetRepTerritoryHistory(repId: string): Observable<RepTerritory[]> {
        return this.serviceClient.getRepTerritoryHistory(repId);
    }
    GetHandCarryTransactionsByRep(repId: string): Observable<DtrOrder[]> {
        return this.serviceClient.getHandCarryTransactionsByRep(repId);
    }

    GetHandCarryInventoriesByRep(repId: string): Observable<HandCarryInventory[]> {
        return this.serviceClient.getHandCarryInventoriesByRep(repId);
    }

    GetAdressByUser(repId: string): Observable<Address[]> {
        return this.serviceClient.getAddressesByUser(repId);
    }

    GetHandCarrySignatureAuditsByRep(): Observable<RepSignatureAudit[]> {
        return this.serviceClient.getRepSignatureAudits();
    }
    GetHandCarryReconciliationsByRep(repId: string): Observable<HandCarryReconciliation[]> {
        return this.serviceClient.getHandCarryReconciliationsByRep(repId);
    }
}
