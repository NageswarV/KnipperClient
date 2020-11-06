import { Component, OnInit, forwardRef, Input, ViewChild} from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import * as Moment from 'moment-timezone';
import { LocaleService, Language } from 'angular-l10n';
import { TextMasks } from '../../text-mask';
import { DatepickerComponent } from '../../datepicker/datepicker.component';


@Component({
  selector: 'samplicity-timepicker-control',
  templateUrl: './timepicker-control.component.html',
  styleUrls: ['./timepicker-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimepickerControlComponent),
      multi: true
    }
  ]
})
export class TimepickerControlComponent implements OnInit {

  @Input() control: FormControl;
  @Input() textMask: string;
  @Input() defaultTime: Moment.Moment; // Otherwise defaults to current time if null
  @Input() minTime: Moment.Moment;
  @Input() maxTime: Moment.Moment;
  @Input() isDisabled: boolean;
  @Input() linkedDatepicker: DatepickerComponent; // Used if datepicker & timepicker share a formControl
  @Input() labelTranslated = true;
  @Input() isInvalid = false;

  @ViewChild('hourInput', {static:false}) hourInput: HTMLInputElement;
  @ViewChild('minuteInput', { static: false }) minuteInput: HTMLInputElement;
  @Language() lang: string;

  hour: string;
  minute: string;
  amPm: string = 'pm';
  masks: object;
  format: string = 'hh:mm a';

  onChange = (time: Date) => {};
  onTouched = () => {};

  get invalidHour(): boolean {
    const hourInt = parseInt(this.hour);
    return (hourInt < 1 || hourInt > 12) ? true : false;
  }

  get invalidMinute(): boolean {
    const minInt = parseInt(this.minute);
    return (minInt < 0 || minInt > 59) ? true : false;
  }

  get exceedsMin(): boolean {
    if (!this.minTime || !this.currentTime) {
      return false;
    }
    const selectedTime = Moment(this.currentTime.format(this.format), this.format);
    const startTime = Moment(this.minTime.format(this.format), this.format);
    return selectedTime.isBefore(startTime)  || (selectedTime === startTime);
  }

  get exceedsMax(): boolean {
    if (!this.maxTime || !this.currentTime) {
      return false;
    }
    const selectedTime = Moment(this.currentTime.format(this.format), this.format);
    const endTime = Moment(this.maxTime.format(this.format), this.format);
    return selectedTime.isAfter(endTime) || (selectedTime === endTime);
  }

  get currentTime(): Moment.Moment {
    if (this.hour && this.minute && !this.invalidHour && !this.invalidMinute) {
      const timeString = this.hour + ':' + this.minute + ' ' + this.amPm
      return Moment(timeString, this.format);
    }
  }

  constructor(
    private localeService: LocaleService
  ) {
    this.masks = TextMasks;
  }

  ngOnInit() {}

  updateTime(): void {
    this.handleHours();
    this.handleMinutes();
    if (this.hour && this.minute && !this.invalidHour && !this.invalidMinute && !this.exceedsMax && !this.exceedsMin) {
      this.writeValue(this.currentTime.toDate());
    } else {
      this.writeValue(null, true);
    }
  }

  handleHours(): void {
    if (this.hour && this.hour.length < 2) {
      this.hour = '0' + this.hour;
    }
  }

  handleMinutes(): void {
    if (this.minute && this.minute.length < 2) {
      this.minute = '0' + this.minute;
    }
  }

  writeValue(time: Date, isInvalid?: boolean): void {
    let newTime: Moment.Moment;
    //Handles user inputting invalid selection
    if (isInvalid) {
      this.onChange(null);
      return;
    }

    newTime = time ? Moment(time) : this.returnDefaultTime();
    this.hour = newTime.format('hh');
    this.minute = newTime.format('mm');
    this.amPm = newTime.format('a');
    this.onChange(newTime.toDate());
  }

  registerOnChange(fn: (time: Moment.Moment) => void): void {
    this.onChange = fn.apply;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
    this.control.markAsTouched();
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  returnDefaultTime(): Moment.Moment {
    if (this.defaultTime) {
      return this.defaultTime;
    } else {
      return Moment(Date.now()).tz('America/New_York').locale(this.localeService.getCurrentLocale());
    }
  }
}
