import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { Language } from 'angular-l10n';
import { TextMasks, TextUnmasks, unmask } from '../text-mask';
import { Subscription } from 'rxjs/Subscription';
var TextInputComponent = /** @class */ (function (_super) {
    __extends(TextInputComponent, _super);
    function TextInputComponent(cd) {
        var _this = _super.call(this, cd) || this;
        _this.type = 'text';
        _this.inputTextAlreadyTranslated = false;
        _this.showRequiredLabel = true;
        _this.forceRequiredLabel = false;
        _this.colon = true;
        _this.table = false;
        _this.warning = null;
        _this.showWarning = true;
        _this.error = null;
        _this.keyUp = new EventEmitter();
        _this.change = new EventEmitter();
        _this.blur = new EventEmitter();
        _this.labelTranslated = true;
        _this.descriptionAboveInput = false;
        _this.isInvalid = false;
        _this.maskSub = new Subscription();
        _this.masks = TextMasks;
        return _this;
    }
    Object.defineProperty(TextInputComponent.prototype, "isInlineRequired", {
        get: function () {
            if (this.forceRequiredLabel === true) {
                return true;
            }
            return (!this.label && this.required && this.showRequiredLabel);
        },
        enumerable: false,
        configurable: true
    });
    TextInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.textMask) {
            this.maskSub = unmask(this.parentFormGroup.get(this.name), TextUnmasks[this.textMask]);
        }
        if (this.control) {
            this.control.valueChanges.subscribe(function (val) {
                if (val === '' && _this.control) {
                    _this.control.setValue(null);
                }
                _this.change.emit(_this.control.value);
            });
            if (this.control.disabled || this.disabled) {
                this.disable();
            }
            else {
                this.enable();
            }
        }
    };
    TextInputComponent.prototype.ngOnDestroy = function () {
        this.maskSub.unsubscribe();
    };
    TextInputComponent.prototype.onBlur = function () {
        if (this.control.value) {
            var trimmed = this.control.value.toString().trim();
            if (trimmed !== this.control.value) {
                this.control.setValue(trimmed);
            }
        }
        this.blur.emit();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextInputComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "addonIconRight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "addonTextRight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "addonIconLeft", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "addonTextLeft", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "inputWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextInputComponent.prototype, "inputTextAlreadyTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TextInputComponent.prototype, "maxLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "textMask", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextInputComponent.prototype, "showRequiredLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextInputComponent.prototype, "forceRequiredLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextInputComponent.prototype, "colon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextInputComponent.prototype, "table", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "warning", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextInputComponent.prototype, "showWarning", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "error", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TextInputComponent.prototype, "disabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextInputComponent.prototype, "keyUp", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextInputComponent.prototype, "change", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TextInputComponent.prototype, "blur", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextInputComponent.prototype, "labelTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextInputComponent.prototype, "descriptionAboveInput", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextInputComponent.prototype, "isInvalid", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "description", void 0);
    __decorate([
        Language(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "lang", void 0);
    TextInputComponent = __decorate([
        Component({
            selector: 'samplicity-text-input',
            templateUrl: './text-input.component.html',
            styleUrls: ['./text-input.component.scss']
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], TextInputComponent);
    return TextInputComponent;
}(FieldBaseComponent));
export { TextInputComponent };
//# sourceMappingURL=text-input.component.js.map