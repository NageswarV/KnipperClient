import { __decorate, __extends, __metadata } from "tslib";
import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { ValidationService } from '../validation';
import { ActivatedRoute, Router } from '@angular/router';
import { BusySpinner } from '../common/busy-spinner';
var IMAGES = ['banner1.jpg', 'banner2.jpg', 'banner3.jpg'];
var PasswordResetComponent = /** @class */ (function (_super) {
    __extends(PasswordResetComponent, _super);
    function PasswordResetComponent(authenticationService, route, router, validationService) {
        var _this = _super.call(this) || this;
        _this.authenticationService = authenticationService;
        _this.route = route;
        _this.router = router;
        _this.validationService = validationService;
        _this.images = IMAGES;
        _this.containPartsPass = true;
        return _this;
    }
    PasswordResetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.email = params['emailAddress'];
            _this.resetToken = params['resetToken'];
            _this.timestamp = params['timestamp'];
            _this.isExpiredPassword = params['expired'];
            _this.resetToken = _this.resetToken.replace(/ /g, '+');
            ;
            if (!_this.isExpiredPassword) {
                // this.setBusySpinner(this.authenticationService.validateUserPasswordResetToken(this.email, this.resetToken)).subscribe(x => {
                //   this.linkHasExpired = !x;
                // }, e => {
                //   this.validationService.clearMessage('global');
                //   this.validationService.validate(e, 'global');
                //   window.scrollTo(0, 0);
                // });
            }
        });
    };
    PasswordResetComponent.prototype.toggleVisible = function (isNew) {
        if (isNew) {
            this.newPasswordVisible = !this.newPasswordVisible;
        }
        else {
            this.oldPasswordVisible = !this.oldPasswordVisible;
        }
    };
    PasswordResetComponent.prototype.oldPasswordChanged = function () {
        this.oldPasswordError = false;
    };
    PasswordResetComponent.prototype.validateRules = function () {
        if (!this.newPassword) {
            return;
        }
        this.minCharactersPass = this.newPassword.length > 7;
        this.lowercaseLettersPass = (/[a-z]/.test(this.newPassword));
        this.uppercaseLettersPass = (/[A-Z]/.test(this.newPassword));
        this.numbersPass = (/[0-9]/.test(this.newPassword));
        this.specialCharactersPass = (/[~`:?,!@#\$%\^\&*\)\(+=._-]/.test(this.newPassword));
        this.includesFromGroupsPass =
            (this.lowercaseLettersPass ? 1 : 0) + (this.uppercaseLettersPass ? 1 : 0) + (this.numbersPass ? 1 : 0) + (this.specialCharactersPass ? 1 : 0) > 2;
        var partsFound = false;
        if (this.newPassword.length > 2) {
            for (var i = 0; i < this.email.length - 2; i++) {
                partsFound = this.newPassword.indexOf(this.email.substr(i, 3)) !== -1;
                if (partsFound) {
                    break;
                }
            }
        }
        this.containPartsPass = !partsFound;
    };
    PasswordResetComponent.prototype.submitHandler = function () {
        if (this.isExpiredPassword) {
            this.validationService.clearMessage('global');
            // this.setBusySpinner(this.authenticationService.renewExpiredUserPassword(this.email, this.oldPassword, this.newPassword)).subscribe(x => {
            //   this.linkSent = true;
            // }, e => {
            //   const errors = this.validationService.getServerErrors(e);
            //   if (errors.length > 0) {
            //     if (errors[0] === 'WrongOldPassword') {
            //       this.oldPasswordError = true;
            //     } else {
            //       this.validationService.error(errors[0]);
            //       window.scrollTo(0, 0);
            //     }
            //   }
            // });
        }
        else {
            // this.setBusySpinner(this.authenticationService.resetUserPassword(this.email, this.resetToken, this.newPassword)).subscribe(x => {
            //   this.linkSent = true;
            // }, e => {
            //   this.validationService.clearMessage('global');
            //   this.validationService.validate(e, 'global');
            //   window.scrollTo(0, 0);
            // });
        }
    };
    PasswordResetComponent.prototype.navigateToLogin = function () {
        this.router.navigateByUrl("/login");
    };
    PasswordResetComponent = __decorate([
        Component({
            selector: 'sg-password-reset',
            templateUrl: './password-reset.component.html',
            styleUrls: ['./login.component.scss']
        }),
        __metadata("design:paramtypes", [AuthenticationService,
            ActivatedRoute,
            Router,
            ValidationService])
    ], PasswordResetComponent);
    return PasswordResetComponent;
}(BusySpinner));
export { PasswordResetComponent };
//# sourceMappingURL=password-reset.component.js.map