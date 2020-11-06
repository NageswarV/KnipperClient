import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslationService } from 'angular-l10n';
var FieldErrorsComponent = /** @class */ (function () {
    function FieldErrorsComponent(translationService) {
        if (!FieldErrorsComponent_1.translationService) {
            FieldErrorsComponent_1.translationService = translationService;
        }
    }
    FieldErrorsComponent_1 = FieldErrorsComponent;
    Object.defineProperty(FieldErrorsComponent.prototype, "shouldShowErrors", {
        get: function () {
            return this.control != null &&
                this.control.errors != null &&
                (this.control.dirty && this.control.touched);
        },
        enumerable: false,
        configurable: true
    });
    FieldErrorsComponent.prototype.listOfErrors = function () {
        var _this = this;
        var errors = Object.keys(this.control.errors)
            .map(function (field) { return _this.getMessage(field, _this.control.errors[field]); });
        // Use concat to flatten any nested arrays
        return [].concat.apply([], errors);
    };
    FieldErrorsComponent.prototype.getControlName = function () {
        var _this = this;
        var formGroup = this.control.parent.controls;
        return Object.keys(formGroup).find(function (name) { return _this.control === formGroup[name]; }) || null;
    };
    FieldErrorsComponent.prototype.getErrorMessages = function (control) {
        if (control.parent) {
            return this.getErrorMessages(control.parent);
        }
        else {
            return control['_errorMessages'];
        }
    };
    FieldErrorsComponent.prototype.getMessage = function (type, params) {
        var customErrors = this.getErrorMessages(this.control);
        if (customErrors) {
            var controlName = this.getControlName();
            if (controlName && customErrors[controlName] && customErrors[controlName][type]) {
                return customErrors[controlName][type](params);
            }
        }
        if (this.message) {
            return this.message;
        }
        else {
            return FieldErrorsComponent_1.errorMessages[type](params);
        }
    };
    var FieldErrorsComponent_1;
    FieldErrorsComponent.errorMessages = {
        'required': function () { return FieldErrorsComponent_1.translationService.translate('Validation.Required'); },
        'minlength': function (params) { return FieldErrorsComponent_1.translationService.translate('Validation.MinLength').replace('$0', params.requiredLength); },
        'maxlength': function (params) { return FieldErrorsComponent_1.translationService.translate('Validation.MaxLength').replace('$0', params.requiredLength); },
        'matDatepickerParse': function () { return FieldErrorsComponent_1.translationService.translate('Validation.DatepickerParse'); },
        'matDatepickerMin': function () { return FieldErrorsComponent_1.translationService.translate('Validation.DatepickerParse'); },
        'matDatepickerMax': function () { return FieldErrorsComponent_1.translationService.translate('Validation.DatepickerParse'); },
        'matDatepickerFilter': function () { return FieldErrorsComponent_1.translationService.translate('Validation.DatepickerParse'); },
        'min': function (params) { return FieldErrorsComponent_1.translationService.translate('Validation.Min').replace('$0', params.min); },
        'max': function (params) { return FieldErrorsComponent_1.translationService.translate('Validation.Max').replace('$0', params.max); },
        'serverValidation': function (params) { return params; },
        'minimumScaleRangeEnd': function () { return FieldErrorsComponent_1.translationService.translate('Validation.UpperRangeValue'); },
        'customError': function (params) { return FieldErrorsComponent_1.translationService.translate(params); },
        'customErrorText': function (params) { return params; },
        'doubleEntry': function () { return FieldErrorsComponent_1.translationService.translate('Validation.DoubleEntry'); },
        'doubleEntryNoText': function () { },
        'invalidEmail': function () { return FieldErrorsComponent_1.translationService.translate('Validation.InvalidEmail'); },
        'invalidPhoneLength': function () { return FieldErrorsComponent_1.translationService.translate('Validation.InvalidPhoneLength'); },
        'invalidZipcode': function () { return FieldErrorsComponent_1.translationService.translate('Validation.InvalidZipcode'); },
        'pastDate': function () { return FieldErrorsComponent_1.translationService.translate('Validation.DatePickerPast'); }
    };
    __decorate([
        Input(),
        __metadata("design:type", AbstractControl)
    ], FieldErrorsComponent.prototype, "control", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FieldErrorsComponent.prototype, "message", void 0);
    FieldErrorsComponent = FieldErrorsComponent_1 = __decorate([
        Component({
            selector: 'samplicity-field-errors',
            templateUrl: './field-errors.component.html',
            styleUrls: ['./field-errors.component.scss']
        }),
        __metadata("design:paramtypes", [TranslationService])
    ], FieldErrorsComponent);
    return FieldErrorsComponent;
}());
export { FieldErrorsComponent };
//# sourceMappingURL=field-errors.component.js.map