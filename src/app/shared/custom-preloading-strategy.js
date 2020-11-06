import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
var CustomPreloadingStrategy = /** @class */ (function () {
    function CustomPreloadingStrategy() {
        this.canAccessAdmin = false;
    }
    CustomPreloadingStrategy.prototype.preload = function (route, load) {
        this.canAccessAdmin = false;
        if (route.data && route.data['preload']) {
            if (this.canAccessAdmin) {
                return load();
            }
        }
        return Observable.of(null);
    };
    CustomPreloadingStrategy = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], CustomPreloadingStrategy);
    return CustomPreloadingStrategy;
}());
export { CustomPreloadingStrategy };
//# sourceMappingURL=custom-preloading-strategy.js.map