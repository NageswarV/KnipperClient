import { __decorate, __metadata } from "tslib";
// Workaround for incorrect parsing of material date objects in Firefox
import { Pipe } from '@angular/core';
import { TranslationService } from 'angular-l10n';
import * as moment from 'moment';
var MomentDateTimePipe = /** @class */ (function () {
    function MomentDateTimePipe(translationService) {
        this.translationService = translationService;
    }
    MomentDateTimePipe.prototype.transform = function (value, locale) {
        if (locale === void 0) { locale = 'en-US'; }
        if (value && !value['_isAMomentObject']) {
            value = moment(value);
        }
        if (value && value.tz) {
            var date = value.tz('America/New_York').locale(locale).format('MM/DD/YYYY');
            var time = value.tz('America/New_York').locale(locale).format('hh:mm A');
            // #8375 - At client's request, the time will be EDT
            // But displayed with the label of EST to avoid confusion on their side
            return date + ' ' + this.translationService.translate('At ') + time + ' EST';
        }
        return null;
    };
    MomentDateTimePipe = __decorate([
        Pipe({
            name: 'momentDateTime'
        }),
        __metadata("design:paramtypes", [TranslationService])
    ], MomentDateTimePipe);
    return MomentDateTimePipe;
}());
export { MomentDateTimePipe };
//# sourceMappingURL=moment-date-time.pipe.js.map