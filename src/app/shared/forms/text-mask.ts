import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeUntil';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export class TextMasks {
  static phoneNumber = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  static phoneNumberExtended = [/\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  static date = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  static readonly positiveInteger = new createNumberMask({
    prefix: '',
    allowDecimal: false,
    includeThousandsSeparator: false,
    allowNegative: false,
    allowLeadingZeroes: true
  });

  static readonly positiveFloat = new createNumberMask({
    prefix: '',
    allowDecimal: true,
    includeThousandsSeparator: false,
    allowNegative: false,
    allowLeadingZeroes: true
  });

  static currency(rawValue: string) {
    const numberMask = createNumberMask({
      prefix: '',
      includeThousandsSeparator: false,
      allowDecimal: true,
      requireDecimal: true,
      allowLeadingZeroes: false
    });
    const mask = numberMask(rawValue);

    const decimalsRegex = /\.([0-9]{1,2})/;
    const result = decimalsRegex.exec(rawValue);
    if (result && result[1].length < 2) {
      mask.push('0');
    } else if (!result) {
      mask.push('0');
      mask.push('0');
    }
    return mask;
  }

  static alphaNumeric(rawValue: string) {
    rawValue = rawValue.replace(/\s/g, '');
    const alphaNumRegex = /[^\W_]/;
    return rawValue.split('').map((char) => alphaNumRegex.test(char) ? alphaNumRegex : '');
  }

  static alpha(rawValue: string) {
    rawValue = rawValue.replace(/\s/g, '');
    const alphaRegex = /^[A-Za-z]/;

    const abc = rawValue.split('').map((char) => alphaRegex.test(char) ? alphaRegex : '');
    return rawValue.split('').map((char) => alphaRegex.test(char) ? alphaRegex : '');
  }

  static zipCode = (str) => {
    const zipCode5 = [/\d/, /\d/, /\d/, /\d/, /\d/];
    const zipCode7 = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    if (str) {
      const digitStr = str.match(/\d+/g);

      if (digitStr) {
        return digitStr.reduce((a, b) => a + b.length, 0) <= 5 ?
          zipCode5 : zipCode7;
      }
    }

    return zipCode5;
  }
}

export class TextUnmasks {
  static phoneNumber: RegExp = /\D/g;
  static zipCode: RegExp = /[\W_]/g;
}

export function unmask(formControl: AbstractControl, mask: RegExp): Subscription {
  return formControl.valueChanges.do((value: string = '') => {
    if (value) {
      const unmaskedValue = String(value).replace(mask, '');
      formControl.setValue(unmaskedValue, { emitEvent: false, emitModelToViewChange: false });
    }
  }).subscribe();
}

export const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const ZipcodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
