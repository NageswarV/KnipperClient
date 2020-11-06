import { __decorate, __metadata } from "tslib";
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
var BaseChildValidationComponent = /** @class */ (function () {
    function BaseChildValidationComponent() {
    }
    BaseChildValidationComponent.prototype.isValid = function () {
        if (this.componentForm) {
            return this.componentForm.form.valid;
        }
        return true;
    };
    __decorate([
        ViewChild(NgForm, { static: false }),
        __metadata("design:type", NgForm)
    ], BaseChildValidationComponent.prototype, "componentForm", void 0);
    return BaseChildValidationComponent;
}());
export { BaseChildValidationComponent };
//# sourceMappingURL=base-child-validation.component.js.map