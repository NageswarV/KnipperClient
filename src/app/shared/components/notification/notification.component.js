import { __decorate, __metadata } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { NotificationService } from '../../../core/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { System } from '../../../shared/service-clients/system';
import { FormBuilder } from '@angular/forms';
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(fb, notification, dialog, systemService) {
        var _this = this;
        this.fb = fb;
        this.notification = notification;
        this.dialog = dialog;
        this.systemService = systemService;
        this.displayCloseButton = true;
        this.serverValidationErrors = [];
        this.infoMessageList = [];
        this.blackoutHolds = [];
        notification.globalErrors$.subscribe(function (error) {
            _this.serverError = true;
        });
    }
    NotificationComponent.prototype.ngOnInit = function () { };
    NotificationComponent.prototype.hideCloseButton = function () {
        this.displayCloseButton = false;
    };
    NotificationComponent.prototype.displaySuccessMessage = function (successMessage, successTitle) {
        this.successMessage = successMessage;
        if (successTitle) {
            this.successTitle = successTitle;
        }
        this.removeMessage('info');
        this.removeMessage('warning');
        this.removeMessage('error');
    };
    NotificationComponent.prototype.displayInfoMessage = function (infoMessage, infoTitle) {
        this.infoMessage = infoMessage;
        if (infoTitle) {
            this.infoTitle = infoTitle;
        }
        this.removeMessage('success');
        this.removeMessage('warning');
        this.removeMessage('error');
    };
    NotificationComponent.prototype.displayWarningMessage = function (warningMessage, warningTitle) {
        this.warningMessage = warningMessage;
        if (warningTitle) {
            this.warningTitle = warningTitle;
        }
        this.removeMessage('info');
        this.removeMessage('error');
    };
    NotificationComponent.prototype.displayErrorMessage = function (errorMessage, errorTitle) {
        this.errorMessage = errorMessage;
        if (errorTitle !== undefined) {
            this.errorTitle = errorTitle;
        }
        this.removeMessage('info');
        this.removeMessage('warning');
        this.removeMessage('success');
    };
    NotificationComponent.prototype.removeMessage = function (type) {
        if (type === void 0) { type = ''; }
        if (type === 'success') {
            this.successMessage = '';
            this.successTitle = '';
        }
        else if (type === 'info') {
            this.infoMessage = '';
            this.infoTitle = '';
        }
        else if (type === 'warning') {
            this.warningMessage = '';
            this.warningTitle = '';
        }
        else if (type === 'error') {
            this.errorTitle = '';
            this.errorMessage = '';
            this.serverError = false;
            this.serverValidationErrors = [];
        }
        else {
            this.successMessage = '';
            this.successTitle = '';
            this.infoMessage = '';
            this.infoTitle = '';
            this.errorTitle = '';
            this.errorMessage = '';
            this.serverError = false;
            this.serverValidationErrors = [];
        }
    };
    NotificationComponent.prototype.removeAllMessages = function () {
        this.removeMessage('success');
        this.removeMessage('info');
        this.removeMessage('warning');
        this.removeMessage('error');
    };
    NotificationComponent.prototype.displayInfoMessageWithLinks = function (infoMessage, infoTitle) {
        this.infoMessageList = infoMessage;
        if (infoTitle) {
            this.infoTitle = infoTitle;
        }
        this.removeMessage('success');
        this.removeMessage('warning');
        this.removeMessage('error');
    };
    NotificationComponent.prototype.openModal = function (modal) {
        if (modal === 'blackoutHold') {
            this.dialogRef = this.dialog.open(this.blackoutHoldDialog, { minWidth: '50vw' });
        }
    };
    NotificationComponent.prototype.closeModal = function () {
        this.dialogRef.close();
    };
    NotificationComponent.prototype.isArray = function (value) {
        return Array.isArray(value);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NotificationComponent.prototype, "displayCloseButton", void 0);
    __decorate([
        ViewChild('blackoutHoldDialog', { static: false }),
        __metadata("design:type", Object)
    ], NotificationComponent.prototype, "blackoutHoldDialog", void 0);
    NotificationComponent = __decorate([
        Component({
            selector: 'samplicity-notification',
            templateUrl: './notification.component.html',
            styleUrls: ['./notification.component.scss'],
        }),
        __metadata("design:paramtypes", [FormBuilder,
            NotificationService,
            MatDialog,
            System])
    ], NotificationComponent);
    return NotificationComponent;
}());
export { NotificationComponent };
//# sourceMappingURL=notification.component.js.map