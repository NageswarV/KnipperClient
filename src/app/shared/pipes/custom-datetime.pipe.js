import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
var CustomDateTimePipe = /** @class */ (function () {
    function CustomDateTimePipe() {
    }
    CustomDateTimePipe.prototype.transform = function (value, time, formatType) {
        if (value == null) {
            return '';
        }
        if (formatType === 1) {
            return "July 08 7:30 PM, 2020 EST";
        }
    };
    CustomDateTimePipe = __decorate([
        Pipe({ name: 'sgCustomDateTime' })
    ], CustomDateTimePipe);
    return CustomDateTimePipe;
}());
export { CustomDateTimePipe };
//# sourceMappingURL=custom-datetime.pipe.js.map