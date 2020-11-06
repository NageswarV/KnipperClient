import { __decorate, __metadata } from "tslib";
import { filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { MessageType } from './validation.service';
import { ValidationService } from './validation.service';
var ValidationComponent = /** @class */ (function () {
    function ValidationComponent(validationService, router) {
        var _this = this;
        this.validationService = validationService;
        this.successMessageList = [];
        this.errorMessageList = [];
        this.warningMessageList = [];
        router.events.pipe(filter(function (event) { return event instanceof NavigationStart; }))
            .subscribe(function (event) {
            if (_this.componentId === 'global') {
                _this.clearMessage('global');
            }
        });
    }
    ValidationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.validationService.getValidationMessage().subscribe(function (x) {
            if (_this.componentId === x.componentId) {
                _this.pushMessage(x);
            }
        });
        this.validationService.getClearEvent().subscribe(function (x) {
            _this.clearMessage(x);
        });
        if (this.componentId === 'global') {
            this.cssClass = 'global';
        }
    };
    ValidationComponent.prototype.pushMessage = function (message) {
        if (message.messageType === MessageType.ERROR) {
            this.errorMessageList.push(message);
        }
        else if (message.messageType === MessageType.WARNING) {
            this.warningMessageList.push(message);
        }
        else {
            this.successMessageList.push(message);
        }
    };
    ValidationComponent.prototype.hideSuccessMessage = function () {
        this.successMessageList = [];
    };
    ValidationComponent.prototype.hideWarningMessage = function () {
        this.warningMessageList = [];
    };
    ValidationComponent.prototype.hideErrorMessage = function () {
        this.errorMessageList = [];
    };
    ValidationComponent.prototype.clearMessage = function (componentId) {
        if (this.componentId === componentId) {
            if (!this.validationService.stickySuccess) {
                this.hideSuccessMessage();
            }
            if (!this.validationService.stickyWarning) {
                this.hideWarningMessage();
            }
            if (!this.validationService.stickyError) {
                this.hideErrorMessage();
            }
        }
    };
    ValidationComponent.prototype.hasErrors = function () {
        return this.errorMessageList.length > 0;
    };
    ValidationComponent.prototype.hasWarning = function () {
        return this.warningMessageList.length > 0;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ValidationComponent.prototype, "componentId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ValidationComponent.prototype, "errorHeading", void 0);
    ValidationComponent = __decorate([
        Component({
            selector: 'sg-validation',
            templateUrl: './validation.component.html',
            styleUrls: ['./validation.component.scss']
        }),
        __metadata("design:paramtypes", [ValidationService, Router])
    ], ValidationComponent);
    return ValidationComponent;
}());
export { ValidationComponent };
//# sourceMappingURL=validation.component.js.map