import { __decorate, __metadata } from "tslib";
import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import * as Moment from 'moment-timezone';
import { LocaleService, Language } from 'angular-l10n';
import { TextMasks } from '../../text-mask';
import { DatepickerComponent } from '../../datepicker/datepicker.component';
var TimepickerControlComponent = /** @class */ (function () {
    function TimepickerControlComponent(localeService) {
        this.localeService = localeService;
        this.labelTranslated = true;
        this.isInvalid = false;
        this.amPm = 'pm';
        this.format = 'hh:mm a';
        this.onChange = function (time) { };
        this.onTouched = function () { };
        this.masks = TextMasks;
    }
    TimepickerControlComponent_1 = TimepickerControlComponent;
    Object.defineProperty(TimepickerControlComponent.prototype, "invalidHour", {
        get: function () {
            var hourInt = parseInt(this.hour);
            return (hourInt < 1 || hourInt > 12) ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimepickerControlComponent.prototype, "invalidMinute", {
        get: function () {
            var minInt = parseInt(this.minute);
            return (minInt < 0 || minInt > 59) ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimepickerControlComponent.prototype, "exceedsMin", {
        get: function () {
            if (!this.minTime || !this.currentTime) {
                return false;
            }
            var selectedTime = Moment(this.currentTime.format(this.format), this.format);
            var startTime = Moment(this.minTime.format(this.format), this.format);
            return selectedTime.isBefore(startTime) || (selectedTime === startTime);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimepickerControlComponent.prototype, "exceedsMax", {
        get: function () {
            if (!this.maxTime || !this.currentTime) {
                return false;
            }
            var selectedTime = Moment(this.currentTime.format(this.format), this.format);
            var endTime = Moment(this.maxTime.format(this.format), this.format);
            return selectedTime.isAfter(endTime) || (selectedTime === endTime);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimepickerControlComponent.prototype, "currentTime", {
        get: function () {
            if (this.hour && this.minute && !this.invalidHour && !this.invalidMinute) {
                var timeString = this.hour + ':' + this.minute + ' ' + this.amPm;
                return Moment(timeString, this.format);
            }
        },
        enumerable: false,
        configurable: true
    });
    TimepickerControlComponent.prototype.ngOnInit = function () { };
    TimepickerControlComponent.prototype.updateTime = function () {
        this.handleHours();
        this.handleMinutes();
        if (this.hour && this.minute && !this.invalidHour && !this.invalidMinute && !this.exceedsMax && !this.exceedsMin) {
            this.writeValue(this.currentTime.toDate());
        }
        else {
            this.writeValue(null, true);
        }
    };
    TimepickerControlComponent.prototype.handleHours = function () {
        if (this.hour && this.hour.length < 2) {
            this.hour = '0' + this.hour;
        }
    };
    TimepickerControlComponent.prototype.handleMinutes = function () {
        if (this.minute && this.minute.length < 2) {
            this.minute = '0' + this.minute;
        }
    };
    TimepickerControlComponent.prototype.writeValue = function (time, isInvalid) {
        var newTime;
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
    };
    TimepickerControlComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn.apply;
    };
    TimepickerControlComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
        this.control.markAsTouched();
    };
    TimepickerControlComponent.prototype.setDisabledState = function (isDisabled) {
        isDisabled ? this.control.disable() : this.control.enable();
    };
    TimepickerControlComponent.prototype.returnDefaultTime = function () {
        if (this.defaultTime) {
            return this.defaultTime;
        }
        else {
            return Moment(Date.now()).tz('America/New_York').locale(this.localeService.getCurrentLocale());
        }
    };
    var TimepickerControlComponent_1;
    __decorate([
        Input(),
        __metadata("design:type", FormControl)
    ], TimepickerControlComponent.prototype, "control", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TimepickerControlComponent.prototype, "textMask", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TimepickerControlComponent.prototype, "defaultTime", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TimepickerControlComponent.prototype, "minTime", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TimepickerControlComponent.prototype, "maxTime", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TimepickerControlComponent.prototype, "isDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", DatepickerComponent)
    ], TimepickerControlComponent.prototype, "linkedDatepicker", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TimepickerControlComponent.prototype, "labelTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TimepickerControlComponent.prototype, "isInvalid", void 0);
    __decorate([
        ViewChild('hourInput', { static: false }),
        __metadata("design:type", HTMLInputElement)
    ], TimepickerControlComponent.prototype, "hourInput", void 0);
    __decorate([
        ViewChild('minuteInput', { static: false }),
        __metadata("design:type", HTMLInputElement)
    ], TimepickerControlComponent.prototype, "minuteInput", void 0);
    __decorate([
        Language(),
        __metadata("design:type", String)
    ], TimepickerControlComponent.prototype, "lang", void 0);
    TimepickerControlComponent = TimepickerControlComponent_1 = __decorate([
        Component({
            selector: 'samplicity-timepicker-control',
            templateUrl: './timepicker-control.component.html',
            styleUrls: ['./timepicker-control.component.scss'],
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return TimepickerControlComponent_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [LocaleService])
    ], TimepickerControlComponent);
    return TimepickerControlComponent;
}());
export { TimepickerControlComponent };
//# sourceMappingURL=timepicker-control.component.js.map