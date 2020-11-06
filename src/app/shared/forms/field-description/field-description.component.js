import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
var FieldDescriptionComponent = /** @class */ (function () {
    function FieldDescriptionComponent() {
        this.icon = true;
        this.zeroMarginBottom = false;
    }
    Object.defineProperty(FieldDescriptionComponent.prototype, "isArray", {
        get: function () {
            return Array.isArray(this.description);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FieldDescriptionComponent.prototype, "isDto", {
        get: function () {
            return (this.isArray && this.description[0] instanceof Object);
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FieldDescriptionComponent.prototype, "description", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FieldDescriptionComponent.prototype, "icon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FieldDescriptionComponent.prototype, "zeroMarginBottom", void 0);
    FieldDescriptionComponent = __decorate([
        Component({
            selector: 'samplicity-field-description',
            templateUrl: './field-description.component.html',
            styleUrls: ['./field-description.component.scss'],
        })
    ], FieldDescriptionComponent);
    return FieldDescriptionComponent;
}());
export { FieldDescriptionComponent };
//# sourceMappingURL=field-description.component.js.map