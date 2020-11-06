import { NgModule, ErrorHandler, Component, isDevMode, APP_INITIALIZER, Inject, Injectable } from '@angular/core';
import { AppInsightsService } from 'ng2-appinsights';
import { EnvModule, EnvService } from './env';
import { CoreModule } from './core';
import { NavigationModule } from './navigation';
import { RoutingModule } from './routing';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './common';
import { NotifyService } from './shared/notify.service';
import { l10nLangConfig } from './shared/l10n-config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RequestCache } from './cache/requestcache.service';
import { CacheService } from './cache';
import { LocalizationModule, L10nLoader, Localization, TranslationProvider, TranslationModule, TranslationService } from 'angular-l10n';
import { Observable, ReplaySubject } from 'rxjs';
import { ServiceClient } from '../generated/service-client';
import { NgBusyModule, BusyConfig } from 'ng-busy';
import { CustomBusyComponent } from './shared/busy.component';
import { busyConfig } from './shared/busy-spinner-config';
import { DatePipe, CommonModule } from '@angular/common';
import { ClassificationService } from './core/classification.service';
import { AuthenticationModule } from './authentication';
import { HomeModule } from './home';
import { ProductModule } from './product';
import { RepModule } from './rep';
import { ReportModule } from './report';
import { HcpModule } from './hcp';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { DashboardDetailComponent } from './dashboard/dashboard/dashboard-detail.component';
import { NotificationComponent } from './shared';
import { UtilityService } from './shared/utility.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { TasksModule } from './tasks/tasks.module';
import { SafeandsecureComponent } from './safeandsecure/safeandsecure/safeandsecure.component';

export class AppErrorHandler implements ErrorHandler {
  constructor(
    private notifyService: NotifyService,
    private envService: EnvService,
    private appinsightsService: AppInsightsService
  ) { }

  handleError(error) {
    if (error.rejection && error.rejection.isApiException && error.rejection.status == 403) {
      return;
    }
    else {
      if (isDevMode()) {
        console.log(error);
      }

      if (this.envService.get().enableAppInsights) {
        this.appinsightsService.trackException(error, 'unhandled', null, null, 3);
      }

      if (error.status == 500 && JSON.parse(error.response).error.code == 500) {
        this.notifyService.error({
            title: 'hcpportal-system-errormessage',
            text: 'hcpportal-system-contactsupport'
        });
      }
    }
  }
}

export function appErrorHandlerFactory(
  notifyService: NotifyService,
  initConfigurationService: EnvService,
  appinsightsService: AppInsightsService
) {
  return new AppErrorHandler(notifyService, initConfigurationService, appinsightsService);
}

@NgModule({
  imports: [
    EnvModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    NavigationModule,
    RoutingModule,
    TranslationModule.forRoot(l10nLangConfig),
    AuthenticationModule,
    HomeModule,
    NgBusyModule.forRoot(busyConfig),
    ProductModule,
    RepModule,
    ReportModule,
    HcpModule,
    DashboardRoutingModule,
    TasksModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useFactory: appErrorHandlerFactory,
      deps: [NotifyService, EnvService, AppInsightsService]
    },
    CacheService,
    {
      provide: APP_INITIALIZER,
      useFactory: (cacheService: CacheService) =>
        () => cacheService.loadData(),
      deps: [CacheService],
      multi: true
    },
    RequestCache,
    DatePipe,
    NotifyService,
    UtilityService
  ],
  declarations: [
    AppComponent,
    FooterComponent,
    CustomBusyComponent,
    DashboardDetailComponent,
    SafeandsecureComponent
  ],
  exports: [
    HttpClientModule,
    CoreModule,
    SharedModule,
    RoutingModule,
  ],
  entryComponents: [
    CustomBusyComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(
    public translation: TranslationService,
    public cacheService: CacheService,
    public l10nLoader: L10nLoader,
    public classificationService: ClassificationService
  ) {
    this.cacheService.cacheReady.subscribe(x => {
      this.classificationService.load();
    });
  }
}
