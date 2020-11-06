import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';

export abstract class BaseChildValidationComponent {
  @ViewChild(NgForm, { static: false }) protected componentForm: NgForm;

    isValid(): boolean {
        if (this.componentForm) {
            return this.componentForm.form.valid;
        }
        return true;
    }
}
