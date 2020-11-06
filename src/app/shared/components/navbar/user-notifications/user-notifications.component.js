import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
var UserNotificationsComponent = /** @class */ (function () {
    function UserNotificationsComponent() {
    }
    UserNotificationsComponent.prototype.ngOnInit = function () {
        // TODO: Implement notification functionality
        this.notificationCount = 8;
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], UserNotificationsComponent.prototype, "isFirefox", void 0);
    UserNotificationsComponent = __decorate([
        Component({
            selector: 'samplicity-user-notifications',
            templateUrl: './user-notifications.component.html',
            styleUrls: ['./user-notifications.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], UserNotificationsComponent);
    return UserNotificationsComponent;
}());
export { UserNotificationsComponent };
//# sourceMappingURL=user-notifications.component.js.map