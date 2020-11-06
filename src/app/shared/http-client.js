import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { NotificationService } from '../core/notification.service';
import { LocaleService } from 'angular-l10n';
import { AuthService } from '../core/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, switchMap, finalize } from 'rxjs/operators';
var SamplicityHttpClient = /** @class */ (function () {
    function SamplicityHttpClient(locale, notification, router, authService) {
        this.locale = locale;
        this.notification = notification;
        this.router = router;
        this.authService = authService;
        this.idTokenKey = 'samplicity-id-token';
        this.isRefreshingToken = false;
        this.tokenSubject = new BehaviorSubject(null);
    }
    SamplicityHttpClient.prototype.intercept = function (req, next) {
        var _this = this;
        var clonedRequest = this.setRequestHeaders(req, localStorage.getItem(this.idTokenKey));
        return next.handle(clonedRequest).pipe(catchError(function (err) {
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
                        return Observable.throw(err);
                    case 401:
                        // Form validation handled
                        return _this.handle401Error(req, next, err);
                    case 403:
                        return _this.handleUnauthorizedRequest(err, err.status);
                    default:
                        _this.notification.handleError(err);
                        return Observable.throw(err);
                }
            }
        }));
    };
    SamplicityHttpClient.prototype.handle401Error = function (req, next, err) {
        var _this = this;
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            this.tokenSubject.next(null);
            return this.authService.acquireToken().pipe(switchMap(function (newToken) {
                localStorage.setItem(_this.idTokenKey, newToken);
                _this.tokenSubject.next(newToken);
                console.log('Injecting refreshed token');
                return next.handle(_this.setRequestHeaders(req, newToken));
            }), catchError(function (error) {
                return _this.handleUnauthorizedRequest(error, error.status);
            }), finalize(function () {
                _this.isRefreshingToken = false;
            }));
        }
        else {
            return this.tokenSubject
                .filter(function (token) { return token != null; })
                .take(1)
                .switchMap(function (token) {
                return next.handle(_this.setRequestHeaders(req, token));
            });
        }
    };
    SamplicityHttpClient.prototype.setRequestHeaders = function (req, token) {
        return req.clone({
            headers: req.headers
                .set('SAMPLICITY-CULTURE', this.locale.getCurrentLocale())
                .set('Authorization', token)
        });
    };
    SamplicityHttpClient.prototype.handleUnauthorizedRequest = function (error, errorCode) {
        if (errorCode === void 0) { errorCode = null; }
        var errorPageRoute = '/error';
        if (errorCode) {
            this.router.navigate([errorPageRoute], { queryParams: { code: errorCode } });
        }
        else {
            this.router.navigate([errorPageRoute]);
        }
        return Observable.throw(error);
    };
    SamplicityHttpClient = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [LocaleService,
            NotificationService,
            Router,
            AuthService])
    ], SamplicityHttpClient);
    return SamplicityHttpClient;
}());
export { SamplicityHttpClient };
//# sourceMappingURL=http-client.js.map