import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { RequestCache } from '../../cache/requestcache.service';
var CachingInterceptor = /** @class */ (function () {
    function CachingInterceptor(cache) {
        this.cache = cache;
    }
    CachingInterceptor.prototype.intercept = function (req, next) {
        //TODO:Implement Caching Interceptor
        var cachedResponse = undefined; //this.cache.get(req);
        return cachedResponse ? Observable.of(cachedResponse) : this.sendRequest(req, next, this.cache);
    };
    CachingInterceptor.prototype.sendRequest = function (req, next, cache) {
        return next.handle(req).pipe(tap(function (event) {
            if (event instanceof HttpResponse) {
                cache.put(req, event);
            }
        }));
    };
    CachingInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [RequestCache])
    ], CachingInterceptor);
    return CachingInterceptor;
}());
export { CachingInterceptor };
//# sourceMappingURL=caching.interceptor.js.map