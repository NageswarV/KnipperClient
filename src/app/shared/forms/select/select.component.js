import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { LocaleService } from 'angular-l10n';
var SelectComponent = /** @class */ (function (_super) {
    __extends(SelectComponent, _super);
    function SelectComponent(locale, cd) {
        var _this = _super.call(this, cd) || this;
        _this.locale = locale;
        _this.change = new EventEmitter();
        _this.contentChange = new EventEmitter();
        _this.itemNamesTranslated = false;
        _this.placeholder = 'Select';
        _this.showDefaultOption = true;
        _this.showRequiredLabel = true;
        _this.forceRequiredLabel = false;
        _this.namesProp = 'names';
        _this.valueProp = 'value';
        _this.labelProp = 'label';
        _this.sortProp = '';
        _this.sort = true;
        _this.colon = true;
        _this.table = false;
        _this.isInvalid = false;
        _this.labelTranslated = true;
        _this.readonly = false;
        _this.valuesTranslated = false;
        return _this;
    }
    Object.defineProperty(SelectComponent.prototype, "value", {
        get: function () {
            var _this = this;
            if (this.control) {
                var value = this.items.find(function (x) {
                    return x[_this.valueProp] === _this.control.value;
                });
                if (value) {
                    return value[this.labelProp];
                }
            }
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "isInlineRequired", {
        get: function () {
            return (!this.label && this.required && this.showRequiredLabel);
        },
        enumerable: false,
        configurable: true
    });
    SelectComponent.prototype.ngOnChanges = function (changes) {
        if (changes.items && changes.items.currentValue && changes.items.currentValue.length > 0) {
            this.sortItems();
            this.contentChange.emit();
        }
    };
    SelectComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.languageSub = this.locale.defaultLocaleChanged.subscribe(function () {
            _this.sortItems();
        });
        if (this.control) {
            if (this.control.value === null) {
                this.control.setValue('');
            }
            this.control.valueChanges.subscribe(function (val) {
                // To accomodate saveable null values in select for backend
                // Converting "null" to null on select
                if (_this.control && val === null) {
                    _this.control.setValue('');
                }
            });
        }
    };
    SelectComponent.prototype.trackById = function (index, item) {
        return item[this.valueProp ? this.valueProp : 'id'];
    };
    SelectComponent.prototype.getValue = function (option) {
        return this.valueProp ? option[this.valueProp] : option;
    };
    SelectComponent.prototype.sortItems = function () {
        var _this = this;
        if (this.sort && this.items && this.items.length > 0) {
            this.items.sort(function (a, b) {
                var firstName = _this.getValueForSort(a);
                var secondName = _this.getValueForSort(b);
                var localeSortResult = firstName['value'] ? firstName['value'].localeCompare(secondName['value']) : null;
                if (_this.sortProp) {
                    var firstProp = 0;
                    var secondProp = 0;
                    if (typeof a[_this.sortProp] === 'boolean') {
                        firstProp = a[_this.sortProp] ? 1 : 0;
                        secondProp = b[_this.sortProp] ? 1 : 0;
                    }
                    else {
                        firstProp = a[_this.sortProp];
                        secondProp = b[_this.sortProp];
                    }
                    return (firstProp - secondProp) || localeSortResult;
                }
                return localeSortResult;
            });
        }
    };
    SelectComponent.prototype.getValueForSort = function (item) {
        var _this = this;
        var value = item['values'] === undefined ? item['names'] : item['values'];
        return value ? value.find(function (i) { return i['language'] === _this.locale.getCurrentLanguage(); }) : '';
    };
    SelectComponent.prototype.compareLanguageDto = function (l1, l2) {
        if (!l1 || !l2) {
            return false;
        }
        if (l1.id) {
            l1 = l1.id;
        }
        if (l2.id) {
            l2 = l2.id;
        }
        return l1 === l2;
    };
    SelectComponent.prototype.ngOnDestroy = function () {
        this.languageSub.unsubscribe();
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SelectComponent.prototype, "change", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SelectComponent.prototype, "contentChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SelectComponent.prototype, "items", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "itemNamesTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "showDefaultOption", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "showRequiredLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "forceRequiredLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "namesProp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "valueProp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "labelProp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "sortProp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "sort", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "colon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "table", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "icon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectComponent.prototype, "iconColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "isInvalid", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "labelTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "readonly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectComponent.prototype, "valuesTranslated", void 0);
    SelectComponent = __decorate([
        Component({
            selector: 'samplicity-select',
            templateUrl: './select.component.html',
            styleUrls: ['./select.component.scss']
        }),
        __metadata("design:paramtypes", [LocaleService, ChangeDetectorRef])
    ], SelectComponent);
    return SelectComponent;
}(FieldBaseComponent));
export { SelectComponent };
//# sourceMappingURL=select.component.js.map