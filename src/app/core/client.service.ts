import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Tenant, TenantDto, TenantDetailsDto, SimpleTenantDto } from '../shared/service-clients/tenant';
import { FilterService } from '../core/filter.service';
import { ClassificationValues } from '../common/classification-value';
import { BehaviorSubject } from 'rxjs';

// Also known as the Tenant Service
@Injectable()
export class ClientService {
  private clientIdStorageKey = 'samplicity-dtp-current-client';
  private clientIdChangeKey = 'samplicity-dtp-changed-client';

  constructor(
    private tenantClient: Tenant,
    private router: Router,
    private filterService: FilterService,
    private route: ActivatedRoute
  ) { }

  private notificationQueryStrings: Array<string> = [
    '?activated=',
    '?discarded=',
    '?created='
  ];

  private _selectedClientId: BehaviorSubject<string> = new BehaviorSubject(null);
  private _isClientActive: BehaviorSubject<boolean> = new BehaviorSubject(null);

  get selectedClientIdAsync(): Observable<string> {
      return this._selectedClientId.asObservable();
  }

  get isCurrentClientActiveAsync(): Observable<boolean> {
    return this._isClientActive.asObservable();
  }

  get isClientActive(): boolean {
    return this._isClientActive.value;
  }

  setSelectedClientId(id: string): void {
      this._selectedClientId.next(id);
  }

  setIsCurrentClientActive(isActive: boolean): void {
    this._isClientActive.next(isActive);
  }

  getClientId(): number {
    const item = sessionStorage.getItem(this.clientIdStorageKey);
    this.setSelectedClientId(item);
    return Number(item);
  }

  setClientChange(): void {
    localStorage.setItem(this.clientIdChangeKey, JSON.stringify(true));
  }

  getSimpleClients(tenantIds, getAllTenants): Observable<SimpleTenantDto[]> {
    return this.tenantClient.getSimpleTenants(tenantIds, getAllTenants).map((x) => {
      return x.result;
    }, (e: any) => {
      console.log(e);
    });
  }

  getActiveClients(includeActiveOnly = true): Observable<SimpleTenantDto[]> {
    return this.tenantClient.getActiveSimpleTenants(includeActiveOnly).map((x) => {
      return x.result;
    }, (e: any) => {
      console.log(e);
    });
  }

  getCurrentClient(): Observable<TenantDto> {
    const clientId = this.getClientId();
    return this.getClientById(clientId);
  }

  isCurrentClientActive(client: TenantDto): boolean {
    if (client.tenantModules.length === 1) {
      const status = client.tenantModules[0].tenantModuleStatusClassificationValueId;
      const isActive = (status === ClassificationValues.TENANT_MODULE_STATUS_ACTIVE);

      return isActive;
    } else {
      return false;
    }
  }

  isCurrentClientActiveOrNew(client: TenantDto): boolean {
    if (client.tenantModules.length === 1) {
      const status = client.tenantModules[0].tenantModuleStatusClassificationValueId;
      return status === ClassificationValues.TENANT_MODULE_STATUS_ACTIVE
      || status === ClassificationValues.TENANT_MODULE_STATUS_NEW;
    } else {
      return false;
    }
  }

  private getClientById(clientId: number): Observable<TenantDto>{
    return this.tenantClient.getTenantInfoById(clientId).map(x => {
      return x.result;
    }, (e: any) => {
      console.log(e);
    });
  }
  getCurrentClientDetails(): Observable<TenantDetailsDto> {
    const clientId = this.getClientId();
    return this.getClientDetailsById(clientId);
  }

  private getClientDetailsById(clientId: number): Observable<TenantDetailsDto> {
    if (clientId === 0) {
      return Observable.of(null);
    }
    return this.tenantClient.getTenantDetails(clientId).map(x => {
      return x.result;
    }, (e: any) => {
      console.log(e);
    });
  }

  setClientId(clientId) {
    this.setSelectedClientId(clientId);
    sessionStorage.setItem(this.clientIdStorageKey, clientId);
  }

  clearClientId() {
    sessionStorage.removeItem(this.clientIdStorageKey);
    this.setSelectedClientId(null);
  }

  changeClient(clientId) {
    const currentClientId = this.getClientId();
    if (currentClientId !== Number(clientId)) {
      this.setClientId(clientId);

      let redirectUrl = this.router.url;
      let urlSegments = redirectUrl.split('/');
      urlSegments[1] = this.getClientId().toString();
      redirectUrl = urlSegments.join('/');

      for (const nqs of this.notificationQueryStrings) {
        const i = redirectUrl.indexOf(nqs);
        if (i >= 0) {
          redirectUrl = redirectUrl.substring(0, i);
        }
      }

      this.filterService.clearAllFilter();
      this.router.navigate([redirectUrl])
        .then(() => {
          this.setClientChange();
          location.reload();
        });
    }
  }

  deactivateClientForDtp(clientId: number): Observable<TenantDetailsDto>{
    return this.tenantClient.deactivateTenantForDtp(clientId).map(x => {
      return x.result;
    });
  }
}

export class Item {
  value: any;
  label: string;

  constructor(value, label) {
    this.value = value;
    this.label = label;
  }
}
