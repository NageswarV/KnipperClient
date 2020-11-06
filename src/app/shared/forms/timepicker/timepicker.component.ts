import {Component, OnInit, Input, ChangeDetectorRef, forwardRef} from '@angular/core';
import { DatepickerComponent } from '../datepicker/datepicker.component';

import { FieldBaseComponent } from '../field-base/field-base.component';
import { Language, LocaleService } from 'angular-l10n';
import * as Moment from 'moment';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'samplicity-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']

})
export class TimepickerComponent<D> extends FieldBaseComponent implements OnInit {

  @Input() linkedDatepicker: DatepickerComponent; // Used if datepicker & timepicker share a formControl
  @Input() time: Date;
  @Input() textMask: string;
  @Input() defaultTime: Moment.Moment; // Otherwise defaults to current time if null
  @Input() minTime: Moment.Moment;
  @Input() maxTime: Moment.Moment;
  @Language() lang: string;
  @Input() labelTranslated = true;
  @Input() isInvalid = false;

  maskSub: Subscription = new Subscription();

  iePattern = new RegExp(/(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:)(\d+)/);
  controlHasBeenTouched: boolean = false;
  previousControlValue: any = null;

  get isDisabled(): boolean {
    return this.control.disabled;
  }

  constructor(
    cd: ChangeDetectorRef,
    private localeService: LocaleService
  ) {
    super(cd);
  }

  ngOnInit() { }

}
