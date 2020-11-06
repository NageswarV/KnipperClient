import { __decorate, __metadata } from "tslib";
import { Component, Input, ChangeDetectorRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { OnStringCompare, OnDateCompare } from '../responsive-datatable/table.model';
import { TranslationService, LocaleService } from 'angular-l10n';
import { DomSanitizer } from '@angular/platform-browser';
import { UserNamePipe } from '../../../shared/pipes';
import { ResponsiveDatatableComponent } from '../responsive-datatable/responsive-datatable.component';
import { FileUpload } from '../../../shared/service-clients/om-program';
import { ClassificationValues } from '../../../common/classification-value';
var FileAttachmentComponent = /** @class */ (function () {
    function FileAttachmentComponent(translationService, sanitizer, locale, cd) {
        this.translationService = translationService;
        this.sanitizer = sanitizer;
        this.locale = locale;
        this.cd = cd;
        this.fileControlName = 'fileUpload';
        this.descControlName = 'fileDescription';
        this.highlightProp = 'newFlag';
        this.userAccessId = 0;
        this.canEdit = true;
        this.noFileUploadProperty = false;
        this.showCount = true;
        this.whiteBackground = false;
        this.allowDuplicateFileName = true;
        this.onFileUpload = new EventEmitter();
        this.count = 0;
        this._readonly = false;
    }
    Object.defineProperty(FileAttachmentComponent.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (value) {
            this._readonly = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileAttachmentComponent.prototype, "loading", {
        get: function () {
            return this._loading;
        },
        set: function (value) {
            this._loading = value;
            this.validateDescription();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileAttachmentComponent.prototype, "uploadTitle", {
        get: function () {
            if (this.options.uploadTitle) {
                return this.options.uploadTitle;
            }
            else {
                return 'FileUpload.Title';
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileAttachmentComponent.prototype, "control", {
        get: function () {
            return this.parentForm.get(this.fileControlName);
        },
        enumerable: false,
        configurable: true
    });
    FileAttachmentComponent.prototype.ngOnInit = function () {
        this.setColumns();
        var isDisabled = this.parentForm.disabled;
        var fileUpload = new FormControl('');
        var fileDescription = new FormControl('');
        var fileAttachment = new FormControl('');
        this.parentForm.addControl(this.fileControlName, fileUpload);
        this.parentForm.addControl(this.descControlName, fileDescription);
        this.parentForm.addControl('fileAttachment', fileAttachment);
        if (isDisabled) {
            this.parentForm.disable();
        }
    };
    FileAttachmentComponent.prototype.setColumns = function () {
        this.columns = [{
                name: 'fileDescription',
                displayName: 'FileUpload.Description',
                visibility: 'xs',
                customTemplate: true,
                sortFunc: this.sortFileDescription
            }, {
                name: 'fileName',
                displayName: 'FileUpload.Attachment',
                visibility: 'xs',
                customTemplate: true,
                sortFunc: this.sortFileName
            }, {
                name: 'creatorUserId',
                displayName: 'FileUpload.UploadedBy',
                customTemplate: true,
                visibility: 'xs',
                sortFunc: this.sortFileCreator.bind(this)
            }, {
                name: 'creationTime',
                displayName: 'FileUpload.DateAndTime',
                visibility: 'xs',
                customTemplate: true,
                sortDir: 'desc',
                sortFunc: this.sortCreationTime
            }];
        if (this.canEdit) {
            this.columns.push({
                name: 'deletedFlag',
                displayName: 'FileUpload.Actions',
                visibility: 'xs',
                sortEnabled: false,
                customTemplate: true
            });
        }
    };
    FileAttachmentComponent.prototype.validateDescription = function () {
        var descriptionControl = this.parentForm.get('fileDescription');
        var attachmentControl = this.parentForm.get('fileAttachment');
        if (!descriptionControl || !attachmentControl) {
            return;
        }
        if (!descriptionControl.value || descriptionControl.value === '' || !attachmentControl.value || attachmentControl.value === '') {
            descriptionControl.setErrors({ 'serverValidation': this.translationService.translate(this.options.errorDescription) });
        }
        else {
            descriptionControl.setErrors({});
        }
    };
    FileAttachmentComponent.prototype.sortFileDescription = function (a, b, event) {
        // Determines if FormGroup has fileUpload as a property
        var fileUploadControlA = a.get('fileUpload');
        var fileUploadControlB = b.get('fileUpload');
        var descA = fileUploadControlA ? fileUploadControlA.value.fileDescription : a.get('fileDescription').value;
        var descB = fileUploadControlB ? fileUploadControlB.value.fileDescription : b.get('fileDescription').value;
        return OnStringCompare(descA, descB, event.sortDir);
    };
    FileAttachmentComponent.prototype.sortFileName = function (a, b, event) {
        var nameA = this.noFileUploadProperty ? a.get('fileName').value : a.get('fileUpload').value.fileName;
        var nameB = this.noFileUploadProperty ? b.get('fileName').value : b.get('fileUpload').value.fileName;
        return OnStringCompare(nameA, nameB, event.sortDir);
    };
    FileAttachmentComponent.prototype.sortFileCreator = function (a, b, event) {
        var nameA = this.userNamePipe.transform(a.get('creatorUserId').value, true);
        var nameB = this.userNamePipe.transform(b.get('creatorUserId').value, true);
        return OnStringCompare(nameA, nameB, event.sortDir);
    };
    FileAttachmentComponent.prototype.sortCreationTime = function (a, b, event) {
        var dateA = a.get('creationTime').value;
        var dateB = b.get('creationTime').value;
        return OnDateCompare(dateA, dateB, event.sortDir);
    };
    FileAttachmentComponent.prototype.mapAttachment = function (formGroup) {
        var newAttachment = new FileUpload;
        if (this.noFileUploadProperty) {
            newAttachment.fileName = formGroup.get('fileName').value;
            newAttachment.fileDescription = formGroup.get('fileDescription').value;
            newAttachment.fileDescription = formGroup.get('fileDescription').value;
        }
        else {
            var file = formGroup.get(this.fileControlName).value;
            newAttachment.fileName = file.fileName;
            newAttachment.fileDescription = file.fileDescription;
        }
        newAttachment.creationTime = formGroup.get('creationTime').value;
        newAttachment.creatorUserId = formGroup.get('creatorUserId').value;
        newAttachment.newFlag = formGroup.get('newFlag').value;
        newAttachment.location = formGroup.get('location').value;
        return newAttachment;
    };
    FileAttachmentComponent.prototype.createAttachment = function (newAttachment) {
        this.onFileUpload.emit(newAttachment);
    };
    FileAttachmentComponent.prototype.removeAttachment = function (index) {
        this.loading = true;
        this.cd.detectChanges();
        this.formArray.removeAt(index);
        this.formArray.markAsDirty();
        this.clearAttachment();
    };
    FileAttachmentComponent.prototype.uploadAttachment = function (upload) {
        this.loading = true;
        this.formArray.markAsDirty();
        var attachControl = this.parentForm.get('fileAttachment');
        attachControl.setValidators(Validators.required);
        attachControl.updateValueAndValidity();
    };
    FileAttachmentComponent.prototype.clearAttachment = function () {
        var attachmentControl = this.parentForm.get('fileAttachment');
        this.parentForm.get('fileUpload').setValue(null);
        attachmentControl.clearValidators();
        attachmentControl.updateValueAndValidity();
        this.loading = false;
    };
    Object.defineProperty(FileAttachmentComponent.prototype, "mitigationAttachmentType", {
        get: function () {
            return ClassificationValues.OrderAttachmentType.Mitigation;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileAttachmentComponent.prototype, "srfAttachmentType", {
        get: function () {
            return ClassificationValues.OrderAttachmentType.Srf;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileAttachmentComponent.prototype, "dorAttachmentType", {
        get: function () {
            return ClassificationValues.OrderAttachmentType.Dor;
        },
        enumerable: false,
        configurable: true
    });
    FileAttachmentComponent.prototype.onDuplicateFileName = function () {
        this.loading = true;
        var attachControl = this.parentForm.get('fileAttachment');
        attachControl.setValidators(Validators.required);
        attachControl.updateValueAndValidity();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentComponent.prototype, "options", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], FileAttachmentComponent.prototype, "parentForm", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FileAttachmentComponent.prototype, "allowOverwrites", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentComponent.prototype, "fileControlName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentComponent.prototype, "descControlName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", UserNamePipe)
    ], FileAttachmentComponent.prototype, "userNamePipe", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormArray)
    ], FileAttachmentComponent.prototype, "formArray", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentComponent.prototype, "highlightProp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentComponent.prototype, "userAccessId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentComponent.prototype, "canEdit", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentComponent.prototype, "noFileUploadProperty", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentComponent.prototype, "showCount", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentComponent.prototype, "whiteBackground", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentComponent.prototype, "allowDuplicateFileName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FileAttachmentComponent.prototype, "acceptsTypes", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FileAttachmentComponent.prototype, "onFileUpload", void 0);
    __decorate([
        ViewChild('table', { static: false }),
        __metadata("design:type", ResponsiveDatatableComponent)
    ], FileAttachmentComponent.prototype, "table", void 0);
    __decorate([
        Input('readonly'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], FileAttachmentComponent.prototype, "readonly", null);
    __decorate([
        Input('loading'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], FileAttachmentComponent.prototype, "loading", null);
    FileAttachmentComponent = __decorate([
        Component({
            selector: 'samplicity-file-attachment',
            templateUrl: './file-attachment.component.html',
            styleUrls: ['./file-attachment.component.scss']
        }),
        __metadata("design:paramtypes", [TranslationService,
            DomSanitizer,
            LocaleService,
            ChangeDetectorRef])
    ], FileAttachmentComponent);
    return FileAttachmentComponent;
}());
export { FileAttachmentComponent };
//# sourceMappingURL=file-attachment.component.js.map