import 'rxjs/add/operator/takeUntil';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
var TextMasks = /** @class */ (function () {
    function TextMasks() {
    }
    TextMasks.currency = function (rawValue) {
        var numberMask = createNumberMask({
            prefix: '',
            includeThousandsSeparator: false,
            allowDecimal: true,
            requireDecimal: true,
            allowLeadingZeroes: false
        });
        var mask = numberMask(rawValue);
        var decimalsRegex = /\.([0-9]{1,2})/;
        var result = decimalsRegex.exec(rawValue);
        if (result && result[1].length < 2) {
            mask.push('0');
        }
        else if (!result) {
            mask.push('0');
            mask.push('0');
        }
        return mask;
    };
    TextMasks.alphaNumeric = function (rawValue) {
        rawValue = rawValue.replace(/\s/g, '');
        var alphaNumRegex = /[^\W_]/;
        return rawValue.split('').map(function (char) { return alphaNumRegex.test(char) ? alphaNumRegex : ''; });
    };
    TextMasks.alpha = function (rawValue) {
        rawValue = rawValue.replace(/\s/g, '');
        var alphaRegex = /^[A-Za-z]/;
        var abc = rawValue.split('').map(function (char) { return alphaRegex.test(char) ? alphaRegex : ''; });
        return rawValue.split('').map(function (char) { return alphaRegex.test(char) ? alphaRegex : ''; });
    };
    TextMasks.phoneNumber = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    TextMasks.phoneNumberExtended = [/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    TextMasks.date = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    TextMasks.positiveInteger = new createNumberMask({
        prefix: '',
        allowDecimal: false,
        includeThousandsSeparator: false,
        allowNegative: false,
        allowLeadingZeroes: true
    });
    TextMasks.positiveFloat = new createNumberMask({
        prefix: '',
        allowDecimal: true,
        includeThousandsSeparator: false,
        allowNegative: false,
        allowLeadingZeroes: true
    });
    TextMasks.zipCode = function (str) {
        var zipCode5 = [/\d/, /\d/, /\d/, /\d/, /\d/];
        var zipCode7 = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        if (str) {
            var digitStr = str.match(/\d+/g);
            if (digitStr) {
                return digitStr.reduce(function (a, b) { return a + b.length; }, 0) <= 5 ?
                    zipCode5 : zipCode7;
            }
        }
        return zipCode5;
    };
    return TextMasks;
}());
export { TextMasks };
var TextUnmasks = /** @class */ (function () {
    function TextUnmasks() {
    }
    TextUnmasks.phoneNumber = /\D/g;
    TextUnmasks.zipCode = /[\W_]/g;
    return TextUnmasks;
}());
export { TextUnmasks };
export function unmask(formControl, mask) {
    return formControl.valueChanges.do(function (value) {
        if (value === void 0) { value = ''; }
        if (value) {
            var unmaskedValue = String(value).replace(mask, '');
            formControl.setValue(unmaskedValue, { emitEvent: false, emitModelToViewChange: false });
        }
    }).subscribe();
}
export var EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export var ZipcodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
//# sourceMappingURL=text-mask.js.map