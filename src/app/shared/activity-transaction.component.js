import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { OrderMetric } from '../../generated/service-client';
var ActivityTransactionComponent = /** @class */ (function () {
    function ActivityTransactionComponent() {
    }
    ActivityTransactionComponent.prototype.getTop = function () {
        var count = this.capsuleIndex % 2 === 0 ? 3 : this.capsuleIndex % 2;
        return 65.5 * count + '%';
    };
    ActivityTransactionComponent.prototype.getLeft = function () {
        var count = this.capsuleIndex % 3 === 0 ? 3 : this.capsuleIndex % 3;
        var index = [1, 3, 5];
        return 7.5 * index[count] + 'em';
    };
    ActivityTransactionComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", OrderMetric)
    ], ActivityTransactionComponent.prototype, "transaction", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ActivityTransactionComponent.prototype, "link", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ActivityTransactionComponent.prototype, "timeFrameSelected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ActivityTransactionComponent.prototype, "errorCapsule", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ActivityTransactionComponent.prototype, "warningCapsule", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ActivityTransactionComponent.prototype, "capsuleIndex", void 0);
    ActivityTransactionComponent = __decorate([
        Component({
            selector: 'sg-activitiy',
            templateUrl: './activity-transaction.component.html',
            styleUrls: ['./activity-transaction.component.scss'],
        })
    ], ActivityTransactionComponent);
    return ActivityTransactionComponent;
}());
export { ActivityTransactionComponent };
//# sourceMappingURL=activity-transaction.component.js.map