import { __decorate, __metadata, __param } from "tslib";
import { timer as observableTimer } from 'rxjs';
import { Component, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { TenantService } from '../tenant';
var LoginCarouselComponent = /** @class */ (function () {
    function LoginCarouselComponent(document, tenantService) {
        this.document = document;
        this.tenantService = tenantService;
    }
    LoginCarouselComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.disableTransitions = false;
        this.loginAttachmentUrls = [];
        this.scrollTimer = observableTimer(5000, 4000);
        this.displayLoginAttachmentUrls = this.loginAttachmentUrls;
        this.displayLoginAttachmentUrls = this.displayLoginAttachmentUrls.concat(this.loginAttachmentUrls[0]);
        this.slideOffsetNumber = 0;
        this.setSliderStyles();
        if (!this.document.hidden) {
            this.timerSubscription = this.scrollTimer.subscribe(function (t) {
                _this.advanceSlider();
            });
        }
    };
    LoginCarouselComponent.prototype.setSliderStyles = function () {
        this.containerWidthNumber = 100 * (this.loginAttachmentUrls.length + 1);
        this.containerWidthStyle = this.containerWidthNumber + '%';
        this.slideWidthNumber = 100 / (this.loginAttachmentUrls.length + 1);
        this.slideWidthStyle = this.slideWidthNumber + '%';
        this.slideOffsetStyle = this.slideOffsetNumber + '%';
        this.maxOffsetNumber = ((this.loginAttachmentUrls.length + 1) * 100) - 100;
    };
    LoginCarouselComponent.prototype.advanceSlider = function () {
        if (this.slideOffsetNumber < this.maxOffsetNumber) {
            this.slideOffsetNumber += 100;
            this.slideOffsetStyle = this.slideOffsetNumber + '%';
        }
        else {
            this.resetSlider();
        }
    };
    LoginCarouselComponent.prototype.resetSlider = function () {
        var _this = this;
        this.disableTransitions = true;
        this.slideOffsetNumber = 0;
        this.slideOffsetStyle = this.slideOffsetNumber + '%';
        setTimeout(function () {
            _this.disableTransitions = false;
            _this.advanceSlider();
        }, 100);
    };
    LoginCarouselComponent.prototype.onVisibilityChange = function () {
        var _this = this;
        if (this.document.hidden) {
            this.timerSubscription.unsubscribe();
        }
        else {
            this.timerSubscription = this.scrollTimer.subscribe(function (t) {
                _this.advanceSlider();
            });
        }
    };
    LoginCarouselComponent.prototype.ngOnDestroy = function () {
        this.timerSubscription.unsubscribe();
    };
    __decorate([
        HostListener('document:visibilitychange', []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LoginCarouselComponent.prototype, "onVisibilityChange", null);
    LoginCarouselComponent = __decorate([
        Component({
            selector: 'sg-login-carousel',
            templateUrl: './login-carousel.component.html',
            styleUrls: ['./login-carousel.component.scss']
        }),
        __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object, TenantService])
    ], LoginCarouselComponent);
    return LoginCarouselComponent;
}());
export { LoginCarouselComponent };
//# sourceMappingURL=login-carousel.component.js.map