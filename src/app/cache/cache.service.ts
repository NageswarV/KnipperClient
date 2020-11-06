import { Injectable, Inject, InjectionToken, OnDestroy } from '@angular/core';

import { BehaviorSubject, Scheduler, Subscription, Observable, forkJoin, AsyncSubject } from 'rxjs';

import { ServiceClient, Country, ClassificationValue, TenantInfoDto, State } from '../../generated/service-client';
import { EnvService } from '../env';

@Injectable()
export class CacheService implements OnDestroy {
  tenantInfoCache: TenantInfoDto;
  countryCache: Country[];
  classificationCache: ClassificationValue[];
  stateCache: State[];
  classificationByCode:ClassificationValue[]
  cacheReady: AsyncSubject<boolean> = new AsyncSubject();

  loadData(): Promise<any> {
    var data = forkJoin(this.serviceClient.getDefaultProgram("en"), this.serviceClient.getClassificationValues(), this.serviceClient.getCountries(), this.serviceClient.getStates() )
    return data.do(([tenantData, classificationCache, countriesData, statesData]) => {
      this.tenantInfoCache = tenantData;
      this.classificationCache = classificationCache;
      this.countryCache = countriesData;
      this.stateCache = statesData;
      // ,this.serviceClient.getClassificationValuesByTypeCode('code'),classificationByCode
      // this.classificationByCode=classificationByCode;
      
      this.cacheReady.next(true);
      this.cacheReady.complete();
    }).toPromise();
  }

  loadTenantData(): Promise<any> {
    var data = forkJoin(this.serviceClient.getCountries());
    return data.do(([countryCache]) => {
      this.countryCache = countryCache;
    }).toPromise();
  }

  constructor(
    private envService: EnvService,
    private serviceClient: ServiceClient
  ) { }

  get tenantInfo(): TenantInfoDto {
    return this.tenantInfoCache;
  }

  get countries(): Country[] {
    return this.countryCache;
  }
  

  get classificationValues(): ClassificationValue[] {
    return this.classificationCache;
  }
  // get getClassificationValuesByType(){
  //   return this.classificationByCode;
  // }
  GetClassificationValuesByTypeCode(code){
    return this.serviceClient.getClassificationValuesByTypeCode(code);
  }

  clearCache(): void {
  }

  ngOnDestroy(): void {
  }
}
