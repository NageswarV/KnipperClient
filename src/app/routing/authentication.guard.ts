
import { of as observableOf, Observable, Subscription } from 'rxjs';

import { tap } from 'rxjs/operators';
import { Injectable, Injector, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication';
import { TenantService } from '../tenant';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild, OnDestroy {
  private isLoggedIn: boolean;
  private loginStatusChangeSubscription: Subscription;
  private isLoading: boolean;

  constructor(private authService: AuthenticationService,
    private router: Router,
    private tenantService: TenantService,
    location: Location) {
    this.isLoading = true;

    this.authService.isLoggedIn.subscribe(result => {
      this.isLoggedIn = result;
      this.isLoading = false;
      const url = this.isLoggedIn ? this.router.url : '';
      this.checkRedirectionAfterLogin(url);
      this.checkIfSignedOut();
    });

    this.authService.login();
  }

  checkIfSignedOut() {
    if (!this.isLoggedIn && !this.isLoading) {
      this.router.navigate(['/login']);
    }
  }
  checkRedirectionAfterLogin(url: string) {
    if ((this.authService.redirectToAfterLoginUrl !== null && this.authService.redirectToAfterLoginUrl !== undefined) || url.startsWith('/login') || url.startsWith('/passwordforgot')
      || url.startsWith('/passwordreset') || url.startsWith('/sso')) {
      const redirectUrl = this.authService.redirectToAfterLoginUrl ? this.authService.redirectToAfterLoginUrl : '';
      this.authService.redirectToAfterLoginUrl = null;
      this.router.navigateByUrl(redirectUrl);
    }
    else if (this.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkLogin(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

  checkLogin(url: string): Observable<boolean> {
    if (this.isLoading) {
      this.authService.redirectToAfterLoginUrl = url;
    }
    if (!this.authService.isLoggedInVal 
      // && !this.isLoading
      ) {
      this.authService.redirectToAfterLoginUrl = url;
      this.redirectToAuthenticationMethod();
    }

    return observableOf(this.authService.isLoggedInVal);
  }

  redirectToAuthenticationMethod() {
      this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    //this.loginStatusChangeSubscription.unsubscribe();
  }
}
