import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FileInputWrapperComponent } from '../../../shared/forms/file-input-wrapper/file-input-wrapper.component';
var FileAttachmentDescriptionComponent = /** @class */ (function () {
    function FileAttachmentDescriptionComponent(cd) {
        this.cd = cd;
        this.acceptsTypes = '.jpg,.jpeg,.tiff,.tif,.png';
        this.fileControlName = 'fileUpload';
        this.descControlName = 'fileDescription';
        this.descMaxLength = 255;
        this.descRequired = true;
        this.userAccessId = 0;
        this.canEdit = true;
        this.duplicateFileNameMessage = 'FileUpload.DuplicateFileNameMessage';
        this.allowDuplicateFileName = true;
        this.attachments = [];
        this.upload = new EventEmitter();
        this.duplicateFileName = new EventEmitter();
        this.delete = new EventEmitter();
        this.create = new EventEmitter();
        this._readonly = false;
    }
    Object.defineProperty(FileAttachmentDescriptionComponent.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (value) {
            this._readonly = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileAttachmentDescriptionComponent.prototype, "isImageUploaded", {
        get: function () {
            return this.inputWrapper && this.inputWrapper.isUploaded;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileAttachmentDescriptionComponent.prototype, "isImageDescriptionFilled", {
        get: function () {
            var description = this.parentFormGroup.get(this.descControlName).value;
            if (description && description.length) {
                return description.trim().length > 0;
            }
            else {
                return false;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileAttachmentDescriptionComponent.prototype, "existingAttachments", {
        get: function () {
            if (this.attachments != null) {
                return this.attachments.map(function (x) { return x.value.fileName ? x.value.fileName : x.value.fileUpload.fileName; });
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileAttachmentDescriptionComponent.prototype, "showDuplicateNameError", {
        get: function () {
            if (this.allowDuplicateFileName === true) {
                return false;
            }
            var attachment = this.parentFormGroup.get(this.fileControlName).value;
            if (attachment && this.attachments != null) {
                var fileName_1 = attachment.fileName;
                if (fileName_1 != null) {
                    var duplicateFilename = this.attachments
                        .find(function (x) { return x && ((x.value.fileUpload && x.value.fileUpload.fileName.toLowerCase() === fileName_1.toLowerCase())
                        || (x.value.fileName && x.value.fileName.toLowerCase() === fileName_1.toLowerCase())); });
                    if (duplicateFilename) {
                        return true;
                    }
                }
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    FileAttachmentDescriptionComponent.prototype.ngOnInit = function () {
    };
    FileAttachmentDescriptionComponent.prototype.createAttachment = function () {
        if (!this.isImageUploaded) {
            return;
        }
        this.cd.detectChanges();
        var newAttachment = this.parentFormGroup.get(this.fileControlName).value;
        var description = this.parentFormGroup.get(this.descControlName).value;
        newAttachment.fileDescription = description;
        newAttachment.creationTime = new Date();
        newAttachment.newFlag = true;
        if (this.userAccessId) {
            newAttachment.creatorUserId = this.userAccessId;
        }
        newAttachment.location = 'data:'
            + newAttachment.fileType
            + ';base64,' + newAttachment.base64FileContent;
        this.parentFormGroup.get(this.fileControlName).setValue(newAttachment);
        this.create.emit(newAttachment);
        this.clearAttachment();
    };
    FileAttachmentDescriptionComponent.prototype.clearAttachment = function () {
        this.isDuplicateFileName = false;
        this.parentFormGroup.get(this.fileControlName).setValue(null);
        this.parentFormGroup.get(this.fileControlName).updateValueAndValidity();
        var descriptionControl = this.parentFormGroup.get(this.descControlName);
        descriptionControl.setValue('');
        descriptionControl.clearValidators();
        descriptionControl.updateValueAndValidity();
        descriptionControl.markAsPristine();
        this.cd.detectChanges();
        this.loading = false;
        this.delete.emit(true);
    };
    FileAttachmentDescriptionComponent.prototype.onUpload = function (upload) {
        this.cd.detectChanges();
        this.isDuplicateFileName = false;
        if (this.descRequired) {
            var descriptionControl = this.parentFormGroup.get(this.descControlName);
            descriptionControl.setValidators(Validators.required);
            descriptionControl.updateValueAndValidity();
        }
        this.upload.emit(upload);
        this.cd.detectChanges();
    };
    FileAttachmentDescriptionComponent.prototype.onDuplicateFileName = function () {
        this.isDuplicateFileName = true;
        this.duplicateFileName.emit(true);
        this.cd.detectChanges();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentDescriptionComponent.prototype, "acceptsTypes", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FileAttachmentDescriptionComponent.prototype, "allowOverwrites", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FileAttachmentDescriptionComponent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentDescriptionComponent.prototype, "fileControlName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentDescriptionComponent.prototype, "descControlName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentDescriptionComponent.prototype, "descMaxLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FileAttachmentDescriptionComponent.prototype, "uploadButton", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FileAttachmentDescriptionComponent.prototype, "attachButton", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], FileAttachmentDescriptionComponent.prototype, "parentFormGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FileAttachmentDescriptionComponent.prototype, "descLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentDescriptionComponent.prototype, "descRequired", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentDescriptionComponent.prototype, "userAccessId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentDescriptionComponent.prototype, "canEdit", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentDescriptionComponent.prototype, "duplicateFileNameMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileAttachmentDescriptionComponent.prototype, "allowDuplicateFileName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FileAttachmentDescriptionComponent.prototype, "attachments", void 0);
    __decorate([
        Input('readonly'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], FileAttachmentDescriptionComponent.prototype, "readonly", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FileAttachmentDescriptionComponent.prototype, "upload", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FileAttachmentDescriptionComponent.prototype, "duplicateFileName", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FileAttachmentDescriptionComponent.prototype, "delete", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FileAttachmentDescriptionComponent.prototype, "create", void 0);
    __decorate([
        ViewChild('inputWrapper', { static: false }),
        __metadata("design:type", FileInputWrapperComponent)
    ], FileAttachmentDescriptionComponent.prototype, "inputWrapper", void 0);
    FileAttachmentDescriptionComponent = __decorate([
        Component({
            selector: 'samplicity-file-attachment-description',
            templateUrl: './file-attachment-description.component.html',
            styleUrls: ['./file-attachment-description.component.scss']
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], FileAttachmentDescriptionComponent);
    return FileAttachmentDescriptionComponent;
}());
export { FileAttachmentDescriptionComponent };
//# sourceMappingURL=file-attachment-description.component.js.map