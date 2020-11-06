import { __decorate, __metadata } from "tslib";
import { Component, Input, ViewChild, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { LocaleService } from 'angular-l10n';
var MultiSelectComponent = /** @class */ (function () {
    function MultiSelectComponent(locale) {
        this.locale = locale;
        this.change = new EventEmitter();
        this.disabledItem = false;
        this.outputIds = true;
        this.idProperty = 'value';
        this.namesProperty = 'names';
        this.readonly = false;
        this.sort = true;
        this.multiSort = false;
        this.selectAll = false;
        this.noWell = false;
        this.labelTranslated = true;
        this.renderPanel = false;
    }
    MultiSelectComponent_1 = MultiSelectComponent;
    Object.defineProperty(MultiSelectComponent.prototype, "selectedItems", {
        get: function () {
            var control = this.parentFormGroup.get(this.name);
            if (control.value) {
                return control.value;
            }
            else {
                return [];
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "allItemsSelected", {
        get: function () {
            return (this.selectedItems && this.listItems) ? (this.selectedItems.length === this.listItems.length) : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "currentLanguage", {
        get: function () {
            return this.locale.getCurrentLanguage();
        },
        enumerable: false,
        configurable: true
    });
    MultiSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.languageSub = this.locale.defaultLocaleChanged.subscribe(function () {
            _this.sortItems();
        });
        if (this.multiSort) {
            this.sortItemsByAlphaAndChecked();
        }
        if (this.collapsible) {
            setTimeout(function () { return _this.renderPanel = true; }, 1);
        }
    };
    MultiSelectComponent.prototype.ngOnChanges = function (changes) {
        if (changes.listItems && this.listItems.length > 0) {
            if (this.multiSort) {
                this.sortItemsByAlphaAndChecked();
            }
            else {
                this.sortItems();
            }
        }
    };
    MultiSelectComponent.prototype.trackById = function (index, item) {
        return item[this.idProperty];
    };
    MultiSelectComponent.prototype.onSelectAll = function (event) {
        var _this = this;
        if (event.checked) {
            var listItemIds = this.listItems.map(function (x) { return x[_this.idProperty]; });
            this.parentFormGroup.get(this.name).setValue(listItemIds);
            this.change.emit(listItemIds);
        }
        else {
            this.parentFormGroup.get(this.name).setValue([]);
            this.change.emit([]);
        }
    };
    MultiSelectComponent.prototype.onSelect = function (event, item) {
        var _this = this;
        var index = this.selectedItems.findIndex(function (x) { return x === item[_this.idProperty]; });
        var listItemIds = this.selectedItems.map(function (x) { return x; });
        if (event.checked) {
            if (index === -1) {
                listItemIds.push(item[this.idProperty]);
            }
        }
        else {
            if (index > -1) {
                listItemIds.splice(index, 1);
            }
        }
        this.parentFormGroup.get(this.name).setValue(listItemIds);
        this.change.emit(listItemIds);
    };
    MultiSelectComponent.prototype.checkSelected = function (item) {
        var _this = this;
        return this.selectedItems.some(function (x) { return x === item[_this.idProperty]; });
    };
    MultiSelectComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabledItem = isDisabled;
    };
    MultiSelectComponent.prototype.sortItems = function () {
        var _this = this;
        if (this.sort) {
            this.listItems.sort(function (a, b) {
                var firstName = _this.getNameForSort(a);
                var secondName = _this.getNameForSort(b);
                return firstName['value'].localeCompare(secondName['value']);
            });
        }
    };
    MultiSelectComponent.prototype.sortItemsByAlphaAndChecked = function () {
        var _this = this;
        this.sortItems();
        var removedListItems = new Array();
        var newListItems = new Array();
        var selectedItemsIds = new Array();
        selectedItemsIds = this.selectedItems.map(function (item) { return item['id']; });
        this.listItems.forEach(function (item) {
            if (selectedItemsIds.indexOf(item['id']) > -1) {
                removedListItems.push(item);
            }
            else {
                newListItems.push(item);
            }
        });
        this.listItems = newListItems;
        removedListItems.reverse().forEach(function (item) { return _this.listItems.unshift(item); });
    };
    MultiSelectComponent.prototype.getNameForSort = function (item) {
        var _this = this;
        return item[this.namesProperty].find(function (i) { return i['language'] === _this.locale.getCurrentLanguage(); });
    };
    MultiSelectComponent.prototype.ngOnDestroy = function () {
        this.languageSub.unsubscribe();
    };
    var MultiSelectComponent_1;
    __decorate([
        ViewChild('selectAll', { static: false }),
        __metadata("design:type", MatCheckbox)
    ], MultiSelectComponent.prototype, "selectAllButton", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], MultiSelectComponent.prototype, "change", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectComponent.prototype, "disabledItem", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MultiSelectComponent.prototype, "listItems", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectComponent.prototype, "outputIds", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectComponent.prototype, "idProperty", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectComponent.prototype, "namesProperty", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MultiSelectComponent.prototype, "namesTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MultiSelectComponent.prototype, "collapsible", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectComponent.prototype, "readonly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectComponent.prototype, "sort", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectComponent.prototype, "multiSort", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectComponent.prototype, "selectAll", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelectComponent.prototype, "selectAllText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelectComponent.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelectComponent.prototype, "maxHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], MultiSelectComponent.prototype, "parentFormGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelectComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectComponent.prototype, "noWell", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectComponent.prototype, "labelTranslated", void 0);
    MultiSelectComponent = MultiSelectComponent_1 = __decorate([
        Component({
            selector: 'samplicity-multi-select',
            templateUrl: './multi-select.component.html',
            styleUrls: ['./multi-select.component.scss'],
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return MultiSelectComponent_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [LocaleService])
    ], MultiSelectComponent);
    return MultiSelectComponent;
}());
export { MultiSelectComponent };
//# sourceMappingURL=multi-select.component.js.map