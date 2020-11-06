import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ResolveEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
var ApplicationInsightsService = /** @class */ (function () {
    function ApplicationInsightsService(router) {
        var _this = this;
        this.router = router;
        this.environment = {
            production: false,
            appInsightsInstrumentationKey: '',
            aadTenantId: '05643f5b-c894-4bb4-a82f-42feb09b1194',
            aadClientId: '892e1ba3-c65d-40f4-b6c5-2350537676c8'
        };
        this.isConfigured = false;
        this.appInsights = new ApplicationInsights({
            config: {
                instrumentationKey: this.environment.appInsightsInstrumentationKey
            }
        });
        if (this.environment.appInsightsInstrumentationKey) {
            this.isConfigured = true;
        }
        if (this.isConfigured) {
            console.log('Loaded Application Insights!');
            this.appInsights.loadAppInsights();
            this.routerSubscription = this.router.events
                .pipe(filter(function (event) { return event instanceof ResolveEnd; }))
                .subscribe(function (event) {
                var activatedComponent = _this.getActivatedComponent(event.state.root);
                if (activatedComponent) {
                    _this.logPageView(activatedComponent.name + " " + _this.getRouteTemplate(event.state.root), event.urlAfterRedirects);
                }
            });
        }
        else {
            console.log('Application Insights not loaded! Not configured!');
        }
    }
    ApplicationInsightsService.prototype.ngOnDestroy = function () {
        if (this.isConfigured) {
            if (this.routerSubscription) {
                this.routerSubscription.unsubscribe();
            }
        }
    };
    ApplicationInsightsService.prototype.setUserId = function (userId) {
        if (this.isConfigured) {
            this.appInsights.setAuthenticatedUserContext(userId);
        }
    };
    ApplicationInsightsService.prototype.clearUserId = function () {
        if (this.isConfigured) {
            this.appInsights.clearAuthenticatedUserContext();
        }
    };
    ApplicationInsightsService.prototype.logPageView = function (name, uri) {
        if (this.isConfigured) {
            this.appInsights.trackPageView({ name: name, uri: uri });
        }
    };
    ApplicationInsightsService.prototype.logEvent = function (name, properties, measurements) {
        if (this.isConfigured) {
            this.appInsights.trackEvent({ name: name, properties: properties }, measurements);
        }
    };
    ApplicationInsightsService.prototype.logExceptionMessage = function (errorMessage) {
        if (this.isConfigured) {
            this.logException(new Error(errorMessage));
        }
    };
    ApplicationInsightsService.prototype.logException = function (error) {
        if (this.isConfigured) {
            this.appInsights.trackException({ exception: error });
        }
    };
    ApplicationInsightsService.prototype.getActivatedComponent = function (snapshot) {
        if (snapshot.firstChild) {
            return this.getActivatedComponent(snapshot.firstChild);
        }
        return snapshot.component;
    };
    ApplicationInsightsService.prototype.getRouteTemplate = function (snapshot) {
        var path = '';
        if (snapshot.routeConfig) {
            path += snapshot.routeConfig.path;
        }
        if (snapshot.firstChild) {
            return path + this.getRouteTemplate(snapshot.firstChild);
        }
        return path;
    };
    ApplicationInsightsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router])
    ], ApplicationInsightsService);
    return ApplicationInsightsService;
}());
export { ApplicationInsightsService };
//# sourceMappingURL=applications-insights.service.js.map