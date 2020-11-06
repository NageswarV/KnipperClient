import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { Language } from 'angular-l10n';
var TextareaComponent = /** @class */ (function (_super) {
    __extends(TextareaComponent, _super);
    function TextareaComponent(cd) {
        var _this = _super.call(this, cd) || this;
        _this.forceRequiredLabel = false;
        _this.rows = 5;
        _this.maxLength = 2000;
        _this.table = false;
        _this.labelTranslated = true;
        _this.disabled = false;
        return _this;
    }
    TextareaComponent.prototype.onBlur = function () {
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
    ], TextareaComponent.prototype, "forceRequiredLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextareaComponent.prototype, "rows", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextareaComponent.prototype, "maxLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextareaComponent.prototype, "table", void 0);
    __decorate([
        Language(),
        __metadata("design:type", String)
    ], TextareaComponent.prototype, "lang", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextareaComponent.prototype, "labelTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextareaComponent.prototype, "disabled", void 0);
    TextareaComponent = __decorate([
        Component({
            selector: 'samplicity-textarea',
            templateUrl: './textarea.component.html',
            styleUrls: ['./textarea.component.scss']
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], TextareaComponent);
    return TextareaComponent;
}(FieldBaseComponent));
export { TextareaComponent };
//# sourceMappingURL=textarea.component.js.map