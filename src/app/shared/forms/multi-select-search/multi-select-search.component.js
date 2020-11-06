import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { SearchInputComponent } from '../search-input/search-input.component';
import { FormBuilder } from '@angular/forms';
import { LocaleService } from 'angular-l10n';
import { MatRadioGroup } from '@angular/material/radio';
var MultiSelectSearchComponent = /** @class */ (function (_super) {
    __extends(MultiSelectSearchComponent, _super);
    function MultiSelectSearchComponent(locale, fb) {
        var _this = _super.call(this) || this;
        _this.locale = locale;
        _this.fb = fb;
        return _this;
    }
    MultiSelectSearchComponent.prototype.ngOnInit = function () {
        this.searchForm = this.fb.group({
            search: ['']
        });
    };
    MultiSelectSearchComponent.prototype.ngOnChanges = function (changes) {
        if (changes && changes.items) {
            this.onSearch();
            var value = this.control ? this.control.value : null;
            if (value) {
                if (value.length) {
                    this.group.value = 'select';
                }
                else {
                    this.group.value = 'all';
                }
            }
        }
    };
    MultiSelectSearchComponent.prototype.onSearch = function (term) {
        var _this = this;
        if (this.items) {
            if (term) {
                this.filteredItems = this.items.filter(function (item) {
                    if (_this.filterFn) {
                        return _this.filterFn(item, term);
                    }
                    return _this.defaultFilterFn(item, term);
                });
            }
            else {
                this.filteredItems = this.items;
            }
        }
    };
    MultiSelectSearchComponent.prototype.defaultFilterFn = function (item, term) {
        if (item && item.names && item.names.length) {
            var language_1 = this.locale.getCurrentLanguage();
            var name_1 = item.names.find(function (item) { return item.language.toString() === language_1; });
            if (name_1 && name_1.value && name_1.value.toLowerCase().indexOf(term.toLowerCase()) >= 0) {
                return true;
            }
        }
        return false;
    };
    MultiSelectSearchComponent.prototype.reset = function () {
        if (this.control) {
            var value = this.control ? this.control.value : null;
            if (value) {
                if (value.length) {
                    this.group.value = 'select';
                }
                else {
                    this.group.value = 'all';
                }
            }
            this.search.control.setValue("");
            this.onSearch();
        }
    };
    MultiSelectSearchComponent.prototype.onSelectAll = function () {
        if (this.control) {
            this.control.setValue([]);
        }
    };
    __decorate([
        ViewChild('group', { static: false }),
        __metadata("design:type", MatRadioGroup)
    ], MultiSelectSearchComponent.prototype, "group", void 0);
    __decorate([
        ViewChild('search', { static: false }),
        __metadata("design:type", SearchInputComponent)
    ], MultiSelectSearchComponent.prototype, "search", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MultiSelectSearchComponent.prototype, "items", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelectSearchComponent.prototype, "idProperty", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], MultiSelectSearchComponent.prototype, "filterFn", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelectSearchComponent.prototype, "allLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelectSearchComponent.prototype, "selectLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelectSearchComponent.prototype, "height", void 0);
    MultiSelectSearchComponent = __decorate([
        Component({
            selector: 'samplicity-multi-select-search',
            templateUrl: './multi-select-search.component.html',
            styleUrls: ['./multi-select-search.component.scss']
        }),
        __metadata("design:paramtypes", [LocaleService,
            FormBuilder])
    ], MultiSelectSearchComponent);
    return MultiSelectSearchComponent;
}(FieldBaseComponent));
export { MultiSelectSearchComponent };
//# sourceMappingURL=multi-select-search.component.js.map