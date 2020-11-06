import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
var GlobalErrorHandler = /** @class */ (function () {
    function GlobalErrorHandler() {
    }
    GlobalErrorHandler.prototype.handleError = function (error) {
        console.log(error);
        throw error;
        // TODO Update with Samplicity Logging Strategy
    };
    GlobalErrorHandler = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], GlobalErrorHandler);
    return GlobalErrorHandler;
}());
export { GlobalErrorHandler };
//# sourceMappingURL=global-error-handler.js.map