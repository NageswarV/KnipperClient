import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
var maxAge = 30000;
var RequestCache = /** @class */ (function () {
    function RequestCache() {
        this.cache = new Map();
    }
    RequestCache.prototype.get = function (req) {
        var url = req.urlWithParams;
        var cached = this.cache.get(url);
        if (!cached) {
            return undefined;
        }
        var isExpired = cached.lastRead < (Date.now() - maxAge);
        var expired = isExpired ? 'expired ' : '';
        return cached.response;
    };
    RequestCache.prototype.put = function (req, response) {
        var _this = this;
        var url = req.url;
        var entry = { url: url, response: response, lastRead: Date.now() };
        this.cache.set(url, entry);
        var expired = Date.now() - maxAge;
        this.cache.forEach(function (expiredEntry) {
            if (expiredEntry.lastRead < expired) {
                _this.cache.delete(expiredEntry.url);
            }
        });
    };
    RequestCache = __decorate([
        Injectable()
    ], RequestCache);
    return RequestCache;
}());
export { RequestCache };
//# sourceMappingURL=requestcache.service.js.map