
import { reduce, mergeMap, map, tap } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Subject, BehaviorSubject, Observable, AsyncSubject } from 'rxjs';
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';

import { ServiceClient, TenantInfoDto } from '../../generated/service-client';
import { CacheService } from '../cache/cache.service';
import { EnvService } from '../env/env.service';

@Injectable()
export class TenantService {
  private abpTenantHeaderName = 'Abp.TenantId';
  private abpLocalizationHeaderName = 'Abp.Localization.CultureName';
  constructor(
    private envService: EnvService,
    private cacheService: CacheService,
    private serviceClient: ServiceClient
  ) { }

  get tenantHeaderName(): string {
    return this.abpTenantHeaderName;
  }

  get currentTenantId(): string {
    if (this.tenantInfo) {
      return this.tenantInfo.id.toString();
    }
    else {
      return undefined;
    }

  }

  getProgramByUrl(url: string, culture: string): Observable<TenantInfoDto> {
    return this.serviceClient.getDefaultProgram(culture).pipe(map(x => x));
  }

  get currentTenantAllocationUrl(): string {
    return "";
  }

  get currentTenantName(): string {
    return this.tenantInfo.tenancyName;
  }

  get maintenanceMode(): boolean {
    return this.tenantInfo.inMaintenance;
  }

  get isCacheReady(): AsyncSubject<boolean> {
    return this.cacheService.cacheReady;
  }

  
  private get tenantInfo(): TenantInfoDto {
    return this.cacheService.tenantInfo;
  }
  public clearTenantData(): void {
    this.cacheService.clearCache();
  }
}
