import { __decorate, __metadata } from "tslib";
import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';
import { AuthenticationService } from './authentication.service';
var CheckPermissionsDirective = /** @class */ (function () {
    function CheckPermissionsDirective(authenticationService, container, template) {
        this.authenticationService = authenticationService;
        this.container = container;
        this.template = template;
        this.isShowing = false;
        this.requiresAll = true;
    }
    Object.defineProperty(CheckPermissionsDirective.prototype, "checkPermissionsRequiresAll", {
        set: function (value) {
            this.requiresAll = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckPermissionsDirective.prototype, "checkPermissions", {
        set: function (permissions) {
            this.checkingPermissions = permissions;
            if (this.checkAccess(this.checkingPermissions)) {
                this.show();
            }
            else {
                this.hide();
            }
        },
        enumerable: false,
        configurable: true
    });
    CheckPermissionsDirective.prototype.checkAccess = function (permissions) {
        return this.authenticationService.checkPermissions(permissions, this.requiresAll);
    };
    CheckPermissionsDirective.prototype.show = function () {
        if (!this.isShowing) {
            this.container.createEmbeddedView(this.template);
            this.isShowing = true;
        }
    };
    CheckPermissionsDirective.prototype.hide = function () {
        if (this.isShowing) {
            this.container.clear();
            this.isShowing = false;
        }
    };
    __decorate([
        Input('sgCheckPermissionsRequiresAll'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], CheckPermissionsDirective.prototype, "checkPermissionsRequiresAll", null);
    __decorate([
        Input('sgCheckPermissions'),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], CheckPermissionsDirective.prototype, "checkPermissions", null);
    CheckPermissionsDirective = __decorate([
        Directive({
            selector: '[sgCheckPermissions]',
            exportAs: 'api'
        }),
        __metadata("design:paramtypes", [AuthenticationService,
            ViewContainerRef,
            TemplateRef])
    ], CheckPermissionsDirective);
    return CheckPermissionsDirective;
}());
export { CheckPermissionsDirective };
//# sourceMappingURL=check-permissions.directive.js.map