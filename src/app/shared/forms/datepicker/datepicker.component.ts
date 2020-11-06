import { Component, Input, ChangeDetectorRef, OnInit, AfterContentInit,
  ViewChild, ElementRef, EventEmitter, Output, ChangeDetectionStrategy, ViewRef } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { LocaleService } from 'angular-l10n';
import { DateAdapter } from '@angular/material/core';
import { Language, TranslationService } from 'angular-l10n';
import * as moment from 'moment';

@Component({
  selector: 'samplicity-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent extends FieldBaseComponent implements OnInit, AfterContentInit {

  @ViewChild('textInput', {static:false}) textInput: ElementRef;
  @Input() min: Date;
  @Input() max: Date;
  @Input() filter: Function;
  @Input() dateBefore: DatepickerComponent;
  @Input() hasHyphen = true;
  @Input() defaultToCurrentDate: boolean;
  @Input() warning: string;
  @Input() forceRequiredLabel: boolean;
  @Input() hideRequiredLabel: boolean;
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Language() lang: string;
  @Input() isInvalid = false;
  @Input() labelTranslated = true;
  @Input() disabled = false;
  translatedPlaceholder: string;
  iePattern = new RegExp(/(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:)(\d+)/);
  controlHasBeenTouched = false;
  previousControlValue: any = null;
  private easternTimeZoneName = 'America/New_York';

  get warningMessage() {
    if (this.warning && this.control.dirty) {
      return this.warning;
    } else {
      return '';
    }
  }

  constructor(
    public cd: ChangeDetectorRef,
    public locale: LocaleService,
    private adapter: DateAdapter<any>,
    private translationService: TranslationService
  ) {
    super(cd);
  }

  ngOnInit() {
    moment.tz.setDefault(this.easternTimeZoneName);
    this.placeholder = 'Forms.DatepickerPlaceholder';
    this.translatedPlaceholder = this.translationService.translate(this.placeholder);
    this.translationService.translationChanged().subscribe(() => {
      this.translatedPlaceholder = this.translationService.translate(this.placeholder);
    });

    if (this.defaultToCurrentDate) {
      let now = moment(Date.now());
      now = moment.tz(this.easternTimeZoneName).locale(this.locale.getCurrentLocale());
      this.control.setValue(now.toDate());
    }

    // Workaround: IE11 incorrectly sets the formControl to dirty on focus if there is placeholder text
    if (navigator.userAgent.search(this.iePattern) > 0) {
      this.control.valueChanges.subscribe((change) => {
        this.handleDirtyStatus(change);
        this.handleControlReset();
      })
    }
  }

  ngAfterContentInit() {
    if (this.control) {
      this.control.setValue(this.adapter.deserialize(this.control.value));

      let handleDateBeforeUpdate = false;
      if (this.dateBefore) {
        this.dateBeforeUpdate();
        handleDateBeforeUpdate = true;
      }

      this.control.valueChanges.subscribe((value) => {
        const deserializedValue = this.adapter.deserialize(value);
        if (value !== deserializedValue) {
          this.control.setValue(deserializedValue);
        }
        if (handleDateBeforeUpdate) {
          this.dateBeforeUpdate();
        }
        this.change.emit(false);
      });
    }
  }

  dateBeforeUpdate() {
    if (this.control && this.dateBefore.control) {
      if (!this.control.value) {
        this.dateBefore.disable();
        this.dateBefore.control.reset();
      } else {
        this.dateBefore.enable();
        this.dateBefore.min = this.control.value;
        if (this.cd && !(this.cd as ViewRef).destroyed) {
          this.cd.detectChanges();
        }
        this.dateBefore.control.updateValueAndValidity();
        if (this.control.value && this.dateBefore.control.value) {
          const dateBeforeValue = this.dateBefore.control.value;
          if (typeof dateBeforeValue === 'string') {
            if (new Date(this.control.value) > new Date(this.dateBefore.control.value)) {
              this.dateBefore.control.setValue(null);
            }
          } else {
            if (this.control.value > this.dateBefore.control.value) {
              this.dateBefore.control.setValue(null);
            }
          }
        }
      }
    }
  }

  setLocale(): void {
    this.adapter.setLocale(this.locale.getCurrentLanguage());
  }

  handleDirtyStatus(change): void {
    if (!this.controlHasBeenTouched && change !== null) {
      this.previousControlValue = change;
    }
    if (change === null && this.previousControlValue !== null) {
      this.controlHasBeenTouched = true;
    } else if (this.control.pristine && change !== null
        && this.textInput
        && this.textInput.nativeElement &&
        (this.textInput.nativeElement.value !== '' || !this.controlHasBeenTouched
        && this.textInput.nativeElement.value === '')
        && change === null) {
      this.previousControlValue = change;
      this.control.markAsPristine();
    } else if (this.textInput && this.textInput.nativeElement
      && this.textInput.nativeElement.value !== '' || this.previousControlValue !== null) {
      this.controlHasBeenTouched = true;
    }
  }

  handleControlReset(): void {
    const reset = this.control.reset.bind(this.control);
    this.control.reset = (value?: any, options?: any) => {
      this.controlHasBeenTouched = false;
      this.previousControlValue = null;
      reset(value, options || {
        onlySelf: true,
        emitEvent: true
      });
    };
  }

}
