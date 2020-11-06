// Workaround for incorrect parsing of material date objects in Firefox
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'momentDate'
})
export class MomentDatePipe implements PipeTransform {

  transform(value: any, locale: string = 'en-US', includeTime: boolean = false): any {
    if (value === null || value === undefined) {
      return null;
    }

    if (value && !value['_isAMomentObject']) {
      value = moment(value);
    }

    const date: string = value.tz('America/New_York').locale(locale).format('MM/DD/YYYY');

    if (includeTime) {
      const time: string = value.tz('America/New_York').locale(locale).format('hh:mm A');
      return value ? date + ' at ' + time + ' EST' : null;
    } else {
      return value ? date : null;
    }
  }

}
