import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { LocaleService, Language } from 'angular-l10n';
import { TextMasks, TextUnmasks, unmask } from '../text-mask';
import { Subscription } from 'rxjs/Subscription';
var TextSelectGroupComponent = /** @class */ (function (_super) {
    __extends(TextSelectGroupComponent, _super);
    function TextSelectGroupComponent(locale, cd) {
        var _this = _super.call(this, cd) || this;
        _this.locale = locale;
        _this.type = 'text';
        _this.showDefaultOption = true;
        _this.selectRequired = false;
        _this.selectWidth = 50;
        _this.namesProp = 'names';
        _this.maskSub = new Subscription();
        _this.masks = TextMasks;
        return _this;
    }
    Object.defineProperty(TextSelectGroupComponent.prototype, "isInlineRequired", {
        get: function () {
            return (!this.label && this.required);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextSelectGroupComponent.prototype, "inputControl", {
        get: function () {
            if (this.parentFormGroup && this.name) {
                return this.parentFormGroup.get(this.name);
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextSelectGroupComponent.prototype, "selectControl", {
        get: function () {
            if (this.parentFormGroup && this.selectName) {
                return this.parentFormGroup.get(this.selectName);
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    TextSelectGroupComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.textMask) {
            this.maskSub = unmask(this.parentFormGroup.get(this.name), TextUnmasks[this.textMask]);
        }
        if (this.inputControl) {
            this.inputControl.valueChanges.subscribe(function (val) {
                if (val === '' && _this.inputControl) {
                    _this.inputControl.setValue(null);
                }
                // Have to clear manually update errors for the select on input value change
                if (_this.selectControl && _this.selectControl.errors) {
                    _this.selectControl.updateValueAndValidity();
                }
            });
        }
    };
    TextSelectGroupComponent.prototype.updateSelect = function () {
        if (this.selectControl && this.inputControl) {
            if (!this.inputControl.value) {
                this.selectControl.disable();
                this.selectControl.reset();
            }
            else {
                this.selectControl.enable();
            }
        }
    };
    TextSelectGroupComponent.prototype.ngOnDestroy = function () {
        this.maskSub.unsubscribe();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextSelectGroupComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextSelectGroupComponent.prototype, "showDefaultOption", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextSelectGroupComponent.prototype, "selectName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextSelectGroupComponent.prototype, "selectRequired", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], TextSelectGroupComponent.prototype, "items", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextSelectGroupComponent.prototype, "selectWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextSelectGroupComponent.prototype, "textMask", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextSelectGroupComponent.prototype, "namesProp", void 0);
    __decorate([
        Language(),
        __metadata("design:type", String)
    ], TextSelectGroupComponent.prototype, "lang", void 0);
    TextSelectGroupComponent = __decorate([
        Component({
            selector: 'samplicity-text-select-group',
            templateUrl: './text-select-group.component.html',
            styleUrls: ['./text-select-group.component.scss']
        }),
        __metadata("design:paramtypes", [LocaleService, ChangeDetectorRef])
    ], TextSelectGroupComponent);
    return TextSelectGroupComponent;
}(FieldBaseComponent));
export { TextSelectGroupComponent };
//# sourceMappingURL=text-select-group.component.js.map