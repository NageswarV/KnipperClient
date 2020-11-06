import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslationService } from 'angular-l10n';

@Component({
  selector: 'samplicity-field-errors',
  templateUrl: './field-errors.component.html',
  styleUrls: ['./field-errors.component.scss']
})
export class FieldErrorsComponent {

  private static readonly errorMessages = {
    'required': () => FieldErrorsComponent.translationService.translate('Validation.Required'),
    'minlength': (params) => FieldErrorsComponent.translationService.translate('Validation.MinLength').replace('$0', params.requiredLength),
    'maxlength': (params) => FieldErrorsComponent.translationService.translate('Validation.MaxLength').replace('$0', params.requiredLength),
    'matDatepickerParse': () => FieldErrorsComponent.translationService.translate('Validation.DatepickerParse'),
    'matDatepickerMin': () => FieldErrorsComponent.translationService.translate('Validation.DatepickerParse'),
    'matDatepickerMax': () => FieldErrorsComponent.translationService.translate('Validation.DatepickerParse'),
    'matDatepickerFilter': () => FieldErrorsComponent.translationService.translate('Validation.DatepickerParse'),
    'min': (params) => FieldErrorsComponent.translationService.translate('Validation.Min').replace('$0', params.min),
    'max': (params) => FieldErrorsComponent.translationService.translate('Validation.Max').replace('$0', params.max),
    'serverValidation': (params) => params,
    'minimumScaleRangeEnd': () => FieldErrorsComponent.translationService.translate('Validation.UpperRangeValue'),
    'customError': (params) => FieldErrorsComponent.translationService.translate(params),
    'customErrorText': (params) => params,
    'doubleEntry': () => FieldErrorsComponent.translationService.translate('Validation.DoubleEntry'),
    'doubleEntryNoText': () => {},
    'invalidEmail': () => FieldErrorsComponent.translationService.translate('Validation.InvalidEmail'),
    'invalidPhoneLength': () => FieldErrorsComponent.translationService.translate('Validation.InvalidPhoneLength'),
    'invalidZipcode': () => FieldErrorsComponent.translationService.translate('Validation.InvalidZipcode'),
    'pastDate': () => FieldErrorsComponent.translationService.translate('Validation.DatePickerPast')
  };

  private static translationService: TranslationService;

  @Input() control: AbstractControl;
  @Input() message: string;

  constructor(translationService: TranslationService) {
    if (!FieldErrorsComponent.translationService) {
      FieldErrorsComponent.translationService = translationService;
    }
  }

  get shouldShowErrors(): boolean {
    return this.control != null &&
      this.control.errors != null &&
      (this.control.dirty && this.control.touched);
  }

  listOfErrors(): string[] {
    const errors = Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors![field]));
    // Use concat to flatten any nested arrays
    return [].concat.apply([], errors);
  }

  getControlName(): string | null {
    const formGroup = this.control.parent.controls;
    return Object.keys(formGroup).find(name => this.control === formGroup[name]) || null;
  }

  getErrorMessages(control: AbstractControl) {
    if (control.parent) {
      return this.getErrorMessages(control.parent);
    } else {
      return control['_errorMessages'];
    }
  }

  private getMessage(type: string, params: any) {
    const customErrors = this.getErrorMessages(this.control);
    if (customErrors) {
      const controlName = this.getControlName();
      if (controlName && customErrors[controlName] && customErrors[controlName][type]) {
        return customErrors[controlName][type](params);
      }
    }
    if (this.message) {
      return this.message;
    } else {
      return FieldErrorsComponent.errorMessages[type](params);
    }
  }

}
