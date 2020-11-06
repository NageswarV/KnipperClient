import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ValidationService } from '../../validation/validation.service';
import { NotifyService } from '../../shared/notify.service';
var ValidationInterceptor = /** @class */ (function () {
    function ValidationInterceptor(validationService, notifyService) {
        this.validationService = validationService;
        this.notifyService = notifyService;
    }
    ValidationInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        var ok;
        var errorHandled = false;
        var errorResponse;
        // extend server response observable with logging
        return next.handle(req)
            .pipe(tap(
        //// Succeeds when there is a response; ignore other events
        //event => ok = event instanceof HttpResponse ? event : null,
        //// Operation failed; error is an HttpErrorResponse
        //error => ok = error
        function (r) {
            _this.validationService.clearMessage('global');
        }, function (e) { return __awaiter(_this, void 0, void 0, function () {
            var a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errorHandled = false;
                        if (!(typeof e.error != "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, e.error.text()];
                    case 1:
                        a = _a.sent();
                        errorResponse = JSON.parse(a);
                        errorResponse.status = e.status;
                        _a.label = 2;
                    case 2:
                        if (!this.isUserFriendlyError(errorResponse) && !this.isValidationError(errorResponse)) {
                            this.handleStatusError(e);
                            errorHandled = true;
                        }
                        return [2 /*return*/];
                }
            });
        }); }));
    };
    ValidationInterceptor.prototype.isUserFriendlyError = function (e) {
        if (e.status === 500) {
            try {
                if (e && e.error && e.error.code === 400) {
                    return true;
                }
            }
            catch (ex) {
                // Do nothing
            }
            return false;
        }
    };
    ValidationInterceptor.prototype.isValidationError = function (e) {
        if (e.status === 400) {
            try {
                if (e && e.error && e.error.validationErrors) {
                    return true;
                }
            }
            catch (ex) {
                // Do nothing
            }
            return false;
        }
    };
    ValidationInterceptor.prototype.handleStatusError = function (e) {
        if (e && e.status === 403) {
            this.validationService.forbidPage();
        }
        else if (e.status) {
            this.notifyService.info({
                title: 'repportal-system-errormessage',
                text: 'repportal-system-contactsupport',
                cornerclass: 'transparent-style'
            });
        }
        else {
            this.notifyService.error({
                title: 'repportal-system-errormessage',
                text: 'repportal-system-cannotconnect'
            });
        }
    };
    ValidationInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ValidationService,
            NotifyService])
    ], ValidationInterceptor);
    return ValidationInterceptor;
}());
export { ValidationInterceptor };
//# sourceMappingURL=validation.interceptor.js.map