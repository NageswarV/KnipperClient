import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../core/auth.service';

// Reference to this stackoverflow post to resolve the #id_token issue with Angular HashLocationStrategy:
// https://stackoverflow.com/questions/49367651/angular4-azure-active-directory-authentication-using-ng2-adal-library-fails-when
@Injectable()
export class OAuthCallbackHandlerGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const hash = window.location.hash;
    if (hash.indexOf('id_token') > 0) {
      this.authService.completeAuthentication();
    } else if (hash.indexOf('access_token') > 0) {
      this.authService.receiveAccessToken();
    }
    return true;
  }
}
