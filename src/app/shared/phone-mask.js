import { __decorate, __metadata } from "tslib";
import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
var PhoneMaskDirective = /** @class */ (function () {
    function PhoneMaskDirective(ngControl) {
        this.ngControl = ngControl;
    }
    PhoneMaskDirective.prototype.onModelChange = function (event) {
        if (event) {
            this.onInputChange(event, false);
        }
    };
    PhoneMaskDirective.prototype.keydownBackspace = function (event) {
        this.onInputChange(event.target.value, true);
    };
    PhoneMaskDirective.prototype.onInputChange = function (event, backspace) {
        var newVal = event.replace(/\D/g, '');
        if (backspace && newVal.length <= 6) {
            newVal = newVal.substring(0, newVal.length - 1);
        }
        if (newVal.length === 0) {
            newVal = '';
        }
        else if (newVal.length <= 3) {
            newVal = newVal.replace(/^(\d{0,3})/, '$1');
        }
        else if (newVal.length <= 6) {
            newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '$1-$2');
        }
        else if (newVal.length <= 10) {
            newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1-$2-$3');
        }
        else {
            newVal = newVal.substring(0, 10);
            newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1-$2-$3');
        }
        this.ngControl.valueAccessor.writeValue(newVal);
    };
    __decorate([
        HostListener('ngModelChange', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PhoneMaskDirective.prototype, "onModelChange", null);
    __decorate([
        HostListener('keydown.backspace', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PhoneMaskDirective.prototype, "keydownBackspace", null);
    PhoneMaskDirective = __decorate([
        Directive({
            selector: '[formControlName][appPhoneMask]',
        }),
        __metadata("design:paramtypes", [NgControl])
    ], PhoneMaskDirective);
    return PhoneMaskDirective;
}());
export { PhoneMaskDirective };
//# sourceMappingURL=phone-mask.js.map