import { __decorate, __extends, __metadata } from "tslib";
import { Injectable, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BusySpinner } from '../common/busy-spinner';
import { UtilityService } from '../shared/utility.service';
var CanDeactivateConfirmation = /** @class */ (function (_super) {
    __extends(CanDeactivateConfirmation, _super);
    function CanDeactivateConfirmation() {
        return _super.call(this) || this;
    }
    CanDeactivateConfirmation.prototype.needDeactivateConfirmation = function ($event) {
        if ($event) {
            if (this.isDirty()) {
                $event.returnValue = 'Changes that you made may not be saved.';
            }
        }
        else {
            return this.isDirty();
        }
    };
    __decorate([
        HostListener('window:beforeunload', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Boolean)
    ], CanDeactivateConfirmation.prototype, "needDeactivateConfirmation", null);
    return CanDeactivateConfirmation;
}(BusySpinner));
export { CanDeactivateConfirmation };
var CanDeactivateGuard = /** @class */ (function () {
    function CanDeactivateGuard(utilityService, modalService) {
        this.utilityService = utilityService;
        this.modalService = modalService;
    }
    CanDeactivateGuard.prototype.canDeactivate = function (component, route, state, future) {
        if (!component.needDeactivateConfirmation || !component.needDeactivateConfirmation(null) || future.url === '/forbidden' || future.url === '/login') {
            return true;
        }
        this.modalService.open(component.deactivateConfirmationModal, this.utilityService.modalOption);
        component.deactivateRedirectUrl = future.url;
        return false;
    };
    CanDeactivateGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [UtilityService,
            NgbModal])
    ], CanDeactivateGuard);
    return CanDeactivateGuard;
}());
export { CanDeactivateGuard };
//# sourceMappingURL=can-deactivate.guard.js.map