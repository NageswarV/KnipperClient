import { __decorate, __metadata } from "tslib";
import { filter } from 'rxjs/operators';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppInsightsModule } from 'ng2-appinsights';
import { ServiceClient, API_BASE_URL } from '../../generated/service-client';
import { CacheModule } from '../cache';
import { TenantModule } from '../tenant';
import { ValidationModule } from '../validation';
import { EnvService } from '../env';
import { HttpClient } from '@angular/common/http';
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
var ExternalLoginConfig = /** @class */ (function () {
    function ExternalLoginConfig() {
    }
    return ExternalLoginConfig;
}());
export { ExternalLoginConfig };
export function baseUrlFactory(envService) {
    return envService.get().webApiUrl;
}
export function serviceClientFactory(http, envService) {
    return new ServiceClient(http, envService.get().webApiUrl);
}
var CoreModule = /** @class */ (function () {
    function CoreModule(router, envService) {
        this.router = router;
        this.envService = envService;
        // sets the app version
        $('html').attr('data-version', this.envService.get().appVersion);
        //    // setup appinsights
        //    if (envService.get().enableAppInsights) {
        //      appinsightsService.Init({
        //        instrumentationKey: envService.get().appInsightsInstrumentationKey
        //      });
        //    }
        this.router.events.pipe(filter(function (event) { return event instanceof NavigationEnd; }))
            .subscribe(function (event) {
            // Scroll to top on route change
            window.scrollTo(0, 0);
        });
    }
    CoreModule = __decorate([
        NgModule({
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
        }),
        __metadata("design:paramtypes", [Router,
            EnvService])
    ], CoreModule);
    return CoreModule;
}());
export { CoreModule };
//# sourceMappingURL=core.module.js.map