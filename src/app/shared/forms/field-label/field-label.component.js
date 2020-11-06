import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Language } from 'angular-l10n';
var FieldLabelComponent = /** @class */ (function () {
    function FieldLabelComponent() {
        this.labelTranslated = true;
        this.required = false;
        this.colon = true;
    }
    Object.defineProperty(FieldLabelComponent.prototype, "isDto", {
        get: function () {
            return Array.isArray(this.label) && this.label[0] instanceof Object;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Language(),
        __metadata("design:type", String)
    ], FieldLabelComponent.prototype, "lang", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FieldLabelComponent.prototype, "inputId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FieldLabelComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FieldLabelComponent.prototype, "labelParameters", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FieldLabelComponent.prototype, "labelTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FieldLabelComponent.prototype, "required", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FieldLabelComponent.prototype, "colon", void 0);
    FieldLabelComponent = __decorate([
        Component({
            selector: 'samplicity-field-label',
            templateUrl: './field-label.component.html',
            styleUrls: ['./field-label.component.scss'],
        })
    ], FieldLabelComponent);
    return FieldLabelComponent;
}());
export { FieldLabelComponent };
//# sourceMappingURL=field-label.component.js.map