import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { NotificationService } from '../core/notification.service';
import { LocaleService } from 'angular-l10n';
import { AuthService } from '../core/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, switchMap, finalize } from 'rxjs/operators';

@Injectable()
export class SamplicityHttpClient implements HttpInterceptor {
  private readonly idTokenKey: string = 'samplicity-id-token';
  private isRefreshingToken = false;
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    public locale: LocaleService,
    private notification: NotificationService,
    private router: Router,
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = this.setRequestHeaders(req, localStorage.getItem(this.idTokenKey));

    return next.handle(clonedRequest).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          // There is a probblem with nswag and new HttpClient
          // nswag is trying to handle HttpResponse's "body" property when
          // in reality it's HttpErrorResponse's "error" property
          if (err.error) {
            err['body'] = err.error;
          }
          switch (err.status) {
            case 400:
              // Form validation handled elsewhere
              return Observable.throw(err) as Observable<HttpEvent<any>>;
            case 401:
              // Form validation handled
              return this.handle401Error(req, next, err) as Observable<HttpEvent<any>>;
            case 403:
              return this.handleUnauthorizedRequest(err, err.status) as Observable<HttpEvent<any>>;
            default:
              this.notification.handleError(err);
              return Observable.throw(err) as Observable<HttpEvent<any>>;
          }
        }
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler, err: HttpErrorResponse) {
    if (!this.isRefreshingToken) {
        this.isRefreshingToken = true;

        this.tokenSubject.next(null);

        return this.authService.acquireToken().pipe(
          switchMap((newToken) => {
            localStorage.setItem(this.idTokenKey, newToken);
            this.tokenSubject.next(newToken);
            console.log('Injecting refreshed token');
            return next.handle(this.setRequestHeaders(req, newToken));
          }),
          catchError(error => {
            return this.handleUnauthorizedRequest(error, error.status);
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    } else {
      return this.tokenSubject
        .filter(token => token != null)
        .take(1)
        .switchMap(token => {
          return next.handle(this.setRequestHeaders(req, token));
        });
    }
  }

  private setRequestHeaders(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers
        .set('SAMPLICITY-CULTURE', this.locale.getCurrentLocale())
        .set('Authorization', token)
      });
  }

  private handleUnauthorizedRequest(error: HttpErrorResponse, errorCode: number = null) {
    const errorPageRoute = '/error';
    if (errorCode) {
      this.router.navigate([errorPageRoute], { queryParams: { code: errorCode }});
    } else {
      this.router.navigate([errorPageRoute]);
    }
    return Observable.throw(error);
  }
}
