import { Injectable, OnDestroy } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ActivatedRouteSnapshot, ResolveEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ApplicationInsightsService implements OnDestroy {
   environment = {
    production: false,
    appInsightsInstrumentationKey: '',
    aadTenantId: '05643f5b-c894-4bb4-a82f-42feb09b1194',
    aadClientId: '892e1ba3-c65d-40f4-b6c5-2350537676c8'
  };
  private isConfigured = false;
  private routerSubscription: Subscription;
  private appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: this.environment.appInsightsInstrumentationKey
    }
  });

  constructor(private router: Router) {
    if (this.environment.appInsightsInstrumentationKey) {
      this.isConfigured = true;
    }

    if (this.isConfigured) {
      console.log('Loaded Application Insights!');
      this.appInsights.loadAppInsights();

      this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof ResolveEnd))
        .subscribe((event: ResolveEnd) => {
          const activatedComponent = this.getActivatedComponent(event.state.root);
          if (activatedComponent) {
            this.logPageView(`${activatedComponent.name} ${this.getRouteTemplate(event.state.root)}`, event.urlAfterRedirects);
          }
        });
    } else {
      console.log('Application Insights not loaded! Not configured!');
    }
  }

  ngOnDestroy(): void {
    if (this.isConfigured) {
      if (this.routerSubscription) {
        this.routerSubscription.unsubscribe();
      }
    }
  }

  setUserId(userId: string) {
    if (this.isConfigured) {
      this.appInsights.setAuthenticatedUserContext(userId);
    }
  }

  clearUserId() {
    if (this.isConfigured) {
      this.appInsights.clearAuthenticatedUserContext();
    }
  }

  logPageView(name?: string, uri?: string) {
    if (this.isConfigured) {
      this.appInsights.trackPageView({ name, uri });
    }
  }

  logEvent(name: string, properties?: any, measurements?: any) {
    if (this.isConfigured) {
      this.appInsights.trackEvent({ name: name, properties: properties }, measurements);
    }
  }

  logExceptionMessage(errorMessage: string) {
    if (this.isConfigured) {
      this.logException(new Error(errorMessage));
    }
  }

  logException(error: Error) {
    if (this.isConfigured) {
      this.appInsights.trackException({ exception: error });
    }
  }

  private getActivatedComponent(snapshot: ActivatedRouteSnapshot): any {
    if (snapshot.firstChild) {
      return this.getActivatedComponent(snapshot.firstChild);
    }

    return snapshot.component;
  }

  private getRouteTemplate(snapshot: ActivatedRouteSnapshot): string {
    let path = '';
    if (snapshot.routeConfig) {
      path += snapshot.routeConfig.path;
    }

    if (snapshot.firstChild) {
      return path + this.getRouteTemplate(snapshot.firstChild);
    }

    return path;
  }
}
