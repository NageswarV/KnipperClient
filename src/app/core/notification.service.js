import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var NotificationService = /** @class */ (function () {
    function NotificationService() {
        this.globalErrorStream = new Subject();
        this.globalErrors$ = this.globalErrorStream.asObservable();
    }
    NotificationService.prototype.handleError = function (error) {
        this.globalErrorStream.next(error);
    };
    NotificationService = __decorate([
        Injectable()
    ], NotificationService);
    return NotificationService;
}());
export { NotificationService };
//# sourceMappingURL=notification.service.js.map