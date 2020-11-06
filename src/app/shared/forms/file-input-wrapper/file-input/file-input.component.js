import { __decorate, __metadata } from "tslib";
import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUpload } from '../../../../shared/service-clients/om-order';
import { DomSanitizer } from '@angular/platform-browser';
import { System } from '../../../../shared/service-clients/system';
import { ClientService } from '../../../../core/client.service';
var FileInputComponent = /** @class */ (function () {
    function FileInputComponent(systemClient, clientService, sanitizer) {
        this.systemClient = systemClient;
        this.clientService = clientService;
        this.sanitizer = sanitizer;
        this.color = 'primary';
        this.allowOverwrites = true; //TODO Turn on once DNH and Mitigation Uploads are aligned 
        this.delete = new EventEmitter();
        this.upload = new EventEmitter();
        this.duplicateFileName = new EventEmitter();
        this.disabledState = false;
        this.onChange = function (inputItem) { };
        this.onTouched = function () { };
    }
    FileInputComponent_1 = FileInputComponent;
    Object.defineProperty(FileInputComponent.prototype, "dataUrl", {
        get: function () {
            return this.sanitizer.bypassSecurityTrustResourceUrl('data:'
                + this.fileUpload.fileType
                + ';base64,' + this.fileUpload.base64FileContent);
        },
        enumerable: false,
        configurable: true
    });
    FileInputComponent.prototype.ngOnInit = function () {
    };
    FileInputComponent.prototype.setFile = function (file) {
        var _this = this;
        if (file['files'] && file['files'].length > 0) {
            if (!this.allowOverwrites) {
                var fileName_1 = file['files'][0].name;
                var selectedClientId = this.clientService.getClientId();
                this.systemClient.checkIfFileNameExists(fileName_1, selectedClientId).subscribe(function (response) {
                    if (response && response.result) {
                        // FileName Exists
                        _this.onDuplicateFileName(fileName_1);
                    }
                    else {
                        _this.loadFile(file);
                    }
                });
            }
            else {
                this.loadFile(file);
            }
        }
    };
    FileInputComponent.prototype.loadFile = function (file) {
        var _this = this;
        var fileUpload = new FileUpload();
        fileUpload.fileName = file['files'][0].name;
        var fileReader = new FileReader();
        this.loadingFile = true;
        fileReader.readAsDataURL(file['files'][0]);
        fileReader.onloadend = function (readerEvent) {
            _this.loadingFile = false;
            fileUpload.base64FileContent = fileReader.result.toString().split(',')[1];
            fileUpload.fileType = file['files'][0].type;
            _this.writeValue(fileUpload);
            _this.onChange(fileUpload);
            _this.upload.emit(true);
        };
    };
    FileInputComponent.prototype.onDeleteFile = function () {
        this.fileUpload.fileName = null;
        this.fileUpload.fileDescription = null;
        this.fileUpload.base64FileContent = null;
        this.fileUpload.duplicateFileName = false;
        this.writeValue(this.fileUpload);
        this.onChange(this.fileUpload);
        this.delete.emit(true);
    };
    FileInputComponent.prototype.onDuplicateFileName = function (fileName) {
        this.fileUpload.fileName = fileName;
        this.fileUpload.fileDescription = null;
        this.fileUpload.base64FileContent = null;
        this.fileUpload.duplicateFileName = true;
        this.writeValue(this.fileUpload);
        this.onChange(this.fileUpload);
        this.duplicateFileName.emit(true);
    };
    FileInputComponent.prototype.writeValue = function (value) {
        if (value) {
            this.fileUpload = value;
        }
        else {
            this.fileUpload = new FileUpload();
        }
    };
    FileInputComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    FileInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    FileInputComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabledState = isDisabled;
    };
    var FileInputComponent_1;
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FileInputComponent.prototype, "acceptsTypes", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FileInputComponent.prototype, "buttonLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FileInputComponent.prototype, "color", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileInputComponent.prototype, "allowOverwrites", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FileInputComponent.prototype, "delete", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FileInputComponent.prototype, "upload", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FileInputComponent.prototype, "duplicateFileName", void 0);
    FileInputComponent = FileInputComponent_1 = __decorate([
        Component({
            selector: 'samplicity-file-input',
            templateUrl: './file-input.component.html',
            styleUrls: ['./file-input.component.scss'],
            providers: [{
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return FileInputComponent_1; }),
                    multi: true
                }]
        }),
        __metadata("design:paramtypes", [System,
            ClientService,
            DomSanitizer])
    ], FileInputComponent);
    return FileInputComponent;
}());
export { FileInputComponent };
//# sourceMappingURL=file-input.component.js.map