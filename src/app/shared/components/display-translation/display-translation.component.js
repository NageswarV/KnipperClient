import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { LocaleService } from 'angular-l10n';
var DisplayTranslationComponent = /** @class */ (function () {
    function DisplayTranslationComponent(locale) {
        this.locale = locale;
    }
    Object.defineProperty(DisplayTranslationComponent.prototype, "currentLanguage", {
        get: function () {
            return this.locale.getCurrentLanguage();
        },
        enumerable: false,
        configurable: true
    });
    DisplayTranslationComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DisplayTranslationComponent.prototype, "values", void 0);
    DisplayTranslationComponent = __decorate([
        Component({
            selector: 'samplicity-display-translation, [samplicity-display-translation]',
            templateUrl: './display-translation.component.html',
            styleUrls: ['./display-translation.component.scss']
        }),
        __metadata("design:paramtypes", [LocaleService])
    ], DisplayTranslationComponent);
    return DisplayTranslationComponent;
}());
export { DisplayTranslationComponent };
//# sourceMappingURL=display-translation.component.js.map