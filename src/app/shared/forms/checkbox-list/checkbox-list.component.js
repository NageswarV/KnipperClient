import { __decorate, __metadata } from "tslib";
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
var CheckboxListComponent = /** @class */ (function () {
    function CheckboxListComponent(cd) {
        this.cd = cd;
        this.noLabel = false;
        this.controls = []; //Names of form controls for each checkbox, in order of appearance
        this.checkboxLabels = []; //Labels for each checkbox, in same order as controls input
        this.required = false;
        this.labelTranslated = true;
        this.disabled = false;
    }
    Object.defineProperty(CheckboxListComponent.prototype, "isInvalid", {
        get: function () {
            return this.anyDirty && this.noneSelected;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckboxListComponent.prototype, "anyDirty", {
        get: function () {
            var _this = this;
            var index = this.controls.findIndex(function (control) {
                return _this.formGroup.get(control).dirty;
            });
            return index > -1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CheckboxListComponent.prototype, "noneSelected", {
        get: function () {
            var _this = this;
            if (!this.required) {
                return false;
            }
            var trueTotal = 0;
            this.controls.forEach(function (control) {
                !!_this.formGroup.get(control).value ? trueTotal++ : null;
            });
            return !trueTotal ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    CheckboxListComponent.prototype.ngOnInit = function () {
        this.onCheckListChanges();
    };
    CheckboxListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.cd.detectChanges();
        // Workaround for expressionChangedAfterItHasBeenCheckedError
        setTimeout(function () {
            if (_this.required && _this.noneSelected) {
                _this.formGroup.get(_this.controls[0]).setValidators([Validators.requiredTrue]);
            }
            else {
                _this.formGroup.get(_this.controls[0]).clearValidators();
            }
            _this.formGroup.get(_this.controls[0]).updateValueAndValidity();
            _this.formGroup.get(_this.controls[0]).markAsPristine();
        }, 1);
    };
    CheckboxListComponent.prototype.onCheckListChanges = function () {
        var _this = this;
        this.controls.forEach(function (control) {
            _this.formGroup.get(control).valueChanges.subscribe(function (change) {
                if (_this.required && _this.noneSelected) {
                    _this.formGroup.get(_this.controls[0]).setValidators([Validators.requiredTrue]);
                }
                else {
                    _this.formGroup.get(_this.controls[0]).clearValidators();
                }
                _this.formGroup.get(_this.controls[0]).updateValueAndValidity({ emitEvent: false });
            });
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxListComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CheckboxListComponent.prototype, "noLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CheckboxListComponent.prototype, "controls", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CheckboxListComponent.prototype, "checkboxLabels", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CheckboxListComponent.prototype, "required", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], CheckboxListComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CheckboxListComponent.prototype, "description", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CheckboxListComponent.prototype, "labelTranslated", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CheckboxListComponent.prototype, "disabled", void 0);
    CheckboxListComponent = __decorate([
        Component({
            selector: 'samplicity-checkbox-list',
            templateUrl: './checkbox-list.component.html',
            styleUrls: ['./checkbox-list.component.scss']
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], CheckboxListComponent);
    return CheckboxListComponent;
}());
export { CheckboxListComponent };
//# sourceMappingURL=checkbox-list.component.js.map