import { __decorate, __extends, __metadata } from "tslib";
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { Language, LocaleService } from 'angular-l10n';
import * as Moment from 'moment';
import { Subscription } from 'rxjs/Subscription';
var TimepickerComponent = /** @class */ (function (_super) {
    __extends(TimepickerComponent, _super);
    function TimepickerComponent(cd, localeService) {
        var _this = _super.call(this, cd) || this;
        _this.localeService = localeService;
        _this.labelTranslated = true;
        _this.isInvalid = false;
        _this.maskSub = new Subscription();
        _this.iePattern = new RegExp(/(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:)(\d+)/);
        _this.controlHasBeenTouched = false;
        _this.previousControlValue = null;
        return _this;
    }
    Object.defineProperty(TimepickerComponent.prototype, "isDisabled", {
        get: function () {
            return this.control.disabled;
        },
        enumerable: false,
        configurable: true
    });
    TimepickerComponent.prototype.ngOnInit = function () { };
    __decorate([
        Input(),
        __metadata("design:type", DatepickerComponent)
    ], TimepickerComponent.prototype, "linkedDatepicker", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Date)
    ], TimepickerComponent.prototype, "time", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TimepickerComponent.prototype, "textMask", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TimepickerComponent.prototype, "defaultTime", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TimepickerComponent.prototype, "minTime", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TimepickerComponent.prototype, "maxTime", void 0);
    __decorate([
        Language(),
        __metadata("design:type", String)
    ], TimepickerComponent.prototype, "lang", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TimepickerComponent.prototype, "labelTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TimepickerComponent.prototype, "isInvalid", void 0);
    TimepickerComponent = __decorate([
        Component({
            selector: 'samplicity-timepicker',
            templateUrl: './timepicker.component.html',
            styleUrls: ['./timepicker.component.scss']
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            LocaleService])
    ], TimepickerComponent);
    return TimepickerComponent;
}(FieldBaseComponent));
export { TimepickerComponent };
//# sourceMappingURL=timepicker.component.js.map