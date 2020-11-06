// Workaround for incorrect parsing of material date objects in Firefox
import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from 'angular-l10n';
import * as moment from 'moment';

@Pipe({
  name: 'momentDateTime'
})
export class MomentDateTimePipe implements PipeTransform {

  constructor(private translationService: TranslationService) { }

  transform(value: any, locale: string = 'en-US'): any {
    if (value && !value['_isAMomentObject']) {
      value = moment(value);
    }
    if (value && value.tz) {
      const date: string = value.tz('America/New_York').locale(locale).format('MM/DD/YYYY');
      const time: string = value.tz('America/New_York').locale(locale).format('hh:mm A');

      // #8375 - At client's request, the time will be EDT
      // But displayed with the label of EST to avoid confusion on their side
      return date + ' ' + this.translationService.translate('At ') + time + ' EST';
    }

    return null;
  }

}
