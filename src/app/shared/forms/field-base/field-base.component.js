import { __decorate, __metadata } from "tslib";
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
var nextId = 0;
var FieldBaseComponent = /** @class */ (function () {
    function FieldBaseComponent(cd) {
        this.cd = cd;
        this.labelTranslated = true;
        this.required = false;
        this.disabled = false;
        this.noLabel = false;
        this.disabledType = 'readonly'; // Set to 'disabled' to enable disabled state when formcontrol is disabled, instead of readonly
        this.id = "field-" + nextId++;
    }
    Object.defineProperty(FieldBaseComponent.prototype, "control", {
        get: function () {
            return (this.parentFormGroup ? this.parentFormGroup.get(this.name) : null);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FieldBaseComponent.prototype, "isRequired", {
        get: function () {
            if (this.control && this.control.validator) {
                var validator = this.control.validator({});
                return validator && validator.required;
            }
        },
        enumerable: false,
        configurable: true
    });
    FieldBaseComponent.prototype.ngAfterViewInit = function () {
    };
    FieldBaseComponent.prototype.disable = function () {
        this.disabled = true;
    };
    FieldBaseComponent.prototype.enable = function () {
        this.disabled = false;
    };
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], FieldBaseComponent.prototype, "parentFormGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FieldBaseComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FieldBaseComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FieldBaseComponent.prototype, "labelParameters", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FieldBaseComponent.prototype, "labelTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FieldBaseComponent.prototype, "required", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FieldBaseComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FieldBaseComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FieldBaseComponent.prototype, "description", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FieldBaseComponent.prototype, "noLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FieldBaseComponent.prototype, "disabledType", void 0);
    FieldBaseComponent = __decorate([
        Component({
            template: '',
            selector: 'samplicity-field-base'
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], FieldBaseComponent);
    return FieldBaseComponent;
}());
export { FieldBaseComponent };
//# sourceMappingURL=field-base.component.js.map