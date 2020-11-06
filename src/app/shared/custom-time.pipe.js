import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
var CustomTimePipe = /** @class */ (function () {
    function CustomTimePipe() {
    }
    CustomTimePipe.prototype.transform = function (value) {
        if (value == null) {
            return '';
        }
        var date = new Date(value);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        var dateStr = "";
        dateStr = dateStr + hours.toString() + ':' + (minutes < 10 ? '0' + minutes.toString() : minutes.toString()) + ' ' + ampm;
        return dateStr;
    };
    CustomTimePipe.prototype.pad = function (num, size) {
        var s = num + '';
        while (s.length < size) {
            s = '0' + s;
        }
        return s;
    };
    CustomTimePipe = __decorate([
        Pipe({ name: 'sgCustomTime' })
    ], CustomTimePipe);
    return CustomTimePipe;
}());
export { CustomTimePipe };
//# sourceMappingURL=custom-time.pipe.js.map