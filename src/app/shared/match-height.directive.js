import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, Input, HostListener } from '@angular/core';
var MatchHeightDirective = /** @class */ (function () {
    function MatchHeightDirective(el) {
        this.el = el;
    }
    MatchHeightDirective.prototype.ngAfterViewChecked = function () {
        this.matchHeight(this.el.nativeElement, this.sgMyMatchHeight);
    };
    MatchHeightDirective.prototype.onResize = function () {
        this.matchHeight(this.el.nativeElement, this.sgMyMatchHeight);
    };
    MatchHeightDirective.prototype.onTransitionEnd = function () {
        this.matchHeight(this.el.nativeElement, this.sgMyMatchHeight);
    };
    MatchHeightDirective.prototype.matchHeight = function (parent, className) {
        /* tslint:disable */
        if (!parent)
            return;
        var children = parent.getElementsByClassName(className);
        if (!children)
            return;
        /* tslint:enable */
        Array.from(children).forEach(function (x) {
            x.style.height = 'auto';
        });
        var itemHeights = Array.from(children)
            .map(function (x) { return x.getBoundingClientRect().height; });
        var maxHeight = itemHeights.reduce(function (prev, curr) {
            return curr > prev ? curr : prev;
        }, 0);
        Array.from(children)
            .forEach(function (x) { return x.style.height = maxHeight + "px"; });
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MatchHeightDirective.prototype, "sgMyMatchHeight", void 0);
    __decorate([
        HostListener('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MatchHeightDirective.prototype, "onResize", null);
    __decorate([
        HostListener('document:transitionend'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MatchHeightDirective.prototype, "onTransitionEnd", null);
    MatchHeightDirective = __decorate([
        Directive({
            selector: '[sgMyMatchHeight]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], MatchHeightDirective);
    return MatchHeightDirective;
}());
export { MatchHeightDirective };
//# sourceMappingURL=match-height.directive.js.map