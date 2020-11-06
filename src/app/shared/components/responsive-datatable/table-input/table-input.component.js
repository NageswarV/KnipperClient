import { __decorate, __metadata } from "tslib";
import { Component, ChangeDetectorRef, Input } from '@angular/core';
var ResponsiveDataTableInputComponent = /** @class */ (function () {
    function ResponsiveDataTableInputComponent(cd) {
        this.cd = cd;
    }
    ResponsiveDataTableInputComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ResponsiveDataTableInputComponent.prototype, "readonly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ResponsiveDataTableInputComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDataTableInputComponent.prototype, "model", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ResponsiveDataTableInputComponent.prototype, "modelProp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ResponsiveDataTableInputComponent.prototype, "textMask", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ResponsiveDataTableInputComponent.prototype, "addonTextLeft", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ResponsiveDataTableInputComponent.prototype, "addonTextRight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ResponsiveDataTableInputComponent.prototype, "required", void 0);
    ResponsiveDataTableInputComponent = __decorate([
        Component({
            selector: 'samplicity-table-input',
            templateUrl: './table-input.component.html',
            styleUrls: ['./table-input.component.scss']
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], ResponsiveDataTableInputComponent);
    return ResponsiveDataTableInputComponent;
}());
export { ResponsiveDataTableInputComponent };
//# sourceMappingURL=table-input.component.js.map