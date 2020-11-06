import { __decorate, __extends, __metadata } from "tslib";
import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { ValidationService } from '../validation';
import { TenantService } from '../tenant';
import { BusySpinner } from '../common/busy-spinner';
import { Router } from '@angular/router';
var IMAGES = ['banner1.jpg', 'banner2.jpg', 'banner3.jpg'];
var PasswordForgotComponent = /** @class */ (function (_super) {
    __extends(PasswordForgotComponent, _super);
    function PasswordForgotComponent(authenticationService, router, validationService, tenantService) {
        var _this = _super.call(this) || this;
        _this.authenticationService = authenticationService;
        _this.router = router;
        _this.validationService = validationService;
        _this.tenantService = tenantService;
        _this.images = IMAGES;
        _this.linkSent = false;
        return _this;
    }
    PasswordForgotComponent.prototype.submitHandler = function () {
        // this.setBusySpinner(
        //     this.authenticationService.resetUserPasswordRequest(this.email)).subscribe(x => {
        //     this.linkSent = true;
        // }, e => {
        //     this.validationService.clearMessage('global');
        //     this.validationService.validate(e, 'global');
        //     this.userNameInput.nativeElement.focus();
        // });
    };
    PasswordForgotComponent.prototype.navigateToLogin = function () {
        this.router.navigateByUrl("/login");
    };
    __decorate([
        ViewChild('inUserName', { static: false }),
        __metadata("design:type", ElementRef)
    ], PasswordForgotComponent.prototype, "userNameInput", void 0);
    PasswordForgotComponent = __decorate([
        Component({
            selector: 'sg-password-forgot',
            templateUrl: './password-forgot.component.html',
            styleUrls: ['./login.component.scss']
        }),
        __metadata("design:paramtypes", [AuthenticationService,
            Router,
            ValidationService,
            TenantService])
    ], PasswordForgotComponent);
    return PasswordForgotComponent;
}(BusySpinner));
export { PasswordForgotComponent };
//# sourceMappingURL=password-forgot.component.js.map