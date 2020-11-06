import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { SecurityService } from './security.service';
import { ClientService } from './client.service';
import { ClassificationService } from './classification.service';
import { ReferenceDataService } from './reference-data.service';
import { ApplicationInsightsService } from './applications-insights.service';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private securityService: SecurityService,
    private clientService: ClientService,
    private classificationService: ClassificationService,
    private referenceDataService: ReferenceDataService,
    private router: Router,
    private applicationInsightsService: ApplicationInsightsService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Handles Pre-Authenticated TenantId query strings by storing it first before chacking ifLoggedIn()
    const tenantId = route.queryParams.tenantid;
    if (tenantId) {
      this.clientService.setClientId(tenantId);
    }

    // May move to service-client base
   // this.authService.refreshToken();

    if (this.authService.isLoggedIn()) {
      const permissions = route.data['permissions'];
      if (permissions) {
          const requiresAllPermissions = route.data['requiresAllPermissions'] ? true : false;
          return new Promise((resolve) => {
              let userAccess = null;
              this.securityService.getUserAccess().then((ua) => {
                userAccess = ua;
                return this.checkCacheReady();
              }).then(() => {
                this.applicationInsightsService.setUserId(userAccess.username);
                return this.securityService.canNavigate(permissions, requiresAllPermissions);
              }).then((hasAccess) => {
                if (!hasAccess) {
                    this.router.navigate(['/error'], { queryParams: { noAccess: true }});
                }
                resolve(hasAccess);
              }).catch((e) => {
                resolve(false);
              });
          });
      } else {
          return true;
      }
    }
    this.authService.startAuthentication();
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }

  private checkCacheReady(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.classificationService.cacheReadySubject.toPromise(),
        this.referenceDataService.cacheReadySubject.toPromise()
      ]).then(() => {
        resolve(true);
      }).catch((e) => {
        reject(false);
      });
    });
  }
}
