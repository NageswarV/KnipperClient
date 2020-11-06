import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
var FieldWarningsComponent = /** @class */ (function () {
    function FieldWarningsComponent() {
        this.message = null;
    }
    __decorate([
        Input(),
        __metadata("design:type", AbstractControl)
    ], FieldWarningsComponent.prototype, "control", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FieldWarningsComponent.prototype, "message", void 0);
    FieldWarningsComponent = __decorate([
        Component({
            selector: 'samplicity-field-warnings',
            templateUrl: './field-warnings.component.html',
            styleUrls: ['./field-warnings.component.scss']
        })
    ], FieldWarningsComponent);
    return FieldWarningsComponent;
}());
export { FieldWarningsComponent };
//# sourceMappingURL=field-warnings.component.js.map