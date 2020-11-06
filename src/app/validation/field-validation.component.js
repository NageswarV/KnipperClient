import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
var FieldValidationComponent = /** @class */ (function () {
    function FieldValidationComponent() {
    }
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FieldValidationComponent.prototype, "hidden", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FieldValidationComponent.prototype, "message", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FieldValidationComponent.prototype, "errorMessages", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FieldValidationComponent.prototype, "warningMessages", void 0);
    FieldValidationComponent = __decorate([
        Component({
            selector: 'sg-field-validation',
            templateUrl: './field-validation.component.html',
            styleUrls: ['./field-validation.component.scss']
        })
    ], FieldValidationComponent);
    return FieldValidationComponent;
}());
export { FieldValidationComponent };
//# sourceMappingURL=field-validation.component.js.map