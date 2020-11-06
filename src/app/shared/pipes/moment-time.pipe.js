import { __decorate, __metadata } from "tslib";
// Workaround for incorrect parsing of material date objects in Firefox
import { Pipe } from '@angular/core';
import { TranslationService } from 'angular-l10n';
import * as moment from 'moment';
var MomentTimePipe = /** @class */ (function () {
    function MomentTimePipe(translationService) {
        this.translationService = translationService;
    }
    MomentTimePipe.prototype.transform = function (value, locale) {
        if (locale === void 0) { locale = 'en-US'; }
        if (value && !value['_isAMomentObject']) {
            value = moment(value);
        }
        if (value && value.tz) {
            return value.tz('America/New_York').locale(locale).format('hh:mm A') + ' EST';
        }
        return null;
    };
    MomentTimePipe = __decorate([
        Pipe({
            name: 'momentTime'
        }),
        __metadata("design:paramtypes", [TranslationService])
    ], MomentTimePipe);
    return MomentTimePipe;
}());
export { MomentTimePipe };
//# sourceMappingURL=moment-time.pipe.js.map