import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Language } from 'angular-l10n';
var FormPrimaryWellComponent = /** @class */ (function () {
    function FormPrimaryWellComponent() {
        this.isOpenOnLoad = true;
        this.hasErrorPrefix = false;
        this.headerTranslated = false;
        this.hideButton = false;
        this.buttonClick = new EventEmitter();
    }
    Object.defineProperty(FormPrimaryWellComponent.prototype, "headerIsDto", {
        get: function () {
            return Array.isArray(this.header) && this.header[0] instanceof Object;
        },
        enumerable: false,
        configurable: true
    });
    FormPrimaryWellComponent.prototype.ngOnInit = function () {
        if (this.isCard) {
            this.headerClass = 'card-section-header';
        }
    };
    __decorate([
        Language(),
        __metadata("design:type", String)
    ], FormPrimaryWellComponent.prototype, "lang", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormPrimaryWellComponent.prototype, "header", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormPrimaryWellComponent.prototype, "headerParameters", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FormPrimaryWellComponent.prototype, "isCard", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormPrimaryWellComponent.prototype, "isOpenOnLoad", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormPrimaryWellComponent.prototype, "hasErrorPrefix", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormPrimaryWellComponent.prototype, "headerTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormPrimaryWellComponent.prototype, "headerButton", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormPrimaryWellComponent.prototype, "headerbuttonColor", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormPrimaryWellComponent.prototype, "headerButtonIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormPrimaryWellComponent.prototype, "hideButton", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FormPrimaryWellComponent.prototype, "buttonClick", void 0);
    FormPrimaryWellComponent = __decorate([
        Component({
            selector: 'samplicity-form-primary-well',
            templateUrl: './form-primary-well.component.html',
            styleUrls: ['./form-primary-well.component.scss']
        })
    ], FormPrimaryWellComponent);
    return FormPrimaryWellComponent;
}());
export { FormPrimaryWellComponent };
//# sourceMappingURL=form-primary-well.component.js.map