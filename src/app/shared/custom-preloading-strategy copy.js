import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication';
var CustomPreloadingStrategy = /** @class */ (function () {
    function CustomPreloadingStrategy(authService) {
        this.authService = authService;
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
        __metadata("design:paramtypes", [AuthenticationService])
    ], CustomPreloadingStrategy);
    return CustomPreloadingStrategy;
}());
export { CustomPreloadingStrategy };
//# sourceMappingURL=custom-preloading-strategy copy.js.map