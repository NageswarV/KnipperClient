import { __decorate, __extends, __metadata } from "tslib";
import { Component, ChangeDetectorRef, Input, ViewEncapsulation } from '@angular/core';
import { MultiSelectWrapperComponent } from '../multi-select-wrapper/multi-select-wrapper.component';
import { FormBuilder } from '@angular/forms';
import { LocaleService } from 'angular-l10n';
import { HelpersService } from '../../../core/helpers.service';
var MultiSelectListComponent = /** @class */ (function (_super) {
    __extends(MultiSelectListComponent, _super);
    function MultiSelectListComponent(locale, cd, helpers, fb) {
        var _this = _super.call(this, cd) || this;
        _this.locale = locale;
        _this.helpers = helpers;
        _this.fb = fb;
        _this.titleProperty = 'names';
        _this.readonly = false;
        _this.isInvalid = false;
        _this.labelTranslated = true;
        return _this;
    }
    MultiSelectListComponent.prototype.ngOnInit = function () {
        this.searchForm = this.fb.group({
            search: ['']
        });
    };
    MultiSelectListComponent.prototype.ngOnChanges = function (changes) {
        if (changes && changes.listItems) {
            this.onSearch();
        }
    };
    MultiSelectListComponent.prototype.onSearch = function (term) {
        var _this = this;
        if (this.listItems) {
            if (term) {
                var filtered_1 = [];
                this.listItems.forEach(function (listItem) {
                    var item = _this.helpers.deepCopy(listItem);
                    if (item[_this.groupProperty]) {
                        item[_this.groupProperty] = item[_this.groupProperty].filter(function (item) {
                            if (_this.filterFn) {
                                return _this.filterFn(item, term);
                            }
                            return _this.defaultFilterFn(item, term);
                        });
                    }
                    filtered_1.push(item);
                });
                this.filteredItems = filtered_1;
            }
            else {
                this.filteredItems = this.listItems;
            }
        }
    };
    MultiSelectListComponent.prototype.defaultFilterFn = function (item, term) {
        if (item && item.names && item.names.length) {
            var language_1 = this.locale.getCurrentLanguage();
            var name_1 = item.names.find(function (item) { return item.language.toString() === language_1; });
            if (name_1 && name_1.value && name_1.value.toLowerCase().indexOf(term.toLowerCase()) >= 0) {
                return true;
            }
        }
        return false;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelectListComponent.prototype, "groupProperty", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelectListComponent.prototype, "titleProperty", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], MultiSelectListComponent.prototype, "filterFn", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MultiSelectListComponent.prototype, "readonly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiSelectListComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MultiSelectListComponent.prototype, "isInvalid", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], MultiSelectListComponent.prototype, "labelTranslated", void 0);
    MultiSelectListComponent = __decorate([
        Component({
            selector: 'samplicity-multi-select-list',
            templateUrl: './multi-select-list.component.html',
            styleUrls: ['./multi-select-list.component.scss'],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [LocaleService,
            ChangeDetectorRef,
            HelpersService,
            FormBuilder])
    ], MultiSelectListComponent);
    return MultiSelectListComponent;
}(MultiSelectWrapperComponent));
export { MultiSelectListComponent };
//# sourceMappingURL=multi-select-list.component.js.map