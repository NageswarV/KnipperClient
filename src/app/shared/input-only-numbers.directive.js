import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
var InputOnlyNumbersDirective = /** @class */ (function () {
    function InputOnlyNumbersDirective(el) {
        this.el = el;
        this.regexStr = '^[0-9]*$';
    }
    InputOnlyNumbersDirective.prototype.onKeyDown = function (event) {
        var e = event;
        /* tslint:disable */
        if (this.sgOnlyNumber) {
            if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: Ctrl+C
                (e.keyCode == 67 && e.ctrlKey === true) ||
                // Allow: Ctrl+V
                (e.keyCode == 86 && e.ctrlKey === true) ||
                // Allow: Ctrl+X
                (e.keyCode == 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            var ch = void 0;
            if (e.key === undefined) {
                // Safari does not have a defined key and only keyCode
                ch = String.fromCharCode(e.keyCode);
            }
            else {
                ch = e.key;
            }
            var regEx = new RegExp(this.regexStr);
            if (!regEx.test(ch)) {
                e.preventDefault();
            }
            /* tslint:enable */
        }
    };
    InputOnlyNumbersDirective.prototype.onKeyUp = function (event) {
        var e = event;
        var val = e.currentTarget['value'];
        if (val) {
            if ((this.min || this.min === 0) && parseInt(e.currentTarget['value']) < this.min) {
                e.currentTarget['value'] = this.min;
                e.currentTarget.dispatchEvent(new Event("input", { bubbles: true }));
            }
            if ((this.max || this.max === 0) && parseInt(e.currentTarget['value']) > this.max) {
                e.currentTarget['value'] = this.max;
                e.currentTarget.dispatchEvent(new Event("input", { bubbles: true }));
            }
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], InputOnlyNumbersDirective.prototype, "sgOnlyNumber", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], InputOnlyNumbersDirective.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], InputOnlyNumbersDirective.prototype, "max", void 0);
    __decorate([
        HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], InputOnlyNumbersDirective.prototype, "onKeyDown", null);
    __decorate([
        HostListener('keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], InputOnlyNumbersDirective.prototype, "onKeyUp", null);
    InputOnlyNumbersDirective = __decorate([
        Directive({
            selector: '[sgOnlyNumber]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], InputOnlyNumbersDirective);
    return InputOnlyNumbersDirective;
}());
export { InputOnlyNumbersDirective };
//# sourceMappingURL=input-only-numbers.directive.js.map