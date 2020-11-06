import { __decorate, __metadata } from "tslib";
import { Pipe } from '@angular/core';
import { SecurityService } from '../../core/security.service';
import { TranslationService } from 'angular-l10n';
var UserNamePipe = /** @class */ (function () {
    function UserNamePipe(service, translationService) {
        if (translationService === void 0) { translationService = null; }
        this.service = service;
        this.translationService = translationService;
    }
    UserNamePipe.prototype.transform = function (valueId, displayDefaultIfNotExistingId) {
        if (valueId !== this.cachedId) {
            this.cachedValue = this.service.getUserName(valueId);
        }
        if (valueId == null) {
            return this.translationService.translate('SystemUser');
        }
        if (!this.cachedValue && displayDefaultIfNotExistingId) {
            return this.translationService.translate('SystemUser');
        }
        return this.cachedValue;
    };
    UserNamePipe = __decorate([
        Pipe({ name: 'userName' }),
        __metadata("design:paramtypes", [SecurityService, TranslationService])
    ], UserNamePipe);
    return UserNamePipe;
}());
export { UserNamePipe };
//# sourceMappingURL=user-name.pipe.js.map