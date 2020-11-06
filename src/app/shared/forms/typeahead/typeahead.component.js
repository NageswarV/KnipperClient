import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { Language, LocaleService } from 'angular-l10n';
import { Item } from '../../../core/classification.service';
var TypeaheadComponent = /** @class */ (function (_super) {
    __extends(TypeaheadComponent, _super);
    function TypeaheadComponent(locale, cd) {
        var _this = _super.call(this, cd) || this;
        _this.locale = locale;
        _this.search = new EventEmitter();
        _this.optionSelected = new EventEmitter();
        _this.valueProp = 'names';
        _this.keepInvalidTextOnBlur = false;
        _this.maxLength = 500;
        _this.labelTranslated = true;
        //Added because some components would benefit from notifications from changes from length 1 to 0.
        //Defaulted to 1 so as to not break any components dependent on the existing implementation.
        _this.minLengthForChangeNotification = 1;
        _this.validState = true;
        return _this;
    }
    TypeaheadComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.control) {
            this.control.valueChanges.filter(function (x) { return x && x.length > _this.minLengthForChangeNotification; }).forEach(function (str) {
                _this.search.emit(str);
            });
        }
    };
    TypeaheadComponent.prototype.displayFn = function (item) {
        if (item) {
            if (item.names && item.names.length) {
                var language_1 = this.locale.getCurrentLanguage();
                return item.names.find(function (name) { return name['language'] === language_1; }).value;
            }
            else if (this.codeProperty) {
                return item[this.codeProperty];
            }
        }
        return '';
    };
    TypeaheadComponent.prototype.searchOptionSelected = function (matAutoSelEvt) {
        this.validState = true;
        this.control.setValue(matAutoSelEvt.option.value);
        this.optionSelected.emit(matAutoSelEvt.option.value);
    };
    TypeaheadComponent.prototype.onInputBlur = function () {
        if (!this.validState && !this.keepInvalidTextOnBlur) {
            this.control.setValue('');
            this.typeaheadErrors = [];
        }
        if (!(this.control.value instanceof Item)) {
            this.control.setValue('');
            this.typeaheadErrors = [];
        }
    };
    TypeaheadComponent.prototype.onInputChange = function () {
        this.validState = false;
    };
    TypeaheadComponent.prototype.onInputFocus = function () {
        this.items = [];
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TypeaheadComponent.prototype, "search", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TypeaheadComponent.prototype, "optionSelected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], TypeaheadComponent.prototype, "items", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TypeaheadComponent.prototype, "codeProperty", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], TypeaheadComponent.prototype, "typeaheadErrors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TypeaheadComponent.prototype, "valueProp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TypeaheadComponent.prototype, "keepInvalidTextOnBlur", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TypeaheadComponent.prototype, "maxLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TypeaheadComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TypeaheadComponent.prototype, "labelTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TypeaheadComponent.prototype, "minLengthForChangeNotification", void 0);
    __decorate([
        Language(),
        __metadata("design:type", String)
    ], TypeaheadComponent.prototype, "lang", void 0);
    TypeaheadComponent = __decorate([
        Component({
            selector: 'samplicity-typeahead',
            templateUrl: './typeahead.component.html',
            styleUrls: ['./typeahead.component.scss']
        }),
        __metadata("design:paramtypes", [LocaleService, ChangeDetectorRef])
    ], TypeaheadComponent);
    return TypeaheadComponent;
}(FieldBaseComponent));
export { TypeaheadComponent };
//# sourceMappingURL=typeahead.component.js.map