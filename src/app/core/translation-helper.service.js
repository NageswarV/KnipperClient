import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { LocaleService, TranslationService } from 'angular-l10n';
var TranslationHelperService = /** @class */ (function () {
    function TranslationHelperService(locale, translationService) {
        this.locale = locale;
        this.translationService = translationService;
    }
    TranslationHelperService.prototype.getLocalizedValue = function (obj, propName, language) {
        if (propName === void 0) { propName = 'names'; }
        if (obj && Array.isArray(obj[propName])) {
            if (!language) {
                var language_1 = this.locale.getCurrentLanguage();
            }
            var name_1 = obj[propName].find(function (item) { return item.language && item.language.toString() === language; });
            if (name_1) {
                return name_1.value;
            }
        }
        return null;
    };
    TranslationHelperService.prototype.getLocalizedValueFromListById = function (id, list) {
        if (Array.isArray(list)) {
            var item = list.find(function (item) { return item.id === id; });
            if (item) {
                var value = this.getLocalizedValue(item);
                if (value) {
                    return value;
                }
            }
        }
        return null;
    };
    TranslationHelperService.prototype.getCurrentLanguage = function () {
        return this.locale.getCurrentLanguage();
    };
    TranslationHelperService.prototype.translate = function (keys, args, lang) {
        return this.translationService.translate(keys, args, lang);
    };
    TranslationHelperService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [LocaleService,
            TranslationService])
    ], TranslationHelperService);
    return TranslationHelperService;
}());
export { TranslationHelperService };
//# sourceMappingURL=translation-helper.service.js.map