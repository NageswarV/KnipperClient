
import {map, tap} from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AocReportDto, InventoryShippedByItemReportDto, Report, ReportDefinition, ServiceClient } from '../../generated/service-client';

@Injectable()
export class ReportService implements OnDestroy {

    constructor(
        private serviceClient: ServiceClient
    ) {

    }
    
    ngOnDestroy(): void {
    }

    GetReportDefinitions(): Observable<ReportDefinition[]>{
        return this.serviceClient.getReportDefinitions();
    }
    
    GetGeneratedReports(): Observable<Report[]>{
        return this.serviceClient.getGeneratedReports();
    }
    getInventoryShippedByItemReport(): Observable<InventoryShippedByItemReportDto[]>{
        return this.serviceClient.getInventoryShippedByItemReportData();
    }
    getAOCReportDetails():Observable<AocReportDto[]>{
        return this.serviceClient.getPendingAocs();
    }
}
