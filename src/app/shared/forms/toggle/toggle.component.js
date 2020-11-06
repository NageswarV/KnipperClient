import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
var ToggleComponent = /** @class */ (function (_super) {
    __extends(ToggleComponent, _super);
    function ToggleComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelTranslated = true;
        return _this;
    }
    ToggleComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.control) {
            this.control.valueChanges.subscribe(function (x) {
                _this.control.markAsTouched();
                _this.control.markAsDirty();
            });
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ToggleComponent.prototype, "items", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ToggleComponent.prototype, "labelTranslated", void 0);
    ToggleComponent = __decorate([
        Component({
            selector: 'samplicity-toggle',
            templateUrl: './toggle.component.html',
            styleUrls: ['./toggle.component.scss']
        })
    ], ToggleComponent);
    return ToggleComponent;
}(FieldBaseComponent));
export { ToggleComponent };
//# sourceMappingURL=toggle.component.js.map