import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
var CheckboxComponent = /** @class */ (function (_super) {
    __extends(CheckboxComponent, _super);
    function CheckboxComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.change = new EventEmitter();
        _this.textValueTranslated = false;
        _this.isInvalid = false;
        _this.labelTranslated = true;
        _this.disabled = false;
        _this.hideUnchecked = false;
        _this.isChecked = false;
        return _this;
    }
    CheckboxComponent.prototype.onChange = function (event) {
        if (this.value) {
            console.log(this.value);
            event.checked ? this.control.setValue(this.value) : this.control.setValue(null);
        }
        this.change.emit(event);
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CheckboxComponent.prototype, "change", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxComponent.prototype, "textValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CheckboxComponent.prototype, "textValueTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CheckboxComponent.prototype, "table", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CheckboxComponent.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CheckboxComponent.prototype, "isInvalid", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CheckboxComponent.prototype, "labelTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CheckboxComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CheckboxComponent.prototype, "hideUnchecked", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CheckboxComponent.prototype, "isChecked", void 0);
    CheckboxComponent = __decorate([
        Component({
            selector: 'samplicity-checkbox',
            templateUrl: './checkbox.component.html',
            styleUrls: ['./checkbox.component.scss']
        })
    ], CheckboxComponent);
    return CheckboxComponent;
}(FieldBaseComponent));
export { CheckboxComponent };
//# sourceMappingURL=checkbox.component.js.map