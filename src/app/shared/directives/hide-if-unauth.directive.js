import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import { SecurityService } from '../../core/security.service';
var HideIfUnauthorizedDirective = /** @class */ (function () {
    function HideIfUnauthorizedDirective(el, securityService) {
        this.el = el;
        this.securityService = securityService;
    }
    HideIfUnauthorizedDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.hideIfUnauthorized) {
            this.securityService.checkPermission(this.hideIfUnauthorized)
                .then(function (hasPermission) {
                if (!hasPermission) {
                    _this.hide();
                }
            })
                .catch(function () {
                _this.hide();
            });
        }
    };
    HideIfUnauthorizedDirective.prototype.hide = function () {
        this.el.nativeElement.style.display = 'none';
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HideIfUnauthorizedDirective.prototype, "hideIfUnauthorized", void 0);
    HideIfUnauthorizedDirective = __decorate([
        Directive({
            selector: '[hideIfUnauthorized]'
        }),
        __metadata("design:paramtypes", [ElementRef,
            SecurityService])
    ], HideIfUnauthorizedDirective);
    return HideIfUnauthorizedDirective;
}());
export { HideIfUnauthorizedDirective };
//# sourceMappingURL=hide-if-unauth.directive.js.map