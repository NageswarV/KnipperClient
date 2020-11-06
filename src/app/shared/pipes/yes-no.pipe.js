import { __decorate, __metadata } from "tslib";
import { Pipe } from '@angular/core';
import { TranslationService } from 'angular-l10n';
var YesNoPipe = /** @class */ (function () {
    function YesNoPipe(translationService) {
        this.translationService = translationService;
    }
    YesNoPipe.prototype.transform = function (value, trueFlag, falseFlag) {
        if (trueFlag === void 0) { trueFlag = 'Yes'; }
        if (falseFlag === void 0) { falseFlag = 'No'; }
        if (value) {
            return this.translationService.translate(trueFlag);
        }
        else if (value === false) {
            return this.translationService.translate(falseFlag);
        }
        else {
            return this.translationService.translate('NotApplicable');
        }
    };
    YesNoPipe = __decorate([
        Pipe({ name: 'yesNo' }),
        __metadata("design:paramtypes", [TranslationService])
    ], YesNoPipe);
    return YesNoPipe;
}());
export { YesNoPipe };
//# sourceMappingURL=yes-no.pipe.js.map