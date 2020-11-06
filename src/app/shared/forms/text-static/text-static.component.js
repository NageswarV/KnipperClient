import { __decorate, __extends, __metadata } from "tslib";
import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
var TextStaticComponent = /** @class */ (function (_super) {
    __extends(TextStaticComponent, _super);
    function TextStaticComponent(cd) {
        var _this = _super.call(this, cd) || this;
        _this.idProp = 'id';
        _this.valueProp = 'values';
        _this.delimiter = null;
        _this.emptyValue = null;
        _this.labelTranslated = true;
        return _this;
    }
    Object.defineProperty(TextStaticComponent.prototype, "isArray", {
        get: function () {
            if (this.control) {
                return Array.isArray(this.control.value);
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextStaticComponent.prototype, "isArrayEmpty", {
        get: function () {
            if (this.isArray) {
                return (this.control.value).length === 0;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], TextStaticComponent.prototype, "listItems", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextStaticComponent.prototype, "idProp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextStaticComponent.prototype, "valueProp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextStaticComponent.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextStaticComponent.prototype, "delimiter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TextStaticComponent.prototype, "lineBreak", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TextStaticComponent.prototype, "emptyValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextStaticComponent.prototype, "pipe", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextStaticComponent.prototype, "labelTranslated", void 0);
    TextStaticComponent = __decorate([
        Component({
            selector: 'samplicity-text-static',
            templateUrl: './text-static.component.html',
            styleUrls: ['./text-static.component.scss']
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], TextStaticComponent);
    return TextStaticComponent;
}(FieldBaseComponent));
export { TextStaticComponent };
//# sourceMappingURL=text-static.component.js.map