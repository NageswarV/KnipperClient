import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { Language, TranslationService } from 'angular-l10n';
var SearchInputComponent = /** @class */ (function (_super) {
    __extends(SearchInputComponent, _super);
    function SearchInputComponent(translationService) {
        var _this = _super.call(this) || this;
        _this.translationService = translationService;
        _this.search = new EventEmitter();
        _this.type = 'text';
        _this.placeholder = 'SearchPlaceholder';
        return _this;
    }
    SearchInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.translatedPlaceholder = this.translationService.translate(this.placeholder);
        this.translationService.translationChanged().subscribe(function () { return _this.translatedPlaceholder = _this.translationService.translate('SearchPlaceholder'); });
    };
    SearchInputComponent.prototype.ngOnChanges = function (changes) {
        if (changes.placeholder && changes.placeholder.currentValue) {
            this.translatedPlaceholder = this.translationService.translate(this.placeholder);
        }
    };
    SearchInputComponent.prototype.onSearch = function () {
        if (this.parentFormGroup.valid) {
            this.search.emit(this.control.value);
        }
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SearchInputComponent.prototype, "search", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SearchInputComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SearchInputComponent.prototype, "maxLength", void 0);
    __decorate([
        Language(),
        __metadata("design:type", String)
    ], SearchInputComponent.prototype, "lang", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SearchInputComponent.prototype, "placeholder", void 0);
    SearchInputComponent = __decorate([
        Component({
            selector: 'samplicity-search-input',
            templateUrl: './search-input.component.html',
            styleUrls: ['./search-input.component.scss']
        }),
        __metadata("design:paramtypes", [TranslationService])
    ], SearchInputComponent);
    return SearchInputComponent;
}(FieldBaseComponent));
export { SearchInputComponent };
//# sourceMappingURL=search-input.component.js.map