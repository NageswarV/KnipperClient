import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { Language } from 'angular-l10n';
import { TextMasks, TextUnmasks, unmask } from '../text-mask';
import { Subscription } from 'rxjs/Subscription';
var TextInlineInputComponent = /** @class */ (function (_super) {
    __extends(TextInlineInputComponent, _super);
    function TextInlineInputComponent(cd) {
        var _this = _super.call(this, cd) || this;
        _this.type = 'text';
        _this.readonly = false;
        _this.tableLabel = false;
        _this.colon = true;
        _this.forceRequiredLabel = false;
        _this.maskSub = new Subscription();
        _this.masks = TextMasks;
        return _this;
    }
    TextInlineInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.textMask) {
            this.maskSub = unmask(this.parentFormGroup.get(this.name), TextUnmasks[this.textMask]);
        }
        if (this.control) {
            this.control.valueChanges.subscribe(function (val) {
                if (val === '' && _this.control) {
                    _this.control.setValue(null);
                }
            });
        }
    };
    TextInlineInputComponent.prototype.ngOnDestroy = function () {
        this.maskSub.unsubscribe();
    };
    TextInlineInputComponent.prototype.onBlur = function () {
        if (this.control.value) {
            var trimmed = this.control.value.trim();
            if (trimmed !== this.control.value) {
                this.control.setValue(trimmed);
            }
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextInlineInputComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TextInlineInputComponent.prototype, "maxLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextInlineInputComponent.prototype, "textMask", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextInlineInputComponent.prototype, "readonly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextInlineInputComponent.prototype, "tableLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextInlineInputComponent.prototype, "colon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextInlineInputComponent.prototype, "forceRequiredLabel", void 0);
    __decorate([
        Language(),
        __metadata("design:type", String)
    ], TextInlineInputComponent.prototype, "lang", void 0);
    TextInlineInputComponent = __decorate([
        Component({
            selector: 'samplicity-text-inline-input',
            templateUrl: './text-inline-input.component.html',
            styleUrls: ['./text-inline-input.component.scss']
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], TextInlineInputComponent);
    return TextInlineInputComponent;
}(FieldBaseComponent));
export { TextInlineInputComponent };
//# sourceMappingURL=text-inline-input.component.js.map