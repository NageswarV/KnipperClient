import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
var MultiSelectWrapperComponent = /** @class */ (function (_super) {
    __extends(MultiSelectWrapperComponent, _super);
    function MultiSelectWrapperComponent(cd) {
        var _this = _super.call(this, cd) || this;
        _this.change = new EventEmitter();
        _this.disabled = false;
        _this.outputIds = false;
        _this.idProperty = 'id';
        _this.namesProperty = 'names';
        _this.namesTranslated = false;
        _this.sort = true;
        _this.multiSort = false;
        _this.selectAll = false;
        _this.noWell = false;
        _this.collapsible = false;
        _this.labelTranslated = true;
        return _this;
    }
    MultiSelectWrapperComponent.prototype.onChange = function (selectedIds) {
        var control = this.parentFormGroup.get(this.name);
        control.markAsDirty();
        control.markAsTouched();
        control.updateValueAndValidity();
        this.change.emit(selectedIds);
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MultiSelectWrapperComponent.prototype, "change", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectWrapperComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MultiSelectWrapperComponent.prototype, "listItems", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelectWrapperComponent.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelectWrapperComponent.prototype, "maxHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectWrapperComponent.prototype, "outputIds", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectWrapperComponent.prototype, "idProperty", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectWrapperComponent.prototype, "namesProperty", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectWrapperComponent.prototype, "namesTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectWrapperComponent.prototype, "sort", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectWrapperComponent.prototype, "multiSort", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectWrapperComponent.prototype, "selectAll", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelectWrapperComponent.prototype, "selectAllText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectWrapperComponent.prototype, "noWell", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectWrapperComponent.prototype, "collapsible", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectWrapperComponent.prototype, "labelTranslated", void 0);
    MultiSelectWrapperComponent = __decorate([
        Component({
            selector: 'samplicity-multi-select-wrapper',
            templateUrl: './multi-select-wrapper.component.html',
            styleUrls: ['./multi-select-wrapper.component.scss']
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], MultiSelectWrapperComponent);
    return MultiSelectWrapperComponent;
}(FieldBaseComponent));
export { MultiSelectWrapperComponent };
//# sourceMappingURL=multi-select-wrapper.component.js.map