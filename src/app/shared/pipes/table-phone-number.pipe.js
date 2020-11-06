import { __decorate, __metadata } from "tslib";
import { Pipe } from '@angular/core';
import { TranslationService } from 'angular-l10n';
var TablePhoneNumberPipe = /** @class */ (function () {
    function TablePhoneNumberPipe(translationService) {
        this.translationService = translationService;
    }
    TablePhoneNumberPipe.prototype.transform = function (value) {
        if (!value) {
            return '';
        }
        var workNumber = [];
        if (value.phoneNbr) {
            workNumber.push(value.phoneNbr);
            if (value.phoneExtensionNbr) {
                workNumber.push(this.translationService.translate('Pipe.ExtDot'));
                workNumber.push(value.phoneExtensionNbr);
            }
            workNumber.push(this.translationService.translate('Pipe.Work'));
        }
        var mobileNumber = [];
        if (value.mobilePhoneNbr) {
            mobileNumber.push(value.mobilePhoneNbr);
            mobileNumber.push(this.translationService.translate('Pipe.Mobile'));
        }
        var faxNumber = [];
        if (value.faxNbr) {
            faxNumber.push(value.faxNbr);
            faxNumber.push(this.translationService.translate('Pipe.Fax'));
        }
        var workText = workNumber.filter(Boolean).join(' ');
        var mobileText = mobileNumber.filter(Boolean).join(' ');
        var faxText = faxNumber.filter(Boolean).join(' ');
        var phoneNumbers = [];
        phoneNumbers.push(workText);
        phoneNumbers.push(mobileText);
        phoneNumbers.push(faxText);
        var phoneNumbersText = phoneNumbers.filter(Boolean).join('<br/>');
        return phoneNumbersText;
    };
    TablePhoneNumberPipe = __decorate([
        Pipe({ name: 'tablePhoneNumber' }),
        __metadata("design:paramtypes", [TranslationService])
    ], TablePhoneNumberPipe);
    return TablePhoneNumberPipe;
}());
export { TablePhoneNumberPipe };
//# sourceMappingURL=table-phone-number.pipe.js.map