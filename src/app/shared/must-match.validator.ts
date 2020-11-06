import { FormGroup, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) : ValidatorFn{
    return (formGroup: FormGroup) : ValidationErrors => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}


export function domainRestriction(domains : string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value && control.value !== "" &&  control.value.indexOf("@") != -1 && !(control.errors)  && (isNaN(control.value) && domains.length >0)) {
           let keyedValue = control.value.split('@')[1];
            if(!domains.includes(keyedValue))
            {
               return { 'domain': true };
            }
            else return null;
        }
        return null;
    };
}

export function conditionalValidator(condition: (() => boolean), validator: ValidatorFn): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (! condition()) {
        return null;
      }
      return validator(control);
    }
  }

