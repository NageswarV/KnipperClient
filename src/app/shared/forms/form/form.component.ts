import { Component, OnInit, Input, ViewChild, Output, EventEmitter, HostListener, Inject, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TranslationService } from 'angular-l10n';
import { NotificationComponent } from '../../components/notification/notification.component';
import { MapperService } from '../../../core/mapper.service';
import { HelpersService } from '../../../core/helpers.service';
import { SpinnerOverlayComponent } from '../../../shared/components/spinner-overlay/spinner-overlay.component';
import { AppConsts } from '../../../shared/app-consts';
import 'rxjs/add/operator/finally';

export interface FormCustomAction {
  name: string;
  label: string;
  color: string;
  icon: string;
}

export class GenericDialogProperties {
  type: GenericDialogType;
  title: string;
  message: string;
  message2: string;
  translateMessage = true;
  button1Text: string;
  button1Show: boolean;
  button1Event: EventEmitter<any>;
  button2Text: string;
  button2Show: boolean;
  button2Event: EventEmitter<any>;
}

export class CustomError {
  code: number;
  message: string;
  details?: string;
}

export enum GenericDialogType {
  Info,
  Error,
  Warning,
  Success
}

@Component({
  selector: 'samplicity-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @ViewChild('genericDialog', {static:false}) private genericDialog;
  @ViewChild('discardDialog', { static: false }) private discardDialog;
  @ViewChild('unsavedDialog', { static: false }) private unsavedDialog;
  @ViewChild('notificationWindow', { static: false }) notificationWindow: NotificationComponent;
  @ViewChild('notificationWindow2', { static: false }) notificationWindow2: NotificationComponent;
  @ViewChild('notificationWindow3', { static: false }) notificationWindow3: NotificationComponent;
  @ViewChild('spinnerOverlay', { static: false }) spinnerOverlay: SpinnerOverlayComponent;
  @Output() private save: EventEmitter<any> = new EventEmitter();
  @Output() private discard: EventEmitter<any> = new EventEmitter();
  @Output() private action: EventEmitter<string> = new EventEmitter();
  @Output() private resetEvent: EventEmitter<any> = new EventEmitter();
  @Output() private customError: EventEmitter<CustomError> = new EventEmitter();
  @Output() formNotificationWindow: EventEmitter<object> = new EventEmitter();
  @Output() formNotificationWindow2: EventEmitter<object> = new EventEmitter();
  @Output() formNotificationWindow3: EventEmitter<object> = new EventEmitter();
  @Input() private objectName: string;
  @Input() objectNameAlreadyTranslated: boolean;
  @Input() saveButton: string;
  @Input() saveButtonColor: string;
  @Input() hideSaveButton = false;
  @Input() isCreatingNew = false;
  @Input() isSavable = true;
  @Input() private emitResetEvent = true;
  @Input() private customActions: FormCustomAction[];
  @Input() hideSnackBar = false;
  @Input() hideNotificationWindow = false;
  @Input() alwaysShowSnackbar = false;
  @Input() alwaysShowSaveButton = false;
  @Input() readonly = false;
  @Input() spinnerText = 'Spinner.Saving';
  @Input() formArrayKeys = [];
  @Input() formGroupKeys = [];
  @Input() formGroup: FormGroup;
  @Input() menuState: boolean;
  dialogRef: MatDialogRef<any>;
  initialFormValue = {};
  initialModel = {};
  initialValidators = {};
  modelClassName: string;
  futureUrl: string;
  isFutureUrlRelative: boolean;
  navigateCallback: (() => void) | null;
  hasRequiredValidationErrors: boolean;
  hasClientSideErrors = false;
  isSaving$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  bypassCanDeactivateGuard = false;
  itemId: string;

  /** Additional Modal properties values */
  genericDialogProperties: GenericDialogProperties;
  genericDialogButton1Color: string;
  genericDialogButton2Color: string;
  genericDialogClass: string;

  get isReadOnly(): boolean {
    return this.readonly;
  }

  get formIsDirty(): boolean {
    if (this.bypassCanDeactivateGuard) {
      return false;
    }
    if (this.formGroup) {
      const dirty = this.formGroup.dirty;
      if (dirty) {
        this.document.body.classList.add('snackbar-spacer');
      } else {
        this.document.body.classList.remove('snackbar-spacer');
      }
      return dirty;
    }
    return false;
  }

  constructor(
    @Inject(DOCUMENT) private document,
    private translationService: TranslationService,
    private helpers: HelpersService,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private mapper: MapperService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.created) {
        let objectName: string;
        if (!this.objectNameAlreadyTranslated) {
          objectName = this.translationService.translate(this.objectName);
        } else {
          objectName = this.objectName;
        }
        const successMessage = this.translationService.translate('Notifications.CreatedSuccess').replace('$0', objectName);
        this.notificationWindow.displaySuccessMessage(successMessage, 'Notifications.SuccessTitleDefault');
        this.formNotificationWindow.emit({ event: this.notificationWindow, type: GenericDialogType.Success, msg: successMessage });
      }
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  needDeactivateConfirmation($event) {
    if ($event) {
      if (this.formIsDirty) {
        $event.returnValue = this.translationService.translate('Forms.UnsavedChangesMessage');
      }
    }
  }

  isLocalizedValue(val): boolean {
    return val && Array.isArray(val) && val.length > 0 && val[0].language;
  }

  isKeyFormGroup(key: string): boolean {
    // key.startsWith(AppConsts.nestedFormGroupProp);
    return this.formGroupKeys.some(x => x === key);
  }

  isKeyFormArray(key: string): boolean {
    // return key.startsWith(AppConsts.formArrayMapperProp);
    return this.formArrayKeys.some(x => x === key);
  }

  initializeFormGroup(formModel: object, validators: object, modelClassName: string, errorMessages?: object): void {
    this.modelClassName = modelClassName;
    const formGroupModel = this.mapper.map(this.modelClassName, AppConsts.mapperFgm, formModel);
    if (this.formGroup) {
      // Reactive form setValue doesn't like undefined values
      // which might be coming from 3rd party libraries
      for (const key in formGroupModel) {
        if (formGroupModel[key] === undefined) {
          formGroupModel[key] = null;
        }
      }
      this.initializeFormArrays(formGroupModel, validators, true);
      this.initializeNestedFormGroups(formGroupModel, validators, true);
      this.formGroup.patchValue(formGroupModel);
    } else {
      for (const key in formGroupModel) {
        if (!this.isKeyFormArray(key) && !this.isKeyFormGroup(key)) {
          formGroupModel[key] = [formGroupModel[key], validators[key]];
        }
      }
      this.formGroup = this.fb.group(formGroupModel);
      this.initializeFormArrays(formGroupModel, validators);
      this.initializeNestedFormGroups(formGroupModel, validators);
    }
    if (errorMessages) {
      this.formGroup['_errorMessages'] = errorMessages;
    }
    this.initialFormValue = this.helpers.deepCopy(this.formGroup.value);
    this.initialModel = this.helpers.deepCopy(formModel);
    this.initialValidators = validators;
  }

  initializeFormArrays(model: object, validators: object, update = false, formGroup?: FormGroup): void {
    for (const key in model) {
      if (this.isKeyFormArray(key)) {
        const tempModel = this.helpers.deepCopy(model[key]);
        const nonControlsTempModel = [];
        const array = tempModel.map((item, index) => {
          const arrayKey = key;
          nonControlsTempModel[index] = {};
          if (validators && validators[arrayKey]) {
            for (const itemKey in item) {
              if (!this.isKeyFormArray(itemKey) && !this.isKeyFormGroup(itemKey)) {
                if (validators[arrayKey][itemKey]) {
                  item[itemKey] = [item[itemKey], validators[arrayKey][itemKey]];
                } else {
                  item[itemKey] = [item[itemKey]];
                }
              } else if (this.isKeyFormArray(itemKey)) {
                nonControlsTempModel[index][itemKey] = tempModel[index][itemKey];
                delete tempModel[index][itemKey];
              } else if (this.isKeyFormGroup(itemKey)) {
                nonControlsTempModel[index][itemKey] = tempModel[index][itemKey];
                delete tempModel[index][itemKey];

              }
            }
          }
          const newGroup = this.fb.group(item);
          const newValidators = (validators && validators[arrayKey]) ? validators[arrayKey] : {};

          this.initializeNestedFormGroups(nonControlsTempModel[index], newValidators, update, newGroup);

          this.initializeFormArrays(nonControlsTempModel[index], newValidators, update, newGroup);
          return newGroup;
        });
        if (!formGroup) {
          this.formGroup.setControl(key, this.fb.array(array));
        } else {
          formGroup.setControl(key, this.fb.array(array));
        }
      }
    }
  }

  initializeNestedFormGroups(model: object, validators: object, update = false, group?: FormGroup): void {
    for (const modelKey in model) {
      if (this.isKeyFormGroup(modelKey) && model[modelKey]) {
        const controlsModel = this.helpers.deepCopy(model[modelKey]);
        const nonControlsModel = {};
        const groupKey = modelKey;
        for (const key in controlsModel) {
          if (!this.isKeyFormArray(key) && !this.isKeyFormGroup(key)) {
            if (validators && validators[groupKey] && validators[groupKey][key]) {
              controlsModel[key] = [controlsModel[key], validators[groupKey][key]];
            } else {
              controlsModel[key] = [controlsModel[key]];
            }
          } else {
            nonControlsModel[key] = controlsModel[key];
            delete controlsModel[key];
          }
        }
        const newNestedGroup = this.fb.group(controlsModel);
        if (!group) {
          group = this.formGroup;
        }
        const newValidators = (validators && validators[modelKey]) ? validators[modelKey] : {};
        this.initializeFormArrays(nonControlsModel, newValidators, false, newNestedGroup);
        if (group.get(modelKey) instanceof FormGroup) {
          const formGroup = group.get(modelKey) as FormGroup;
          group.get(modelKey).patchValue(newNestedGroup);

          // Check for nested FormArrays
          Object.keys(formGroup.controls).forEach(key => {
            if (formGroup.get(key) instanceof FormArray) {
              formGroup.setControl(key, newNestedGroup.get(key));
            }
          });
        } else {
          group.setControl(modelKey, newNestedGroup);
        }

        this.initializeNestedFormGroups(nonControlsModel, validators[modelKey], update, newNestedGroup);
      }
    }
  }

  getValues<T>(): T {
    const value = {};
    // tslint:disable-next-line:forin
    for (const key in this.formGroup.controls) {
      if (this.isKeyFormArray(key)) {
        const valueArray = [];
        (<FormArray>this.formGroup.controls[key]).controls.forEach(x => {
          valueArray.push(x.value);
        });
        value[key] = valueArray;
      } else {
        value[key] = this.formGroup.controls[key].value;
      }
    }
    const returnValue = this.mapper.map(AppConsts.mapperFgm, this.modelClassName, value);
    return this.removeAutomapperProps(returnValue);
  }

  // Removes excess properties generated from Automapper
  removeAutomapperProps(value: any): any {
    Object.keys(value).forEach((key) => {
      if (key.indexOf(AppConsts.dtoMapperProp) > -1) {
        delete value[key];
      }
    });
    return value;
  }

  getValue(fieldName: string): any {
    const field = this.formGroup.get(fieldName);
    if (!field) {
      return null;
    }
    return field.value;
  }

  setValue(fieldName: string, value: any): void {
    const field = this.formGroup.get(fieldName);
    if (field) {
      field.setValue(value);
    }
  }

  getFieldEnabled(fieldName: string): boolean {
    const field = this.formGroup.get(fieldName);
    return (field ? field.enabled : false);
  }

  getFieldValid(fieldName: string): boolean {
    const field = this.formGroup.get(fieldName);
    return (field ? field.valid : false);
  }

  getField(fieldName: string): any {
    const field = this.formGroup.get(fieldName);
    if (!field) {
      return null;
    }
    return field;
  }

  setPristine(fieldName: string): void {
    const field = this.formGroup.get(fieldName);
    if (field) {
      field.setValue(null);
      field.markAsPristine({ onlySelf: true });
    }
  }

  setDirty(fieldName: string): void {
    const field = this.formGroup.get(fieldName);
    if (field) {
      field.markAsTouched();
      field.markAsDirty();
    }
  }

  setError(fieldName: string, message: string): void {
    const field = this.formGroup.get(fieldName);
    if (field) {
      field.setErrors({ 'serverValidation': message });
      field.markAsTouched();
      field.markAsDirty();
    }
  }

  saveForm(observable: Observable<any>,
    callback?: ((response) => void) | null,
    customMessage?: string | null,
    hideSuccessMessage?: boolean | false,
    spinnerText?: string | null): void {
    if (!this.validate()) {
      window.scrollTo(0, 0);
      return;
    }
    if (spinnerText != null) {
      this.spinnerText = spinnerText;
    }
    this.isSaving$.next(true);
    observable.finally(() => this.isSaving$.next(false))
      .subscribe((x) => {
        this.initialFormValue = this.helpers.deepCopy(this.formGroup.value);
        let objectName: string;
        if (!this.objectNameAlreadyTranslated) {
          objectName = this.translationService.translate(this.objectName);
        } else {
          objectName = this.objectName;
        }

        if (!hideSuccessMessage) {
          let successMessage = '';

          if (customMessage != null) {
            successMessage = customMessage;
          } else {
            successMessage = this.isCreatingNew ?
              this.translationService.translate('Notifications.CreatedSuccess').replace('$0', objectName.toLowerCase()) :
              this.translationService.translate('Notifications.SavedSuccess').replace('$0', objectName);
          }
          this.notificationWindow.displaySuccessMessage(successMessage, 'Notifications.SuccessTitleDefault');
          this.formNotificationWindow.emit({ event: this.notificationWindow, type: GenericDialogType.Success, msg: successMessage });
        }

        if (callback) {
          callback(x);
        }
        this.reset(true);
        window.scrollTo(0, 0);
      }, (err) => {
        this.highlightServerErrors(err);
        window.scrollTo(0, 0);
      });
  }

  highlightServerErrors(err): void {
    this.notificationWindow.serverValidationErrors = [];
    const item = JSON.parse(err.response);
    const error = item.error;
    if (error) {
      if (err.status === 400) {
        if (Array.isArray(error.validationErrors)) {
          this.notificationWindow.serverValidationErrors.push(error);
          const validationMessage = this.translationService.translate('Notifications.MissingRequiredFields');
          this.notificationWindow.displayErrorMessage(validationMessage);
          this.formNotificationWindow.emit({ event: this.notificationWindow, type: GenericDialogType.Error, msg: validationMessage });

          this.clearServerFieldError(this.formGroup);
          error.validationErrors.forEach(fieldError => {
            if (fieldError.members && fieldError.members.length > 0) {
              this.highlightFieldError(fieldError, this.formGroup);
            } else {
              this.notificationWindow.displayErrorMessage(fieldError.message);
              this.formNotificationWindow.emit({ event: this.notificationWindow, type: GenericDialogType.Error, msg: fieldError.message });
            }
          });
        }
      } else {
        // Has a custom error code
        if (error.code > 0) {
          const customError = new CustomError();
          customError.code = error.code;
          customError.message = error.message;
          customError.details = error.details;

          console.log(customError);
          this.customError.emit(customError);
        }
      }
    }
  }

  highlightFieldError(fieldError: any, formGroup: FormGroup, memberIndex = 0, displayNotification = true): void {
    let key = fieldError.members[memberIndex];
    const field = formGroup.get(key);

    if (this.isKeyFormGroup(key) && fieldError.members.length > 1) {
      const nestedFormGroup = field as FormGroup;
      this.highlightFieldError(fieldError, nestedFormGroup, memberIndex + 1);
    } else if (this.isKeyFormArray(key) && fieldError.members.length > 1) {
      const index = fieldError.members[memberIndex + 1];
      const formArray = field as FormArray;
      const nestedFormGroup = formArray.controls[index] as FormGroup;

      this.highlightFieldError(fieldError, nestedFormGroup, memberIndex + 2);
    } else if (field) {
      field.setErrors({ 'serverValidation': fieldError.message });
      field.markAsTouched();
      field.markAsDirty();
    } else if (displayNotification) {
      this.notificationWindow.displayErrorMessage(fieldError.message);
      this.formNotificationWindow.emit({ event: this.notificationWindow, type: GenericDialogType.Error, msg: fieldError.message });
    }
  }

  clearServerFieldError(formGroup: FormGroup): void {
    const page = this;
    Object.keys(formGroup.controls).forEach(function (key) {
      if (page.isKeyFormArray(key)) {
        const formArray = formGroup.controls[key] as FormArray;
        if (formArray.controls != null && formArray.controls.length > 0) {
          formArray.controls.forEach(x => {
            const nestedFormGroup = x as FormGroup;
            page.clearServerFieldError(nestedFormGroup);
          });
        }
      } else {
        formGroup.controls[key].setErrors(null);
      }
    });
  }

  disable(field: string) {
    if (field) {
      const control = this.formGroup.get(field);
      control.disable();
    } else {
      this.readonly = true;
      this.disableAllFields(this.formGroup);
    }
  }

  disableAllFields(formGroup: FormGroup): void {
    if (formGroup) {
      Object.keys(formGroup.controls).forEach((field) => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.disable();
        } else if (control instanceof FormGroup) {
          this.disableAllFields(control);
        } else if (control instanceof FormArray) {
          control.disable();
          if (control.controls) {
            control.controls.forEach((group) => {
              if (group instanceof FormGroup) { this.disableAllFields(group); }
            });
          }
        }
      });
      formGroup.disable();
    }
  }

  validate(): boolean {
    if (!this.formGroup.valid) {
      this.hasRequiredValidationErrors = false;
      this.hasClientSideErrors = false;
      this.notificationWindow.removeMessage('error');
      this.formNotificationWindow.emit({ event: this.notificationWindow, type: 'remove', msg: 'error' });
      this.validateAllFields(this.formGroup);

      if (this.hasRequiredValidationErrors && !this.hideNotificationWindow) {
        const validationMessage = this.translationService.translate('Notifications.MissingRequiredFields');
        this.notificationWindow.displayErrorMessage(validationMessage);
        this.formNotificationWindow.emit({ event: this.notificationWindow, type: GenericDialogType.Error, msg: validationMessage });
      }

      if (this.hasClientSideErrors) {
        window.scrollTo(0, 0);
      }
      return !this.hasClientSideErrors;
    }
    return true;
  }

  displayGenericErrorMessage(): void {
    const validationMessage = this.translationService.translate('Notifications.MissingRequiredFields');
    this.notificationWindow.displayErrorMessage(validationMessage);
    this.formNotificationWindow.emit({ event: this.notificationWindow, type: GenericDialogType.Error, msg: validationMessage });
  }

  isValidOtherThanDisabled(formGroup: FormGroup): boolean {
    let valid = true;
    Object.keys(formGroup.controls).forEach((field) => {
      const control = this.formGroup.get(field);
      if (control instanceof FormControl) {
        let disabled = false;
        if (control.disabled) {
          disabled = true;
          control.enable();
        }
        if (!control.valid) {
          valid = false;
        }
        if (disabled) {
          control.disable();
        }
      } else if (control instanceof FormGroup) {
        if (!this.isValidOtherThanDisabled(control)) {
          valid = false;
        }
      } else if (control instanceof FormArray) {
        control.controls.forEach((formGroup: FormGroup) => {
          if (!this.isValidOtherThanDisabled(formGroup)) {
            valid = false;
          }
        });
      }
    });
    return valid;
  }

  validateAllFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      let disabled = false;
      if (control instanceof FormControl) {
        if (control.disabled) {
          disabled = true;
          control.enable();
        }
        if (!control.valid) {
          control.markAsTouched({ onlySelf: true });
          control.markAsDirty({ onlySelf: true });

          if (control.errors && !control.errors['serverValidation']) {
            this.hasClientSideErrors = true;
            console.log('Field error: ');
            console.log(field);
          }
          if (control.errors && control.validator) {
            const validator = control.validator(<any>{});
            if (validator && validator.hasOwnProperty('required')) {
              if (!this.hasRequiredValidationErrors) {
                this.hasRequiredValidationErrors = true;
              }
            }
          }
          if (control.errors && control.errors.customError) {
            if (!this.hasRequiredValidationErrors) {
              this.hasRequiredValidationErrors = true;
            }
          }
          if (disabled) {
            control.disable();
          }
        }
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((group) => {
          if (group instanceof FormGroup) { this.validateAllFields(group); }
        });
      }
    });
  }

  reset(save: boolean = false): void {
    // Need this to be able to navigate away
    if (this.isCreatingNew) {
      this.isCreatingNew = false;
    }
    this.notificationWindow.removeMessage('error');
    this.formNotificationWindow.emit({ event: this.notificationWindow, type: 'remove', msg: 'error' });

    if (!save) {
      this.formGroup.reset(this.helpers.deepCopy(this.initialFormValue), { emitEvent: this.emitResetEvent });
      this.resetEvent.emit(save);
      this.initializeFormArrays(this.initialFormValue, this.initialValidators);
      this.initializeNestedFormGroups(this.initialFormValue, this.initialValidators);
    }

    // FormGroup.reset() does not restore pristinity of custom value accessors
    let control: AbstractControl;
    Object.keys(this.formGroup.controls).forEach((name) => {
      control = this.formGroup.controls[name];
      control.markAsPristine();
    });
    this.formGroup.updateValueAndValidity();
  }

  openDiscardDialog(): void {
    this.dialogRef = this.dialog.open(this.discardDialog);
  }

  onDiscardChanges(): void {
    const sidenav = document.querySelector('.mat-sidenav-content');
    sidenav ? sidenav.scrollTo(0, 0) : window.scrollTo(0, 0);
    if (!this.isSavable) {
      this.onNavigateAway();
      return;
    }
    if (this.dialogRef) {
      this.closeCurrentDialogRef();
    }
    this.discard.emit();
    let objectName: string;
    if (!this.objectNameAlreadyTranslated) {
      objectName = this.translationService.translate(this.objectName);
    } else {
      objectName = this.objectName;
    }
    this.notificationWindow.displayInfoMessage(
      this.translationService.translate('Notifications.ChangesDiscardedSuccess').replace('$0', objectName),
      'Notifications.InfoTitleDefault'
    );
    this.formNotificationWindow.emit({
      event: this.notificationWindow, type: GenericDialogType.Info,
      msg: this.translationService.translate('Notifications.ChangesDiscardedSuccess').replace('$0', objectName)
    });
    this.reset();

  }

  tryNavigateAway(futureUrl: string, callback: (() => void) | null = null, isFutureUrlRelative = false): void {
    if (this.formIsDirty) {
      this.futureUrl = futureUrl;
      this.navigateCallback = callback;
      this.isFutureUrlRelative = isFutureUrlRelative;
      const dialog = this.isSavable ? this.unsavedDialog : this.discardDialog;
      this.dialogRef = this.dialog.open(dialog);
    }
  }

  openGenericDialog(props: GenericDialogProperties): void {
    if (this.dialogRef === null || this.dialogRef === undefined) {
      this.genericDialogProperties = props;
      if (props.type === GenericDialogType.Info) {
        this.genericDialogClass = 'dialog-info';
        this.genericDialogButton1Color = 'positive';
        this.genericDialogButton2Color = 'default';
      } else if (props.type === GenericDialogType.Error) {
        this.genericDialogClass = 'dialog-error';
        this.genericDialogButton1Color = 'default';
        this.genericDialogButton2Color = 'negative';
      } else if (props.type === GenericDialogType.Warning) {
        this.genericDialogClass = 'dialog-warning';
        this.genericDialogButton1Color = 'default';
        this.genericDialogButton2Color = 'warn';
      } else if (props.type === GenericDialogType.Success) {
        this.genericDialogClass = 'dialog-success';
        this.genericDialogButton1Color = 'positive';
        this.genericDialogButton2Color = 'default';
      }

      this.dialogRef = this.dialog.open(this.genericDialog);
    }
  }

  closeCurrentDialogRef() {
    if (this.dialogRef !== null && this.dialogRef !== undefined) {
      this.dialogRef.close();
      this.dialogRef = null; // Have to null it, otherwise close button doesn't work
    }
  }

  onNavigateAway(): void {
    this.closeCurrentDialogRef();
    try {
      // To revisit
      this.reset();
    } catch (e) {
      console.log(e);
    }
    if (this.futureUrl) {
      this.formGroup.markAsPristine();
      const queryPos = this.futureUrl.indexOf('?');
      if (queryPos > 0) {
        this.router.navigate([this.futureUrl.substring(0, queryPos)],
        { queryParams: this.parseQueryParams(this.futureUrl), relativeTo: this.isFutureUrlRelative ? this.route : null }
        );
      } else {
        this.router.navigate([this.futureUrl], { relativeTo: this.isFutureUrlRelative ? this.route : null });
      }
      this.futureUrl = '';
    }
    if (this.navigateCallback) {
      this.navigateCallback();
      this.navigateCallback = null;
    }
  }

  parseQueryParams(url: string) {
    const vars = {};
    const parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi,
      (m, key, value) => {
        vars[key] = decodeURIComponent(value);
        return vars[key];
      });
    return vars;
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
