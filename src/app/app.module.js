import { __decorate, __metadata } from "tslib";
import { NgModule, ErrorHandler, isDevMode, APP_INITIALIZER } from '@angular/core';
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
import { HttpClientModule } from '@angular/common/http';
import { RequestCache } from './cache/requestcache.service';
import { CacheService } from './cache';
import { L10nLoader, TranslationModule, TranslationService } from 'angular-l10n';
import { NgBusyModule } from 'ng-busy';
import { CustomBusyComponent } from './shared/busy.component';
import { busyConfig } from './shared/busy-spinner-config';
import { DatePipe } from '@angular/common';
import { ClassificationService } from './core/classification.service';
import { AuthenticationModule } from './authentication';
import { HomeModule } from './home';
import { ProductModule } from './product';
import { RepModule } from './rep';
import { ReportModule } from './report';
import { HcpModule } from './hcp';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { DashboardDetailComponent } from './dashboard/dashboard/dashboard-detail.component';
import { UtilityService } from './shared/utility.service';
import { TasksModule } from './tasks/tasks.module';
var AppErrorHandler = /** @class */ (function () {
    function AppErrorHandler(notifyService, envService, appinsightsService) {
        this.notifyService = notifyService;
        this.envService = envService;
        this.appinsightsService = appinsightsService;
    }
    AppErrorHandler.prototype.handleError = function (error) {
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
    };
    return AppErrorHandler;
}());
export { AppErrorHandler };
export function appErrorHandlerFactory(notifyService, initConfigurationService, appinsightsService) {
    return new AppErrorHandler(notifyService, initConfigurationService, appinsightsService);
}
var AppModule = /** @class */ (function () {
    function AppModule(translation, cacheService, l10nLoader, classificationService) {
        var _this = this;
        this.translation = translation;
        this.cacheService = cacheService;
        this.l10nLoader = l10nLoader;
        this.classificationService = classificationService;
        this.cacheService.cacheReady.subscribe(function (x) {
            _this.classificationService.load();
        });
    }
    AppModule = __decorate([
        NgModule({
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
                    useFactory: function (cacheService) {
                        return function () { return cacheService.loadData(); };
                    },
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
                DashboardDetailComponent
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
        }),
        __metadata("design:paramtypes", [TranslationService,
            CacheService,
            L10nLoader,
            ClassificationService])
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map