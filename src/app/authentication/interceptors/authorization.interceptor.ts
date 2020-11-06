import { AuthenticationService } from '../authentication.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    if (this.auth.accessTokenData && !req.url.endsWith('Token')) {
      const authToken = 'Bearer ' + this.auth.accessTokenData.access_token;
      // If you are calling an outside domain then do not add the token.
      //if (!req.url.match(/www.mydomain.com\//)) {
      //  return next.handle(req);
      //}

      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      const authReq = req.clone({
        headers: req.headers.set('Authorization', authToken)
      });

      // configure Inactivity timeout
      this.auth.configureInactivityTimeout();

      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }
    else {
      return next.handle(req);
    }


  }
}
