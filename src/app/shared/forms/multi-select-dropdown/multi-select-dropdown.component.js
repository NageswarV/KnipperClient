import { __decorate, __extends, __metadata } from "tslib";
import { Component, ChangeDetectorRef, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
var MultiSelectDropdownComponent = /** @class */ (function (_super) {
    __extends(MultiSelectDropdownComponent, _super);
    function MultiSelectDropdownComponent(cd) {
        var _this = _super.call(this, cd) || this;
        _this.modelChanged = new EventEmitter();
        _this.singleSelection = false;
        _this.disabled = false;
        _this.forceDisabled = false;
        _this.selectedItems = [];
        _this.enableCheckAll = true;
        _this.allowSearchFilter = true;
        _this.showRequiredLabel = true;
        _this.forceRequiredLabel = false;
        _this.colon = true;
        _this.table = false;
        _this.maxHeight = 197;
        _this.itemsShowLimit = 5;
        _this.placeholder = '--Select--';
        _this.dropdownSettings = {};
        return _this;
    }
    Object.defineProperty(MultiSelectDropdownComponent.prototype, "isInlineRequired", {
        get: function () {
            if (this.forceRequiredLabel === true) {
                return true;
            }
            return (!this.label && this.required && this.showRequiredLabel);
        },
        enumerable: false,
        configurable: true
    });
    MultiSelectDropdownComponent.prototype.ngOnInit = function () {
        this.setDropdownSettings();
    };
    MultiSelectDropdownComponent.prototype.setDropdownSettings = function () {
        this.dropdownSettings = {
            idField: 'value',
            textField: 'label',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            singleSelection: this.singleSelection,
            enableCheckAll: this.enableCheckAll,
            disabled: this.forceDisabled || this.disabled,
            maxHeight: this.maxHeight,
            itemsShowLimit: this.itemsShowLimit,
            allowSearchFilter: this.allowSearchFilter,
        };
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MultiSelectDropdownComponent.prototype, "modelChanged", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectDropdownComponent.prototype, "singleSelection", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectDropdownComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectDropdownComponent.prototype, "forceDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MultiSelectDropdownComponent.prototype, "items", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MultiSelectDropdownComponent.prototype, "selectedItems", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectDropdownComponent.prototype, "enableCheckAll", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectDropdownComponent.prototype, "allowSearchFilter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectDropdownComponent.prototype, "showRequiredLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectDropdownComponent.prototype, "forceRequiredLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectDropdownComponent.prototype, "colon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectDropdownComponent.prototype, "table", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectDropdownComponent.prototype, "maxHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectDropdownComponent.prototype, "itemsShowLimit", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelectDropdownComponent.prototype, "description", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MultiSelectDropdownComponent.prototype, "loading", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectDropdownComponent.prototype, "placeholder", void 0);
    MultiSelectDropdownComponent = __decorate([
        Component({
            selector: 'samplicity-multi-select-dropdown',
            templateUrl: './multi-select-dropdown.component.html',
            styleUrls: ['./multi-select-dropdown.component.scss'],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], MultiSelectDropdownComponent);
    return MultiSelectDropdownComponent;
}(FieldBaseComponent));
export { MultiSelectDropdownComponent };
//# sourceMappingURL=multi-select-dropdown.component.js.map