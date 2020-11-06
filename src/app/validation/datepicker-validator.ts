import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
    selector: '[sgValidateDatePicker][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DatePickerValidatorDirective), multi: true }
    ]
})
/* tslint:disable */
export class DatePickerValidatorDirective implements Validator {
    constructor( @Attribute('sgValidateDatePicker') public sgValidateDatePicker) { }

    validate(c: AbstractControl): {} {
        const v = c.value;
        let response;
        if (v === null || typeof v === 'undefined' || v.date === null || v === "") {
            response = { sgValidateDatePicker: false };
        } else {
            response = null;
        }
        return response;
    }
}
/* tslint:enable */
