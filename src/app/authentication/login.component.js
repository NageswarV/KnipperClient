import { __awaiter, __decorate, __extends, __generator, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TenantService } from '../tenant';
import { BusySpinner } from '../common/busy-spinner';
import { AuthenticationService, LoginData } from './authentication.service';
var LoginComponent = /** @class */ (function (_super) {
    __extends(LoginComponent, _super);
    function LoginComponent(authenticationService, tenantService, modalService, router, route) {
        var _this = _super.call(this) || this;
        _this.authenticationService = authenticationService;
        _this.tenantService = tenantService;
        _this.modalService = modalService;
        _this.router = router;
        _this.route = route;
        _this.loginData = new LoginData();
        _this.loginAttachmentUrls = [];
        _this.modalOption = { backdrop: 'static' };
        return _this;
    }
    LoginComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(LoginComponent.prototype, "doShowPasswordResetLink", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    LoginComponent.prototype.btnSignInClickHandler = function () {
        this.authenticationService.login({
            userName: this.loginData.userName.trim(),
            password: this.loginData.password
        });
    };
    ;
    LoginComponent.prototype.passwordExpired = function () {
        if (this.modalRef) {
            this.modalRef.close();
        }
        this.router.navigate(['/passwordreset'], { queryParams: { emailAddress: this.loginData.userName, expired: true } });
    };
    LoginComponent.prototype.resetRequired = function () {
        if (this.modalRef) {
            this.modalRef.close();
        }
        this.router.navigate(['/passwordforgot']);
    };
    __decorate([
        ViewChild('expiredpopup', { static: true }),
        __metadata("design:type", Object)
    ], LoginComponent.prototype, "expiredpopup", void 0);
    __decorate([
        ViewChild('resetpopup', { static: true }),
        __metadata("design:type", Object)
    ], LoginComponent.prototype, "resetpopup", void 0);
    LoginComponent = __decorate([
        Component({
            selector: 'sg-login-cmp',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        __metadata("design:paramtypes", [AuthenticationService,
            TenantService,
            NgbModal,
            Router,
            ActivatedRoute])
    ], LoginComponent);
    return LoginComponent;
}(BusySpinner));
export { LoginComponent };
//# sourceMappingURL=login.component.js.map