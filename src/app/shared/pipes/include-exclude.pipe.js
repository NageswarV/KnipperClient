import { __decorate, __metadata } from "tslib";
import { Pipe } from '@angular/core';
import { TranslationService } from 'angular-l10n';
var IncludeExcludePipe = /** @class */ (function () {
    function IncludeExcludePipe(translationService) {
        this.translationService = translationService;
    }
    IncludeExcludePipe.prototype.transform = function (value, trueFlag, falseFlag) {
        if (trueFlag === void 0) { trueFlag = 'Include'; }
        if (falseFlag === void 0) { falseFlag = 'Exclude'; }
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
    IncludeExcludePipe = __decorate([
        Pipe({ name: 'includeExclude' }),
        __metadata("design:paramtypes", [TranslationService])
    ], IncludeExcludePipe);
    return IncludeExcludePipe;
}());
export { IncludeExcludePipe };
//# sourceMappingURL=include-exclude.pipe.js.map