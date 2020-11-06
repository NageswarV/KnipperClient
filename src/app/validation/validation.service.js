import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TranslationService } from 'angular-l10n';
var ValidationService = /** @class */ (function () {
    function ValidationService(translationService, router) {
        this.translationService = translationService;
        this.router = router;
        this.validationMessageSubject = new Subject();
        this.clearEventSubject = new Subject();
    }
    ValidationService.prototype.forbidPage = function () {
        this.router.navigate(['/forbidden']);
    };
    ValidationService.prototype.addMessage = function (message) {
        var _this = this;
        setTimeout(function () { return _this.validationMessageSubject.next(message); }, 0);
    };
    ValidationService.prototype.clearMessage = function (componentId) {
        var _this = this;
        setTimeout(function () { return _this.clearEventSubject.next(componentId); });
    };
    ValidationService.prototype.success = function (messageCode, componentId) {
        var propertyName = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            propertyName[_i - 2] = arguments[_i];
        }
        if (!this.stickySuccess) {
            this.clearMessage(componentId);
        }
        this.addMessage(this.createMessage(MessageType.SUCCESS, messageCode, componentId, propertyName));
    };
    ValidationService.prototype.error = function (messageCode, componentId) {
        var propertyName = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            propertyName[_i - 2] = arguments[_i];
        }
        this.addMessage(this.createMessage(MessageType.ERROR, messageCode, componentId, propertyName));
    };
    ValidationService.prototype.warning = function (messageCode, componentId) {
        var propertyName = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            propertyName[_i - 2] = arguments[_i];
        }
        this.addMessage(this.createMessage(MessageType.WARNING, messageCode, componentId, propertyName));
    };
    ValidationService.prototype.validate = function (exception, componentId) {
        var _this = this;
        var result = JSON.parse(exception.response);
        if (result.error.validationErrors) {
            result.error.validationErrors.forEach(function (x) {
                _this.error(x.message, componentId, x.members);
            });
        }
        else if (result.error.message) {
            this.error(result.error.message, componentId);
        }
    };
    ValidationService.prototype.getServerErrors = function (exception) {
        var result = [];
        var response = JSON.parse(exception.response);
        if (response.error.validationErrors) {
            response.error.validationErrors.forEach(function (x) {
                result.push(x.message);
            });
        }
        else if (response.error.message) {
            result.push(response.error.message);
        }
        return result;
    };
    ValidationService.prototype.createMessage = function (messageType, messageCode, componentId, propertyNames) {
        var message = new Message();
        message.messageType = messageType;
        message.messageCode = (this.translationService.translate(messageCode) || messageCode);
        message.componentId = componentId || 'global';
        message.propertyName = propertyNames;
        return message;
    };
    ValidationService.prototype.getValidationMessage = function () {
        return this.validationMessageSubject.asObservable();
    };
    ValidationService.prototype.getClearEvent = function () {
        return this.clearEventSubject.asObservable();
    };
    ValidationService.prototype.getIsFormDirty = function (status) {
        this.isFormDirty = status;
    };
    ValidationService.prototype.getAocDirty = function (status) {
        this.isAocDirty = status;
    };
    ValidationService.prototype.ngOnDestroy = function () {
        this.validationMessageSubject.unsubscribe();
    };
    ValidationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [TranslationService,
            Router])
    ], ValidationService);
    return ValidationService;
}());
export { ValidationService };
var Message = /** @class */ (function () {
    function Message() {
    }
    return Message;
}());
export { Message };
export var MessageType;
(function (MessageType) {
    MessageType[MessageType["SUCCESS"] = 0] = "SUCCESS";
    MessageType[MessageType["ERROR"] = 1] = "ERROR";
    MessageType[MessageType["WARNING"] = 2] = "WARNING";
})(MessageType || (MessageType = {}));
//# sourceMappingURL=validation.service.js.map