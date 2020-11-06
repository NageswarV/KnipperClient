// custom validator to check that two fields match
export function MustMatch(controlName, matchingControlName) {
    return function (formGroup) {
        var control = formGroup.controls[controlName];
        var matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        }
        else {
            matchingControl.setErrors(null);
        }
    };
}
export function domainRestriction(domains) {
    return function (control) {
        if (control.value && control.value !== "" && control.value.indexOf("@") != -1 && !(control.errors) && (isNaN(control.value) && domains.length > 0)) {
            var keyedValue = control.value.split('@')[1];
            if (!domains.includes(keyedValue)) {
                return { 'domain': true };
            }
            else
                return null;
        }
        return null;
    };
}
export function conditionalValidator(condition, validator) {
    return function (control) {
        if (!condition()) {
            return null;
        }
        return validator(control);
    };
}
//# sourceMappingURL=must-match.validator.js.map