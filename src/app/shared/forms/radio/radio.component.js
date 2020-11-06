import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
var RadioComponent = /** @class */ (function (_super) {
    __extends(RadioComponent, _super);
    function RadioComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.colon = true;
        _this.table = false;
        _this.vertical = true;
        _this.forceRequiredLabel = false;
        _this.change = new EventEmitter();
        _this.click = new EventEmitter();
        _this.labelTranslated = true;
        _this.disabled = false;
        _this.forceDisabled = false;
        return _this;
    }
    Object.defineProperty(RadioComponent.prototype, "value", {
        get: function () {
            var _this = this;
            if (this.control) {
                var value = this.items.find(function (x) { return x.value === _this.control.value; });
                return value ? value.label : '';
            }
            return '';
        },
        enumerable: false,
        configurable: true
    });
    RadioComponent.prototype.ngOnInit = function () {
        if (this.control) {
            if (this.control.disabled) {
                this.disable();
            }
            else {
                this.enable();
            }
        }
    };
    RadioComponent.prototype.set = function (value) {
        if (this.disabled || this.forceDisabled) {
            return;
        }
        if (this.control) {
            if (!this.control.disabled) {
                this.control.setValue(value);
                this.change.emit();
            }
            this.control.markAsDirty();
            this.control.markAsTouched();
            this.control.updateValueAndValidity();
        }
        this.click.emit();
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], RadioComponent.prototype, "items", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], RadioComponent.prototype, "colon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], RadioComponent.prototype, "table", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], RadioComponent.prototype, "vertical", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], RadioComponent.prototype, "forceRequiredLabel", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], RadioComponent.prototype, "change", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], RadioComponent.prototype, "click", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], RadioComponent.prototype, "labelTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], RadioComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], RadioComponent.prototype, "forceDisabled", void 0);
    RadioComponent = __decorate([
        Component({
            selector: 'samplicity-radio',
            templateUrl: './radio.component.html',
            styleUrls: ['./radio.component.scss']
        })
    ], RadioComponent);
    return RadioComponent;
}(FieldBaseComponent));
export { RadioComponent };
//# sourceMappingURL=radio.component.js.map