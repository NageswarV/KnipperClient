import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ClientService } from '../../../../core/client.service';
import { SecurityService } from '../../../../core/security.service';
import { SimpleTenantDto } from '../../../../shared/service-clients/tenant';
import { UserAccessDto } from '../../../../shared/service-clients/security';
import { Observable } from 'rxjs';

@Component({
  selector: 'samplicity-client-select',
  templateUrl: './client-select.component.html',
  styleUrls: ['./client-select.component.scss']
})
export class ClientSelectComponent implements OnInit, OnDestroy {

  routerEventsSub: Subscription;
  clientParamSub: Subscription;
  private securityServiceUserAccessSub: Subscription;

  clients: SimpleTenantDto[] = [];
  isShowing = false;

  // Admin Routes
  adminRoutes: string[] = [
    '/error',
    '/admin/roles',
    '/admin/users',
    '/admin/users/ad-users',
    '/admin/dataentryaudit'
  ];

  get selectedClientId(): Observable<string> {
    return this.clientService.selectedClientIdAsync
  };

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private securityService: SecurityService
  ) {
    this.securityServiceUserAccessSub = this.securityService.onUserAccessChange.subscribe({
      next: (userAccess: UserAccessDto) => {
        this.handleUserAccess(userAccess);
      }
    });
  }

  ngOnInit() {
    this.routerEventsSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.adminRoutes.findIndex(x => event.url.startsWith(x)) >= 0) {
          this.isShowing = false;
        } else {
          this.isShowing = true;
          this.securityService.userAccessSubject.subscribe((userAccess: any) => {
            this.handleUserAccess(userAccess);
          });
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.routerEventsSub) {
      this.routerEventsSub.unsubscribe();
    }
    if (this.securityServiceUserAccessSub) {
      this.securityServiceUserAccessSub.unsubscribe();
    }
  }

  onChange(event: any) {
    this.setClient(event.target.value);
  }

  setClient(clientId: number) {
    const client = this.lookupClient(clientId);
    this.clientService.changeClient(client.tenantId);
  }

  lookupClient(clientId: number): SimpleTenantDto {
    if (this.clients) {
      const client = this.clients.find(x => x.tenantId === Number(clientId));
      if (client) {
        return client;
      }
    }
    return null;
  }

  private SimpleTenantDtoSorter(a: SimpleTenantDto, b: SimpleTenantDto) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  private handleUserAccess(userAccess: UserAccessDto) {
    this.clientService.getSimpleClients(userAccess.tenants, userAccess.hasAllTenants).subscribe(tenants => {
      this.clients = tenants.sort(this.SimpleTenantDtoSorter);
    });
  }
}
