import { __decorate, __metadata } from "tslib";
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Renderer2 } from '@angular/core';
var SpinnerOverlayComponent = /** @class */ (function () {
    function SpinnerOverlayComponent(renderer) {
        this.renderer = renderer;
        this.messageText = 'Spinner.Saving';
        this.messageTextTranslated = null;
        this.isVisible = false;
    }
    SpinnerOverlayComponent.prototype.ngOnInit = function () {
        this.renderer.addClass(document.body, 'no-scroll');
    };
    SpinnerOverlayComponent.prototype.ngOnDestroy = function () {
        this.renderer.removeClass(document.body, 'no-scroll');
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SpinnerOverlayComponent.prototype, "messageText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SpinnerOverlayComponent.prototype, "messageTextTranslated", void 0);
    SpinnerOverlayComponent = __decorate([
        Component({
            selector: 'samplicity-spinner-overlay',
            templateUrl: './spinner-overlay.component.html',
            styleUrls: ['./spinner-overlay.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [Renderer2])
    ], SpinnerOverlayComponent);
    return SpinnerOverlayComponent;
}());
export { SpinnerOverlayComponent };
//# sourceMappingURL=spinner-overlay.component.js.map