import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import { SecurityService } from '../../core/security.service';
var DisableIfUnauthorizedDirective = /** @class */ (function () {
    function DisableIfUnauthorizedDirective(el, securityService) {
        this.el = el;
        this.securityService = securityService;
    }
    DisableIfUnauthorizedDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.disableIfUnauthorized) {
            this.securityService.checkPermission(this.disableIfUnauthorized)
                .then(function (hasPermission) {
                if (!hasPermission) {
                    _this.disable();
                }
            })
                .catch(function () {
                _this.disable();
            });
        }
    };
    DisableIfUnauthorizedDirective.prototype.disable = function () {
        this.el.nativeElement.disabled = true;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DisableIfUnauthorizedDirective.prototype, "disableIfUnauthorized", void 0);
    DisableIfUnauthorizedDirective = __decorate([
        Directive({
            selector: '[disableIfUnauthorized]'
        }),
        __metadata("design:paramtypes", [ElementRef,
            SecurityService])
    ], DisableIfUnauthorizedDirective);
    return DisableIfUnauthorizedDirective;
}());
export { DisableIfUnauthorizedDirective };
//# sourceMappingURL=disable-if-unauth.directive.js.map