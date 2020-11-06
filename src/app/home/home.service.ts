
import { map, tap } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TenantInfoDto, Announcement, ServiceClient } from '../../generated/service-client';
import { AuthenticationService } from '../authentication';

@Injectable()
export class HomeService implements OnDestroy {

    constructor(
        private authenticationService: AuthenticationService,
        private serviceClient: ServiceClient
    ) { }

    ngOnDestroy(): void {
    }

    GetActiveAnnouncements(): Observable<Announcement[]> {
        return this.serviceClient.getctiveAnnouncements();
    }
}
