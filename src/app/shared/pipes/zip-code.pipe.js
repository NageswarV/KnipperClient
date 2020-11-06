import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
var ZipCodePipe = /** @class */ (function () {
    function ZipCodePipe() {
    }
    ZipCodePipe.prototype.transform = function (value) {
        if (value == null || value === '') {
            return '';
        }
        var text = value.split('-').join('');
        if (value.length > 5) {
            return text.slice(0, 5) + "-" + text.slice(5, 9);
        }
        else {
            return value;
        }
    };
    ZipCodePipe = __decorate([
        Pipe({ name: 'zipCode' })
    ], ZipCodePipe);
    return ZipCodePipe;
}());
export { ZipCodePipe };
//# sourceMappingURL=zip-code.pipe.js.map