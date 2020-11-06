import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input, ChangeDetectorRef, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { LocaleService } from 'angular-l10n';
import { DateAdapter } from '@angular/material/core';
import { Language, TranslationService } from 'angular-l10n';
import * as moment from 'moment';
var DatepickerComponent = /** @class */ (function (_super) {
    __extends(DatepickerComponent, _super);
    function DatepickerComponent(cd, locale, adapter, translationService) {
        var _this = _super.call(this, cd) || this;
        _this.cd = cd;
        _this.locale = locale;
        _this.adapter = adapter;
        _this.translationService = translationService;
        _this.hasHyphen = true;
        _this.change = new EventEmitter();
        _this.isInvalid = false;
        _this.labelTranslated = true;
        _this.disabled = false;
        _this.iePattern = new RegExp(/(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:)(\d+)/);
        _this.controlHasBeenTouched = false;
        _this.previousControlValue = null;
        _this.easternTimeZoneName = 'America/New_York';
        return _this;
    }
    Object.defineProperty(DatepickerComponent.prototype, "warningMessage", {
        get: function () {
            if (this.warning && this.control.dirty) {
                return this.warning;
            }
            else {
                return '';
            }
        },
        enumerable: false,
        configurable: true
    });
    DatepickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        moment.tz.setDefault(this.easternTimeZoneName);
        this.placeholder = 'Forms.DatepickerPlaceholder';
        this.translatedPlaceholder = this.translationService.translate(this.placeholder);
        this.translationService.translationChanged().subscribe(function () {
            _this.translatedPlaceholder = _this.translationService.translate(_this.placeholder);
        });
        if (this.defaultToCurrentDate) {
            var now = moment(Date.now());
            now = moment.tz(this.easternTimeZoneName).locale(this.locale.getCurrentLocale());
            this.control.setValue(now.toDate());
        }
        // Workaround: IE11 incorrectly sets the formControl to dirty on focus if there is placeholder text
        if (navigator.userAgent.search(this.iePattern) > 0) {
            this.control.valueChanges.subscribe(function (change) {
                _this.handleDirtyStatus(change);
                _this.handleControlReset();
            });
        }
    };
    DatepickerComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.control) {
            this.control.setValue(this.adapter.deserialize(this.control.value));
            var handleDateBeforeUpdate_1 = false;
            if (this.dateBefore) {
                this.dateBeforeUpdate();
                handleDateBeforeUpdate_1 = true;
            }
            this.control.valueChanges.subscribe(function (value) {
                var deserializedValue = _this.adapter.deserialize(value);
                if (value !== deserializedValue) {
                    _this.control.setValue(deserializedValue);
                }
                if (handleDateBeforeUpdate_1) {
                    _this.dateBeforeUpdate();
                }
                _this.change.emit(false);
            });
        }
    };
    DatepickerComponent.prototype.dateBeforeUpdate = function () {
        if (this.control && this.dateBefore.control) {
            if (!this.control.value) {
                this.dateBefore.disable();
                this.dateBefore.control.reset();
            }
            else {
                this.dateBefore.enable();
                this.dateBefore.min = this.control.value;
                if (this.cd && !this.cd.destroyed) {
                    this.cd.detectChanges();
                }
                this.dateBefore.control.updateValueAndValidity();
                if (this.control.value && this.dateBefore.control.value) {
                    var dateBeforeValue = this.dateBefore.control.value;
                    if (typeof dateBeforeValue === 'string') {
                        if (new Date(this.control.value) > new Date(this.dateBefore.control.value)) {
                            this.dateBefore.control.setValue(null);
                        }
                    }
                    else {
                        if (this.control.value > this.dateBefore.control.value) {
                            this.dateBefore.control.setValue(null);
                        }
                    }
                }
            }
        }
    };
    DatepickerComponent.prototype.setLocale = function () {
        this.adapter.setLocale(this.locale.getCurrentLanguage());
    };
    DatepickerComponent.prototype.handleDirtyStatus = function (change) {
        if (!this.controlHasBeenTouched && change !== null) {
            this.previousControlValue = change;
        }
        if (change === null && this.previousControlValue !== null) {
            this.controlHasBeenTouched = true;
        }
        else if (this.control.pristine && change !== null
            && this.textInput
            && this.textInput.nativeElement &&
            (this.textInput.nativeElement.value !== '' || !this.controlHasBeenTouched
                && this.textInput.nativeElement.value === '')
            && change === null) {
            this.previousControlValue = change;
            this.control.markAsPristine();
        }
        else if (this.textInput && this.textInput.nativeElement
            && this.textInput.nativeElement.value !== '' || this.previousControlValue !== null) {
            this.controlHasBeenTouched = true;
        }
    };
    DatepickerComponent.prototype.handleControlReset = function () {
        var _this = this;
        var reset = this.control.reset.bind(this.control);
        this.control.reset = function (value, options) {
            _this.controlHasBeenTouched = false;
            _this.previousControlValue = null;
            reset(value, options || {
                onlySelf: true,
                emitEvent: true
            });
        };
    };
    __decorate([
        ViewChild('textInput', { static: false }),
        __metadata("design:type", ElementRef)
    ], DatepickerComponent.prototype, "textInput", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Date)
    ], DatepickerComponent.prototype, "min", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Date)
    ], DatepickerComponent.prototype, "max", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], DatepickerComponent.prototype, "filter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", DatepickerComponent)
    ], DatepickerComponent.prototype, "dateBefore", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DatepickerComponent.prototype, "hasHyphen", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DatepickerComponent.prototype, "defaultToCurrentDate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DatepickerComponent.prototype, "warning", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DatepickerComponent.prototype, "forceRequiredLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DatepickerComponent.prototype, "hideRequiredLabel", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DatepickerComponent.prototype, "change", void 0);
    __decorate([
        Language(),
        __metadata("design:type", String)
    ], DatepickerComponent.prototype, "lang", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DatepickerComponent.prototype, "isInvalid", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DatepickerComponent.prototype, "labelTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DatepickerComponent.prototype, "disabled", void 0);
    DatepickerComponent = __decorate([
        Component({
            selector: 'samplicity-datepicker',
            templateUrl: './datepicker.component.html',
            styleUrls: ['./datepicker.component.scss']
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            LocaleService,
            DateAdapter,
            TranslationService])
    ], DatepickerComponent);
    return DatepickerComponent;
}(FieldBaseComponent));
export { DatepickerComponent };
//# sourceMappingURL=datepicker.component.js.map