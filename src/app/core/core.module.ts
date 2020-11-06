
import { filter } from 'rxjs/operators';
import { NgModule, EventEmitter, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppInsightsModule, AppInsightsService } from 'ng2-appinsights';

import { Permissions } from '../../generated/permission-set';
import { ServiceClient, API_BASE_URL } from '../../generated/service-client';

import { CacheModule, CacheService } from '../cache';
import { TenantModule, TenantService } from '../tenant';
import { ValidationModule } from '../validation';
import { EnvModule, EnvService } from '../env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassificationService } from './classification.service';
import { TranslationHelperService } from './translation-helper.service';
import { FilterService } from './filter.service';
import { MapperService } from './mapper.service';
import { NotificationService } from './notification.service';
import { HelpersService } from './helpers.service';
import { ClientService } from './client.service';
import { ReferenceDataService } from './reference-data.service';
import { TimerService } from '../shared/services/timer.service';
import { DatePipe } from '@angular/common';
import { ApplicationInsightsService } from './applications-insights.service';
import { AuthenticationGuard } from '../routing/authentication.guard';

export class ExternalLoginConfig {
  clientId: string;
  issuer: string;
  redirectUri: string;
}

export function baseUrlFactory(envService: EnvService): string {
  return envService.get().webApiUrl;
}

export function serviceClientFactory(http: HttpClient, envService: EnvService): ServiceClient {
  return new ServiceClient(http, envService.get().webApiUrl);
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    LocalStorageModule.withConfig({ prefix: 'clientportal', storageType: 'localStorage' }),
    NgbModule,
    AppInsightsModule,
    ValidationModule,
    CacheModule,
    TenantModule,
  ],
  providers: [
    FilterService,
    {
      provide: API_BASE_URL,
      useFactory: baseUrlFactory,
      deps: [EnvService],
      
    },
    {
      provide: ServiceClient,
      useFactory: serviceClientFactory,
      deps: [HttpClient, EnvService]
    },
    ClassificationService,
    TranslationHelperService,
    MapperService,
    NotificationService,
    TranslationHelperService,
    HelpersService,
    FilterService,
    ClientService,
    ClassificationService,
    ReferenceDataService,
    TimerService,
    DatePipe,
    ApplicationInsightsService,
    AuthenticationGuard
  ]
})
export class CoreModule {

  constructor(private router: Router,
    private envService: EnvService) {
    // sets the app version
    $('html').attr('data-version', this.envService.get().appVersion);

    //    // setup appinsights
    //    if (envService.get().enableAppInsights) {
    //      appinsightsService.Init({
    //        instrumentationKey: envService.get().appInsightsInstrumentationKey
    //      });
    //    }
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Scroll to top on route change
        window.scrollTo(0, 0);
      });
  }
}
