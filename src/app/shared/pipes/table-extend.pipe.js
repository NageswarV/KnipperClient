import { __decorate, __metadata } from "tslib";
import { Pipe } from '@angular/core';
import { TableExtendType } from '../../common/enum-type';
import { TranslationService } from 'angular-l10n';
var TableExtendPipe = /** @class */ (function () {
    function TableExtendPipe(type, translationService) {
        this.translationService = translationService;
        this.type = type;
    }
    TableExtendPipe.prototype.transform = function (value, pipe, tableArg) {
        var text = value != null ? value : '';
        var prefix = ' (';
        var suffix = ')';
        if (this.type === TableExtendType.Bracket) {
            prefix = ' (';
        }
        else if (this.type === TableExtendType.Count) {
            prefix = '<br/><i>(+';
            suffix = this.translationService.translate('More') + ')</i>';
        }
        else if (this.type === TableExtendType.NextLine) {
            prefix = '<br/>(';
        }
        else if (this.type === TableExtendType.AddValue) {
            prefix = ': ';
            suffix = '';
        }
        else if (this.type === TableExtendType.LeadingZero) {
            prefix = '';
            suffix = '';
            return ('00000000' + text).slice(-8);
        }
        else if (this.type === TableExtendType.CommaSeparated) {
            prefix = ', ';
            suffix = '';
        }
        if (tableArg && pipe) {
            var result = pipe.transform(text);
            if (result) {
                return result + prefix + tableArg + suffix;
            }
            else {
                return result + this.removeNewLine(prefix) + tableArg + suffix;
            }
        }
        else if (pipe) {
            return pipe.transform(text);
        }
        else if (tableArg) {
            if (text) {
                return text + prefix + tableArg + suffix;
            }
            else {
                return text + this.removeNewLine(prefix) + tableArg + suffix;
            }
        }
        else {
            return text;
        }
    };
    TableExtendPipe.prototype.removeNewLine = function (value) {
        var text = value != null ? value : '';
        return text.replace('<br/>', ' ');
    };
    TableExtendPipe = __decorate([
        Pipe({ name: 'tableExtend' }),
        __metadata("design:paramtypes", [TableExtendType, TranslationService])
    ], TableExtendPipe);
    return TableExtendPipe;
}());
export { TableExtendPipe };
//# sourceMappingURL=table-extend.pipe.js.map