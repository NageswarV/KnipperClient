import { __extends } from "tslib";
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment-timezone';
var SamplicityDateAdapter = /** @class */ (function (_super) {
    __extends(SamplicityDateAdapter, _super);
    function SamplicityDateAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Enforces stricter parsing of input dates to the datepicker input for inline validation. A valid
    // Moment object is only returned if the input string is not null and matches 'MM/DD/YYYY' format.
    // By default Moment parses incomplete strings and return valid objects (eg: '10/' => '10/01/2017')
    SamplicityDateAdapter.prototype.parse = function (value, parseFormat) {
        if (!value) {
            return null;
        }
        if (value.match(parseFormat)) {
            return moment(value, 'MM-DD-YYYY').utc();
        }
        else {
            return this.invalid();
        }
    };
    SamplicityDateAdapter.prototype.deserialize = function (value) {
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
        return _super.prototype.deserialize.call(this, value);
    };
    SamplicityDateAdapter.SAMPLICITY_DATE_FORMATS = {
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
    return SamplicityDateAdapter;
}(MomentDateAdapter));
export { SamplicityDateAdapter };
//# sourceMappingURL=date-adapter.js.map