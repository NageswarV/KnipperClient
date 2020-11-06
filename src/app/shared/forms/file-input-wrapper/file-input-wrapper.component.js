import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
var FileInputWrapperComponent = /** @class */ (function (_super) {
    __extends(FileInputWrapperComponent, _super);
    function FileInputWrapperComponent() {
        var _this = _super.call(this) || this;
        _this.existingAttachments = [];
        _this.upload = new EventEmitter();
        _this.delete = new EventEmitter();
        _this.duplicateFileName = new EventEmitter();
        return _this;
    }
    Object.defineProperty(FileInputWrapperComponent.prototype, "showDuplicateNameError", {
        get: function () {
            var attachment = this.control.value;
            if (attachment && this.existingAttachments != null) {
                var fileName_1 = attachment.fileName;
                if (fileName_1 != null) {
                    var duplicateFilename = this.existingAttachments
                        .find(function (x) { return x && x.toLowerCase() === fileName_1.toLowerCase(); });
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
    Object.defineProperty(FileInputWrapperComponent.prototype, "isUploaded", {
        get: function () {
            return this._isUploaded;
        },
        enumerable: false,
        configurable: true
    });
    FileInputWrapperComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.control.valueChanges.subscribe(function (value) {
            _this._isUploaded = (value && !value.duplicateFileName);
        });
    };
    FileInputWrapperComponent.prototype.ngAfterViewInit = function () {
        if (this.control.value && !this.control.value.duplicateFileName) {
            this._isUploaded = true;
        }
    };
    FileInputWrapperComponent.prototype.onDeleteFile = function () {
        this.delete.emit(true);
    };
    FileInputWrapperComponent.prototype.onUploadFile = function () {
        this.upload.emit(true);
    };
    FileInputWrapperComponent.prototype.onDuplicateFileName = function () {
        this.duplicateFileName.emit(true);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FileInputWrapperComponent.prototype, "acceptsTypes", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FileInputWrapperComponent.prototype, "allowOverwrites", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FileInputWrapperComponent.prototype, "buttonLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FileInputWrapperComponent.prototype, "color", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FileInputWrapperComponent.prototype, "existingAttachments", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FileInputWrapperComponent.prototype, "upload", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FileInputWrapperComponent.prototype, "delete", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FileInputWrapperComponent.prototype, "duplicateFileName", void 0);
    FileInputWrapperComponent = __decorate([
        Component({
            selector: 'samplicity-file-input-wrapper',
            templateUrl: './file-input-wrapper.component.html',
            styleUrls: ['./file-input-wrapper.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], FileInputWrapperComponent);
    return FileInputWrapperComponent;
}(FieldBaseComponent));
export { FileInputWrapperComponent };
//# sourceMappingURL=file-input-wrapper.component.js.map