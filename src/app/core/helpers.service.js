import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
var HelpersService = /** @class */ (function () {
    function HelpersService() {
    }
    HelpersService.prototype.newGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    HelpersService.prototype.emptyGuid = function () {
        return '00000000-0000-0000-0000-000000000000';
    };
    // Get nested object by path
    HelpersService.prototype.resolveObject = function (path, obj) {
        return path.split('.').reduce(function (prev, curr) {
            return prev ? prev[curr] : undefined;
        }, obj || self);
    };
    HelpersService.prototype.deepCopy = function (source) {
        return JSON.parse(JSON.stringify(source, function (k, v) { return v === undefined ? null : v; }));
    };
    // Clones a reactive form group
    HelpersService.prototype.copyFormControl = function (control) {
        var _this = this;
        if (control instanceof FormControl) {
            return new FormControl(control.value);
        }
        else if (control instanceof FormGroup) {
            var copy_1 = new FormGroup({});
            Object.keys(control.getRawValue()).forEach(function (key) {
                copy_1.addControl(key, _this.copyFormControl(control.controls[key]));
            });
            return copy_1;
        }
        else if (control instanceof FormArray) {
            var copy_2 = new FormArray([]);
            control.controls.forEach(function (control) {
                copy_2.push(_this.copyFormControl(control));
            });
            return copy_2;
        }
    };
    HelpersService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], HelpersService);
    return HelpersService;
}());
export { HelpersService };
//# sourceMappingURL=helpers.service.js.map