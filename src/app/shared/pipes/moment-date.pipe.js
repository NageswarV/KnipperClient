import { __decorate } from "tslib";
// Workaround for incorrect parsing of material date objects in Firefox
import { Pipe } from '@angular/core';
import * as moment from 'moment';
var MomentDatePipe = /** @class */ (function () {
    function MomentDatePipe() {
    }
    MomentDatePipe.prototype.transform = function (value, locale, includeTime) {
        if (locale === void 0) { locale = 'en-US'; }
        if (includeTime === void 0) { includeTime = false; }
        if (value === null || value === undefined) {
            return null;
        }
        if (value && !value['_isAMomentObject']) {
            value = moment(value);
        }
        var date = value.tz('America/New_York').locale(locale).format('MM/DD/YYYY');
        if (includeTime) {
            var time = value.tz('America/New_York').locale(locale).format('hh:mm A');
            return value ? date + ' at ' + time + ' EST' : null;
        }
        else {
            return value ? date : null;
        }
    };
    MomentDatePipe = __decorate([
        Pipe({
            name: 'momentDate'
        })
    ], MomentDatePipe);
    return MomentDatePipe;
}());
export { MomentDatePipe };
//# sourceMappingURL=moment-date.pipe.js.map