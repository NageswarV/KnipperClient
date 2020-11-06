import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { FormComponent } from '../shared/forms/form/form.component';
import { DetailPageComponent } from '../shared/components/detail-page/detail-page.component';
var CanDeactivateGuard = /** @class */ (function () {
    function CanDeactivateGuard() {
    }
    CanDeactivateGuard.prototype.getFormProperty = function (component) {
        if (!component) {
            return null;
        }
        for (var key in component) {
            if (component.hasOwnProperty(key)) {
                if (component[key] instanceof FormComponent) {
                    return component[key];
                }
                if (component[key] instanceof DetailPageComponent) {
                    return component[key].form;
                }
            }
        }
        return null;
    };
    CanDeactivateGuard.prototype.canDeactivate = function (component, route, state, future) {
        var form = this.getFormProperty(component);
        if (form && form.formIsDirty) {
            form.tryNavigateAway(future.url);
            return false;
        }
        return true;
    };
    CanDeactivateGuard = __decorate([
        Injectable()
    ], CanDeactivateGuard);
    return CanDeactivateGuard;
}());
export { CanDeactivateGuard };
//# sourceMappingURL=can-deactivate.guard.js.map