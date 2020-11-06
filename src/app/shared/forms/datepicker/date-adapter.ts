import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment-timezone';

export class SamplicityDateAdapter extends MomentDateAdapter {

  static SAMPLICITY_DATE_FORMATS = {
    parse: {
      dateInput: /^\d{2}\/\d{2}\/\d{4}$/,
    },
    display: {
      dateInput: 'L',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'L',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };

  // Enforces stricter parsing of input dates to the datepicker input for inline validation. A valid
  // Moment object is only returned if the input string is not null and matches 'MM/DD/YYYY' format.
  // By default Moment parses incomplete strings and return valid objects (eg: '10/' => '10/01/2017')
  parse(value: any, parseFormat: string | string[]): moment.Moment | null {
    if (!value) { return null; }
    if (value.match(parseFormat)) {
      return moment(value, 'MM-DD-YYYY').utc();
    } else {
      return this.invalid();
    }
  }

  deserialize(value: any): moment.Moment | null {
    // if (value) {
    //   // value on datepicker is set to a string after saveForm()
    //   // so force value to be a moment UTC
    //   if (typeof value === 'string') {
    //     return moment(value).utc();
    //   }
    //   if (value instanceof moment) {
    //     if (!value.isUTC()) {
    //       // force value to be moment UTC, since this is date only
    //       return value.utc();
    //     }
    //   }
    // }
    return super.deserialize(value);
  }
}
