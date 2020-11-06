// Workaround for incorrect parsing of material date objects in Firefox
import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from 'angular-l10n';
import * as moment from 'moment';

@Pipe({
  name: 'momentTime'
})
export class MomentTimePipe implements PipeTransform {

  constructor(private translationService: TranslationService) { }

  transform(value: any, locale: string = 'en-US'): any {
    if (value && !value['_isAMomentObject']) {
      value = moment(value);
    }
    if (value && value.tz) {
      return value.tz('America/New_York').locale(locale).format('hh:mm A') + ' EST';
    }
    return null;
  }

}
