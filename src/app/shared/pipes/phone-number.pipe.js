import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
var PhoneNumberPipe = /** @class */ (function () {
    function PhoneNumberPipe() {
    }
    PhoneNumberPipe.prototype.transform = function (value) {
        if (value == null || value === '') {
            return '';
        }
        var text = value.split('-').join('');
        return text.slice(0, 3) + "-" + text.slice(3, 6) + "-" + text.slice(6);
    };
    PhoneNumberPipe = __decorate([
        Pipe({ name: 'phoneNumber' })
    ], PhoneNumberPipe);
    return PhoneNumberPipe;
}());
export { PhoneNumberPipe };
//# sourceMappingURL=phone-number.pipe.js.map