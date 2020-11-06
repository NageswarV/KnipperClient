import { finalize, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class UnAuthorizedInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let ok: any;
    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
        (r: HttpResponse<any>) => { ok = r },
          // Operation failed; error is an HttpErrorResponse
        (e: HttpErrorResponse) => { ok = e }
        ),
        // Log when response observable either completes or errors
        finalize(() => {
          if (ok.status === 401) {
            this.authenticationService.signOut();
          }
        })
      );
  }
}
