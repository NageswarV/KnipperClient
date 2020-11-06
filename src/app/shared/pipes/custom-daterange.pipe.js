import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
var CustomDateRangePipe = /** @class */ (function () {
    function CustomDateRangePipe() {
    }
    CustomDateRangePipe.prototype.transform = function (value, type, period) {
        var startDate;
        var endDate;
        if (value == null) {
            return '';
        }
        if (type === 1) {
            startDate = value.startTime;
            endDate = value.endTime;
        }
        else if (type === 2) {
            startDate = value.startDate;
            endDate = value.endDate;
        }
        return this.getDateRangeString(period, startDate, endDate);
    };
    CustomDateRangePipe.prototype.getDateRangeString = function (period, start, end) {
        if (period === 'WEEKLY') {
            var last = new Date(end - 3 * 24 * 60 * 60 * 1000);
            var prefix = start.toLocaleString('default', { month: 'short' }) + ' ' + start.getDate();
            var prefix2 = last.toLocaleString('default', { month: 'short' }) + ' ' + last.getDate();
            if (start.getFullYear() !== last.getFullYear()) {
                return prefix + ', ' + start.getFullYear() + ' - ' + prefix2 + ', ' + last.getFullYear();
            }
            return prefix + ' - ' + prefix2 + ', ' + end.getFullYear();
        }
        else if (period === 'MONTHLY') {
            return start.toLocaleString('default', { month: 'short' }) + ', ' + start.getFullYear();
        }
        else if (period === 'QUARTERLY') {
            return 'Q' + (Math.ceil((start.getMonth() + 1) / 3)) + ', ' + start.getFullYear();
        }
        return '';
    };
    CustomDateRangePipe = __decorate([
        Pipe({ name: 'sgCustomDateRange' })
    ], CustomDateRangePipe);
    return CustomDateRangePipe;
}());
export { CustomDateRangePipe };
//# sourceMappingURL=custom-daterange.pipe.js.map