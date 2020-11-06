import { __decorate, __metadata } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { Language } from 'angular-l10n';
import { MatExpansionPanel } from '@angular/material/expansion';
var FormSectionComponent = /** @class */ (function () {
    function FormSectionComponent() {
        this.expanded = true;
        this.height = 'auto';
        this.level = 1;
        this.isWarning = false;
        this.isError = false;
    }
    Object.defineProperty(FormSectionComponent.prototype, "headerIsDto", {
        get: function () {
            return Array.isArray(this.header) && this.header[0] instanceof Object;
        },
        enumerable: false,
        configurable: true
    });
    FormSectionComponent.prototype.ngOnInit = function () {
        if (this.isCard) {
            this.headerClass = 'card-section-header';
        }
    };
    FormSectionComponent.prototype.openPanel = function () {
        this.expansionPanel.open();
    };
    FormSectionComponent.prototype.closePanel = function () {
        this.expansionPanel.close();
    };
    __decorate([
        Language(),
        __metadata("design:type", String)
    ], FormSectionComponent.prototype, "lang", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormSectionComponent.prototype, "header", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormSectionComponent.prototype, "headerParameters", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormSectionComponent.prototype, "headerIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FormSectionComponent.prototype, "isCard", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormSectionComponent.prototype, "expanded", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormSectionComponent.prototype, "height", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormSectionComponent.prototype, "level", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormSectionComponent.prototype, "isWarning", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FormSectionComponent.prototype, "isError", void 0);
    __decorate([
        ViewChild('expansionPanel', { static: false }),
        __metadata("design:type", MatExpansionPanel)
    ], FormSectionComponent.prototype, "expansionPanel", void 0);
    FormSectionComponent = __decorate([
        Component({
            selector: 'samplicity-form-section',
            templateUrl: './form-section.component.html',
            styleUrls: ['./form-section.component.scss']
        })
    ], FormSectionComponent);
    return FormSectionComponent;
}());
export { FormSectionComponent };
//# sourceMappingURL=form-section.component.js.map