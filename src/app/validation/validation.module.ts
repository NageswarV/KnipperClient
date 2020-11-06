import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalizationModule } from 'angular-l10n';

import { FieldValidationComponent } from './field-validation.component';
import { ValidationComponent } from './validation.component';
import { ValidationService } from './validation.service';
import { DatePickerValidatorDirective } from './datepicker-validator';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LocalizationModule
    ],
    declarations: [
        ValidationComponent,
        FieldValidationComponent,
        DatePickerValidatorDirective
    ],
    providers: [
        ValidationService
    ],
    exports: [
        ValidationComponent,
        FieldValidationComponent,
        DatePickerValidatorDirective
    ]
})
export class ValidationModule {}
