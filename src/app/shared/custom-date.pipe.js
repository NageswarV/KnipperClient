import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
var CustomDatePipe = /** @class */ (function () {
    function CustomDatePipe() {
    }
    CustomDatePipe.prototype.transform = function (value, time, rpTableFormat) {
        if (rpTableFormat) {
            var tmp = new Date(value);
            var valueDate = (tmp.getDate() + '').length === 1 ? '0' + tmp.getDate() : tmp.getDate() + '';
            return tmp.toLocaleString('default', { month: 'short' }) + ' ' + tmp.getDate() + ',' + tmp.getFullYear();
        }
        if (value == null) {
            return '';
        }
        time = time || false;
        var date = new Date(value);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        var dateStr = this.pad(date.getMonth() + 1, 2) + '/'
            + this.pad(date.getDate(), 2) + '/'
            + date.getFullYear().toString();
        if (time) {
            dateStr = dateStr + ' ' + hours.toString() + ':' + (minutes < 10 ? '0' + minutes.toString() : minutes.toString()) + ' ' + ampm;
        }
        return dateStr;
    };
    CustomDatePipe.prototype.pad = function (num, size) {
        var s = num + '';
        while (s.length < size) {
            s = '0' + s;
        }
        return s;
    };
    CustomDatePipe = __decorate([
        Pipe({ name: 'sgCustomDate' })
    ], CustomDatePipe);
    return CustomDatePipe;
}());
export { CustomDatePipe };
//# sourceMappingURL=custom-date.pipe.js.map