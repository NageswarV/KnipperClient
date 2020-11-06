import { __decorate, __metadata, __param } from "tslib";
import { Component, Input, ViewChild, Output, EventEmitter, HostListener, Inject, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TranslationService } from 'angular-l10n';
import { NotificationComponent } from '../../components/notification/notification.component';
import { MapperService } from '../../../core/mapper.service';
import { HelpersService } from '../../../core/helpers.service';
import { SpinnerOverlayComponent } from '../../../shared/components/spinner-overlay/spinner-overlay.component';
import { AppConsts } from '../../../shared/app-consts';
import 'rxjs/add/operator/finally';
var GenericDialogProperties = /** @class */ (function () {
    function GenericDialogProperties() {
        this.translateMessage = true;
    }
    return GenericDialogProperties;
}());
export { GenericDialogProperties };
var CustomError = /** @class */ (function () {
    function CustomError() {
    }
    return CustomError;
}());
export { CustomError };
export var GenericDialogType;
(function (GenericDialogType) {
    GenericDialogType[GenericDialogType["Info"] = 0] = "Info";
    GenericDialogType[GenericDialogType["Error"] = 1] = "Error";
    GenericDialogType[GenericDialogType["Warning"] = 2] = "Warning";
    GenericDialogType[GenericDialogType["Success"] = 3] = "Success";
})(GenericDialogType || (GenericDialogType = {}));
var FormComponent = /** @class */ (function () {
    function FormComponent(document, translationService, helpers, router, dialog, fb, mapper, route, cd) {
        this.document = document;
        this.translationService = translationService;
        this.helpers = helpers;
        this.router = router;
        this.dialog = dialog;
        this.fb = fb;
        this.mapper = mapper;
        this.route = route;
        this.cd = cd;
        this.save = new EventEmitter();
        this.discard = new EventEmitter();
        this.action = new EventEmitter();
        this.resetEvent = new EventEmitter();
        this.customError = new EventEmitter();
        this.formNotificationWindow = new EventEmitter();
        this.formNotificationWindow2 = new EventEmitter();
        this.formNotificationWindow3 = new EventEmitter();
        this.hideSaveButton = false;
        this.isCreatingNew = false;
        this.isSavable = true;
        this.emitResetEvent = true;
        this.hideSnackBar = false;
        this.hideNotificationWindow = false;
        this.alwaysShowSnackbar = false;
        this.alwaysShowSaveButton = false;
        this.readonly = false;
        this.spinnerText = 'Spinner.Saving';
        this.formArrayKeys = [];
        this.formGroupKeys = [];
        this.initialFormValue = {};
        this.initialModel = {};
        this.initialValidators = {};
        this.hasClientSideErrors = false;
        this.isSaving$ = new BehaviorSubject(false);
        this.bypassCanDeactivateGuard = false;
    }
    Object.defineProperty(FormComponent.prototype, "isReadOnly", {
        get: function () {
            return this.readonly;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "formIsDirty", {
        get: function () {
            if (this.bypassCanDeactivateGuard) {
                return false;
            }
            if (this.formGroup) {
                var dirty = this.formGroup.dirty;
                if (dirty) {
                    this.document.body.classList.add('snackbar-spacer');
                }
                else {
                    this.document.body.classList.remove('snackbar-spacer');
                }
                return dirty;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    FormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            if (params.created) {
                var objectName = void 0;
                if (!_this.objectNameAlreadyTranslated) {
                    objectName = _this.translationService.translate(_this.objectName);
                }
                else {
                    objectName = _this.objectName;
                }
                var successMessage = _this.translationService.translate('Notifications.CreatedSuccess').replace('$0', objectName);
                _this.notificationWindow.displaySuccessMessage(successMessage, 'Notifications.SuccessTitleDefault');
                _this.formNotificationWindow.emit({ event: _this.notificationWindow, type: GenericDialogType.Success, msg: successMessage });
            }
        });
    };
    FormComponent.prototype.needDeactivateConfirmation = function ($event) {
        if ($event) {
            if (this.formIsDirty) {
                $event.returnValue = this.translationService.translate('Forms.UnsavedChangesMessage');
            }
        }
    };
    FormComponent.prototype.isLocalizedValue = function (val) {
        return val && Array.isArray(val) && val.length > 0 && val[0].language;
    };
    FormComponent.prototype.isKeyFormGroup = function (key) {
        // key.startsWith(AppConsts.nestedFormGroupProp);
        return this.formGroupKeys.some(function (x) { return x === key; });
    };
    FormComponent.prototype.isKeyFormArray = function (key) {
        // return key.startsWith(AppConsts.formArrayMapperProp);
        return this.formArrayKeys.some(function (x) { return x === key; });
    };
    FormComponent.prototype.initializeFormGroup = function (formModel, validators, modelClassName, errorMessages) {
        this.modelClassName = modelClassName;
        var formGroupModel = this.mapper.map(this.modelClassName, AppConsts.mapperFgm, formModel);
        if (this.formGroup) {
            // Reactive form setValue doesn't like undefined values
            // which might be coming from 3rd party libraries
            for (var key in formGroupModel) {
                if (formGroupModel[key] === undefined) {
                    formGroupModel[key] = null;
                }
            }
            this.initializeFormArrays(formGroupModel, validators, true);
            this.initializeNestedFormGroups(formGroupModel, validators, true);
            this.formGroup.patchValue(formGroupModel);
        }
        else {
            for (var key in formGroupModel) {
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
    };
    FormComponent.prototype.initializeFormArrays = function (model, validators, update, formGroup) {
        var _this = this;
        if (update === void 0) { update = false; }
        var _loop_1 = function (key) {
            if (this_1.isKeyFormArray(key)) {
                var tempModel_1 = this_1.helpers.deepCopy(model[key]);
                var nonControlsTempModel_1 = [];
                var array = tempModel_1.map(function (item, index) {
                    var arrayKey = key;
                    nonControlsTempModel_1[index] = {};
                    if (validators && validators[arrayKey]) {
                        for (var itemKey in item) {
                            if (!_this.isKeyFormArray(itemKey) && !_this.isKeyFormGroup(itemKey)) {
                                if (validators[arrayKey][itemKey]) {
                                    item[itemKey] = [item[itemKey], validators[arrayKey][itemKey]];
                                }
                                else {
                                    item[itemKey] = [item[itemKey]];
                                }
                            }
                            else if (_this.isKeyFormArray(itemKey)) {
                                nonControlsTempModel_1[index][itemKey] = tempModel_1[index][itemKey];
                                delete tempModel_1[index][itemKey];
                            }
                            else if (_this.isKeyFormGroup(itemKey)) {
                                nonControlsTempModel_1[index][itemKey] = tempModel_1[index][itemKey];
                                delete tempModel_1[index][itemKey];
                            }
                        }
                    }
                    var newGroup = _this.fb.group(item);
                    var newValidators = (validators && validators[arrayKey]) ? validators[arrayKey] : {};
                    _this.initializeNestedFormGroups(nonControlsTempModel_1[index], newValidators, update, newGroup);
                    _this.initializeFormArrays(nonControlsTempModel_1[index], newValidators, update, newGroup);
                    return newGroup;
                });
                if (!formGroup) {
                    this_1.formGroup.setControl(key, this_1.fb.array(array));
                }
                else {
                    formGroup.setControl(key, this_1.fb.array(array));
                }
            }
        };
        var this_1 = this;
        for (var key in model) {
            _loop_1(key);
        }
    };
    FormComponent.prototype.initializeNestedFormGroups = function (model, validators, update, group) {
        if (update === void 0) { update = false; }
        var _loop_2 = function (modelKey) {
            if (this_2.isKeyFormGroup(modelKey) && model[modelKey]) {
                var controlsModel = this_2.helpers.deepCopy(model[modelKey]);
                var nonControlsModel = {};
                var groupKey = modelKey;
                for (var key in controlsModel) {
                    if (!this_2.isKeyFormArray(key) && !this_2.isKeyFormGroup(key)) {
                        if (validators && validators[groupKey] && validators[groupKey][key]) {
                            controlsModel[key] = [controlsModel[key], validators[groupKey][key]];
                        }
                        else {
                            controlsModel[key] = [controlsModel[key]];
                        }
                    }
                    else {
                        nonControlsModel[key] = controlsModel[key];
                        delete controlsModel[key];
                    }
                }
                var newNestedGroup_1 = this_2.fb.group(controlsModel);
                if (!group) {
                    group = this_2.formGroup;
                }
                var newValidators = (validators && validators[modelKey]) ? validators[modelKey] : {};
                this_2.initializeFormArrays(nonControlsModel, newValidators, false, newNestedGroup_1);
                if (group.get(modelKey) instanceof FormGroup) {
                    var formGroup_1 = group.get(modelKey);
                    group.get(modelKey).patchValue(newNestedGroup_1);
                    // Check for nested FormArrays
                    Object.keys(formGroup_1.controls).forEach(function (key) {
                        if (formGroup_1.get(key) instanceof FormArray) {
                            formGroup_1.setControl(key, newNestedGroup_1.get(key));
                        }
                    });
                }
                else {
                    group.setControl(modelKey, newNestedGroup_1);
                }
                this_2.initializeNestedFormGroups(nonControlsModel, validators[modelKey], update, newNestedGroup_1);
            }
        };
        var this_2 = this;
        for (var modelKey in model) {
            _loop_2(modelKey);
        }
    };
    FormComponent.prototype.getValues = function () {
        var value = {};
        var _loop_3 = function (key) {
            if (this_3.isKeyFormArray(key)) {
                var valueArray_1 = [];
                this_3.formGroup.controls[key].controls.forEach(function (x) {
                    valueArray_1.push(x.value);
                });
                value[key] = valueArray_1;
            }
            else {
                value[key] = this_3.formGroup.controls[key].value;
            }
        };
        var this_3 = this;
        // tslint:disable-next-line:forin
        for (var key in this.formGroup.controls) {
            _loop_3(key);
        }
        var returnValue = this.mapper.map(AppConsts.mapperFgm, this.modelClassName, value);
        return this.removeAutomapperProps(returnValue);
    };
    // Removes excess properties generated from Automapper
    FormComponent.prototype.removeAutomapperProps = function (value) {
        Object.keys(value).forEach(function (key) {
            if (key.indexOf(AppConsts.dtoMapperProp) > -1) {
                delete value[key];
            }
        });
        return value;
    };
    FormComponent.prototype.getValue = function (fieldName) {
        var field = this.formGroup.get(fieldName);
        if (!field) {
            return null;
        }
        return field.value;
    };
    FormComponent.prototype.setValue = function (fieldName, value) {
        var field = this.formGroup.get(fieldName);
        if (field) {
            field.setValue(value);
        }
    };
    FormComponent.prototype.getFieldEnabled = function (fieldName) {
        var field = this.formGroup.get(fieldName);
        return (field ? field.enabled : false);
    };
    FormComponent.prototype.getFieldValid = function (fieldName) {
        var field = this.formGroup.get(fieldName);
        return (field ? field.valid : false);
    };
    FormComponent.prototype.getField = function (fieldName) {
        var field = this.formGroup.get(fieldName);
        if (!field) {
            return null;
        }
        return field;
    };
    FormComponent.prototype.setPristine = function (fieldName) {
        var field = this.formGroup.get(fieldName);
        if (field) {
            field.setValue(null);
            field.markAsPristine({ onlySelf: true });
        }
    };
    FormComponent.prototype.setDirty = function (fieldName) {
        var field = this.formGroup.get(fieldName);
        if (field) {
            field.markAsTouched();
            field.markAsDirty();
        }
    };
    FormComponent.prototype.setError = function (fieldName, message) {
        var field = this.formGroup.get(fieldName);
        if (field) {
            field.setErrors({ 'serverValidation': message });
            field.markAsTouched();
            field.markAsDirty();
        }
    };
    FormComponent.prototype.saveForm = function (observable, callback, customMessage, hideSuccessMessage, spinnerText) {
        var _this = this;
        if (!this.validate()) {
            window.scrollTo(0, 0);
            return;
        }
        if (spinnerText != null) {
            this.spinnerText = spinnerText;
        }
        this.isSaving$.next(true);
        observable.finally(function () { return _this.isSaving$.next(false); })
            .subscribe(function (x) {
            _this.initialFormValue = _this.helpers.deepCopy(_this.formGroup.value);
            var objectName;
            if (!_this.objectNameAlreadyTranslated) {
                objectName = _this.translationService.translate(_this.objectName);
            }
            else {
                objectName = _this.objectName;
            }
            if (!hideSuccessMessage) {
                var successMessage = '';
                if (customMessage != null) {
                    successMessage = customMessage;
                }
                else {
                    successMessage = _this.isCreatingNew ?
                        _this.translationService.translate('Notifications.CreatedSuccess').replace('$0', objectName.toLowerCase()) :
                        _this.translationService.translate('Notifications.SavedSuccess').replace('$0', objectName);
                }
                _this.notificationWindow.displaySuccessMessage(successMessage, 'Notifications.SuccessTitleDefault');
                _this.formNotificationWindow.emit({ event: _this.notificationWindow, type: GenericDialogType.Success, msg: successMessage });
            }
            if (callback) {
                callback(x);
            }
            _this.reset(true);
            window.scrollTo(0, 0);
        }, function (err) {
            _this.highlightServerErrors(err);
            window.scrollTo(0, 0);
        });
    };
    FormComponent.prototype.highlightServerErrors = function (err) {
        var _this = this;
        this.notificationWindow.serverValidationErrors = [];
        var item = JSON.parse(err.response);
        var error = item.error;
        if (error) {
            if (err.status === 400) {
                if (Array.isArray(error.validationErrors)) {
                    this.notificationWindow.serverValidationErrors.push(error);
                    var validationMessage = this.translationService.translate('Notifications.MissingRequiredFields');
                    this.notificationWindow.displayErrorMessage(validationMessage);
                    this.formNotificationWindow.emit({ event: this.notificationWindow, type: GenericDialogType.Error, msg: validationMessage });
                    this.clearServerFieldError(this.formGroup);
                    error.validationErrors.forEach(function (fieldError) {
                        if (fieldError.members && fieldError.members.length > 0) {
                            _this.highlightFieldError(fieldError, _this.formGroup);
                        }
                        else {
                            _this.notificationWindow.displayErrorMessage(fieldError.message);
                            _this.formNotificationWindow.emit({ event: _this.notificationWindow, type: GenericDialogType.Error, msg: fieldError.message });
                        }
                    });
                }
            }
            else {
                // Has a custom error code
                if (error.code > 0) {
                    var customError = new CustomError();
                    customError.code = error.code;
                    customError.message = error.message;
                    customError.details = error.details;
                    console.log(customError);
                    this.customError.emit(customError);
                }
            }
        }
    };
    FormComponent.prototype.highlightFieldError = function (fieldError, formGroup, memberIndex, displayNotification) {
        if (memberIndex === void 0) { memberIndex = 0; }
        if (displayNotification === void 0) { displayNotification = true; }
        var key = fieldError.members[memberIndex];
        var field = formGroup.get(key);
        if (this.isKeyFormGroup(key) && fieldError.members.length > 1) {
            var nestedFormGroup = field;
            this.highlightFieldError(fieldError, nestedFormGroup, memberIndex + 1);
        }
        else if (this.isKeyFormArray(key) && fieldError.members.length > 1) {
            var index = fieldError.members[memberIndex + 1];
            var formArray = field;
            var nestedFormGroup = formArray.controls[index];
            this.highlightFieldError(fieldError, nestedFormGroup, memberIndex + 2);
        }
        else if (field) {
            field.setErrors({ 'serverValidation': fieldError.message });
            field.markAsTouched();
            field.markAsDirty();
        }
        else if (displayNotification) {
            this.notificationWindow.displayErrorMessage(fieldError.message);
            this.formNotificationWindow.emit({ event: this.notificationWindow, type: GenericDialogType.Error, msg: fieldError.message });
        }
    };
    FormComponent.prototype.clearServerFieldError = function (formGroup) {
        var page = this;
        Object.keys(formGroup.controls).forEach(function (key) {
            if (page.isKeyFormArray(key)) {
                var formArray = formGroup.controls[key];
                if (formArray.controls != null && formArray.controls.length > 0) {
                    formArray.controls.forEach(function (x) {
                        var nestedFormGroup = x;
                        page.clearServerFieldError(nestedFormGroup);
                    });
                }
            }
            else {
                formGroup.controls[key].setErrors(null);
            }
        });
    };
    FormComponent.prototype.disable = function (field) {
        if (field) {
            var control = this.formGroup.get(field);
            control.disable();
        }
        else {
            this.readonly = true;
            this.disableAllFields(this.formGroup);
        }
    };
    FormComponent.prototype.disableAllFields = function (formGroup) {
        var _this = this;
        if (formGroup) {
            Object.keys(formGroup.controls).forEach(function (field) {
                var control = formGroup.get(field);
                if (control instanceof FormControl) {
                    control.disable();
                }
                else if (control instanceof FormGroup) {
                    _this.disableAllFields(control);
                }
                else if (control instanceof FormArray) {
                    control.disable();
                    if (control.controls) {
                        control.controls.forEach(function (group) {
                            if (group instanceof FormGroup) {
                                _this.disableAllFields(group);
                            }
                        });
                    }
                }
            });
            formGroup.disable();
        }
    };
    FormComponent.prototype.validate = function () {
        if (!this.formGroup.valid) {
            this.hasRequiredValidationErrors = false;
            this.hasClientSideErrors = false;
            this.notificationWindow.removeMessage('error');
            this.formNotificationWindow.emit({ event: this.notificationWindow, type: 'remove', msg: 'error' });
            this.validateAllFields(this.formGroup);
            if (this.hasRequiredValidationErrors && !this.hideNotificationWindow) {
                var validationMessage = this.translationService.translate('Notifications.MissingRequiredFields');
                this.notificationWindow.displayErrorMessage(validationMessage);
                this.formNotificationWindow.emit({ event: this.notificationWindow, type: GenericDialogType.Error, msg: validationMessage });
            }
            if (this.hasClientSideErrors) {
                window.scrollTo(0, 0);
            }
            return !this.hasClientSideErrors;
        }
        return true;
    };
    FormComponent.prototype.displayGenericErrorMessage = function () {
        var validationMessage = this.translationService.translate('Notifications.MissingRequiredFields');
        this.notificationWindow.displayErrorMessage(validationMessage);
        this.formNotificationWindow.emit({ event: this.notificationWindow, type: GenericDialogType.Error, msg: validationMessage });
    };
    FormComponent.prototype.isValidOtherThanDisabled = function (formGroup) {
        var _this = this;
        var valid = true;
        Object.keys(formGroup.controls).forEach(function (field) {
            var control = _this.formGroup.get(field);
            if (control instanceof FormControl) {
                var disabled = false;
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
            }
            else if (control instanceof FormGroup) {
                if (!_this.isValidOtherThanDisabled(control)) {
                    valid = false;
                }
            }
            else if (control instanceof FormArray) {
                control.controls.forEach(function (formGroup) {
                    if (!_this.isValidOtherThanDisabled(formGroup)) {
                        valid = false;
                    }
                });
            }
        });
        return valid;
    };
    FormComponent.prototype.validateAllFields = function (formGroup) {
        var _this = this;
        Object.keys(formGroup.controls).forEach(function (field) {
            var control = formGroup.get(field);
            var disabled = false;
            if (control instanceof FormControl) {
                if (control.disabled) {
                    disabled = true;
                    control.enable();
                }
                if (!control.valid) {
                    control.markAsTouched({ onlySelf: true });
                    control.markAsDirty({ onlySelf: true });
                    if (control.errors && !control.errors['serverValidation']) {
                        _this.hasClientSideErrors = true;
                        console.log('Field error: ');
                        console.log(field);
                    }
                    if (control.errors && control.validator) {
                        var validator = control.validator({});
                        if (validator && validator.hasOwnProperty('required')) {
                            if (!_this.hasRequiredValidationErrors) {
                                _this.hasRequiredValidationErrors = true;
                            }
                        }
                    }
                    if (control.errors && control.errors.customError) {
                        if (!_this.hasRequiredValidationErrors) {
                            _this.hasRequiredValidationErrors = true;
                        }
                    }
                    if (disabled) {
                        control.disable();
                    }
                }
            }
            else if (control instanceof FormGroup) {
                _this.validateAllFields(control);
            }
            else if (control instanceof FormArray) {
                control.controls.forEach(function (group) {
                    if (group instanceof FormGroup) {
                        _this.validateAllFields(group);
                    }
                });
            }
        });
    };
    FormComponent.prototype.reset = function (save) {
        var _this = this;
        if (save === void 0) { save = false; }
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
        var control;
        Object.keys(this.formGroup.controls).forEach(function (name) {
            control = _this.formGroup.controls[name];
            control.markAsPristine();
        });
        this.formGroup.updateValueAndValidity();
    };
    FormComponent.prototype.openDiscardDialog = function () {
        this.dialogRef = this.dialog.open(this.discardDialog);
    };
    FormComponent.prototype.onDiscardChanges = function () {
        var sidenav = document.querySelector('.mat-sidenav-content');
        sidenav ? sidenav.scrollTo(0, 0) : window.scrollTo(0, 0);
        if (!this.isSavable) {
            this.onNavigateAway();
            return;
        }
        if (this.dialogRef) {
            this.closeCurrentDialogRef();
        }
        this.discard.emit();
        var objectName;
        if (!this.objectNameAlreadyTranslated) {
            objectName = this.translationService.translate(this.objectName);
        }
        else {
            objectName = this.objectName;
        }
        this.notificationWindow.displayInfoMessage(this.translationService.translate('Notifications.ChangesDiscardedSuccess').replace('$0', objectName), 'Notifications.InfoTitleDefault');
        this.formNotificationWindow.emit({
            event: this.notificationWindow, type: GenericDialogType.Info,
            msg: this.translationService.translate('Notifications.ChangesDiscardedSuccess').replace('$0', objectName)
        });
        this.reset();
    };
    FormComponent.prototype.tryNavigateAway = function (futureUrl, callback, isFutureUrlRelative) {
        if (callback === void 0) { callback = null; }
        if (isFutureUrlRelative === void 0) { isFutureUrlRelative = false; }
        if (this.formIsDirty) {
            this.futureUrl = futureUrl;
            this.navigateCallback = callback;
            this.isFutureUrlRelative = isFutureUrlRelative;
            var dialog = this.isSavable ? this.unsavedDialog : this.discardDialog;
            this.dialogRef = this.dialog.open(dialog);
        }
    };
    FormComponent.prototype.openGenericDialog = function (props) {
        if (this.dialogRef === null || this.dialogRef === undefined) {
            this.genericDialogProperties = props;
            if (props.type === GenericDialogType.Info) {
                this.genericDialogClass = 'dialog-info';
                this.genericDialogButton1Color = 'positive';
                this.genericDialogButton2Color = 'default';
            }
            else if (props.type === GenericDialogType.Error) {
                this.genericDialogClass = 'dialog-error';
                this.genericDialogButton1Color = 'default';
                this.genericDialogButton2Color = 'negative';
            }
            else if (props.type === GenericDialogType.Warning) {
                this.genericDialogClass = 'dialog-warning';
                this.genericDialogButton1Color = 'default';
                this.genericDialogButton2Color = 'warn';
            }
            else if (props.type === GenericDialogType.Success) {
                this.genericDialogClass = 'dialog-success';
                this.genericDialogButton1Color = 'positive';
                this.genericDialogButton2Color = 'default';
            }
            this.dialogRef = this.dialog.open(this.genericDialog);
        }
    };
    FormComponent.prototype.closeCurrentDialogRef = function () {
        if (this.dialogRef !== null && this.dialogRef !== undefined) {
            this.dialogRef.close();
            this.dialogRef = null; // Have to null it, otherwise close button doesn't work
        }
    };
    FormComponent.prototype.onNavigateAway = function () {
        this.closeCurrentDialogRef();
        try {
            // To revisit
            this.reset();
        }
        catch (e) {
            console.log(e);
        }
        if (this.futureUrl) {
            this.formGroup.markAsPristine();
            var queryPos = this.futureUrl.indexOf('?');
            if (queryPos > 0) {
                this.router.navigate([this.futureUrl.substring(0, queryPos)], { queryParams: this.parseQueryParams(this.futureUrl), relativeTo: this.isFutureUrlRelative ? this.route : null });
            }
            else {
                this.router.navigate([this.futureUrl], { relativeTo: this.isFutureUrlRelative ? this.route : null });
            }
            this.futureUrl = '';
        }
        if (this.navigateCallback) {
            this.navigateCallback();
            this.navigateCallback = null;
        }
    };
    FormComponent.prototype.parseQueryParams = function (url) {
        var vars = {};
        var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = decodeURIComponent(value);
            return vars[key];
        });
        return vars;
    };
    FormComponent.prototype.scrollToTop = function () {
        window.scrollTo(0, 0);
    };
    __decorate([
        ViewChild('genericDialog', { static: false }),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "genericDialog", void 0);
    __decorate([
        ViewChild('discardDialog', { static: false }),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "discardDialog", void 0);
    __decorate([
        ViewChild('unsavedDialog', { static: false }),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "unsavedDialog", void 0);
    __decorate([
        ViewChild('notificationWindow', { static: false }),
        __metadata("design:type", NotificationComponent)
    ], FormComponent.prototype, "notificationWindow", void 0);
    __decorate([
        ViewChild('notificationWindow2', { static: false }),
        __metadata("design:type", NotificationComponent)
    ], FormComponent.prototype, "notificationWindow2", void 0);
    __decorate([
        ViewChild('notificationWindow3', { static: false }),
        __metadata("design:type", NotificationComponent)
    ], FormComponent.prototype, "notificationWindow3", void 0);
    __decorate([
        ViewChild('spinnerOverlay', { static: false }),
        __metadata("design:type", SpinnerOverlayComponent)
    ], FormComponent.prototype, "spinnerOverlay", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FormComponent.prototype, "save", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FormComponent.prototype, "discard", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FormComponent.prototype, "action", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FormComponent.prototype, "resetEvent", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FormComponent.prototype, "customError", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FormComponent.prototype, "formNotificationWindow", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FormComponent.prototype, "formNotificationWindow2", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FormComponent.prototype, "formNotificationWindow3", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormComponent.prototype, "objectName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FormComponent.prototype, "objectNameAlreadyTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormComponent.prototype, "saveButton", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormComponent.prototype, "saveButtonColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "hideSaveButton", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "isCreatingNew", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "isSavable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "emitResetEvent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FormComponent.prototype, "customActions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "hideSnackBar", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "hideNotificationWindow", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "alwaysShowSnackbar", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "alwaysShowSaveButton", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "readonly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "spinnerText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "formArrayKeys", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormComponent.prototype, "formGroupKeys", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], FormComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FormComponent.prototype, "menuState", void 0);
    __decorate([
        HostListener('window:beforeunload', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FormComponent.prototype, "needDeactivateConfirmation", null);
    FormComponent = __decorate([
        Component({
            selector: 'samplicity-form',
            templateUrl: './form.component.html',
            styleUrls: ['./form.component.scss']
        }),
        __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object, TranslationService,
            HelpersService,
            Router,
            MatDialog,
            FormBuilder,
            MapperService,
            ActivatedRoute,
            ChangeDetectorRef])
    ], FormComponent);
    return FormComponent;
}());
export { FormComponent };
//# sourceMappingURL=form.component.js.map