import { __decorate, __metadata, __param } from "tslib";
import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
var DatePickerValidatorDirective = /** @class */ (function () {
    function DatePickerValidatorDirective(sgValidateDatePicker) {
        this.sgValidateDatePicker = sgValidateDatePicker;
    }
    DatePickerValidatorDirective_1 = DatePickerValidatorDirective;
    DatePickerValidatorDirective.prototype.validate = function (c) {
        var v = c.value;
        var response;
        if (v === null || typeof v === 'undefined' || v.date === null || v === "") {
            response = { sgValidateDatePicker: false };
        }
        else {
            response = null;
        }
        return response;
    };
    var DatePickerValidatorDirective_1;
    DatePickerValidatorDirective = DatePickerValidatorDirective_1 = __decorate([
        Directive({
            selector: '[sgValidateDatePicker][ngModel]',
            providers: [
                { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return DatePickerValidatorDirective_1; }), multi: true }
            ]
        })
        /* tslint:disable */
        ,
        __param(0, Attribute('sgValidateDatePicker')),
        __metadata("design:paramtypes", [Object])
    ], DatePickerValidatorDirective);
    return DatePickerValidatorDirective;
}());
export { DatePickerValidatorDirective };
/* tslint:enable */
//# sourceMappingURL=datepicker-validator.js.map