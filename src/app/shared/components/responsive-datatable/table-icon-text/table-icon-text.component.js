import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
var ResponsiveDataTableIconTextComponent = /** @class */ (function () {
    function ResponsiveDataTableIconTextComponent() {
        this.center = true;
    }
    ResponsiveDataTableIconTextComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ResponsiveDataTableIconTextComponent.prototype, "showIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ResponsiveDataTableIconTextComponent.prototype, "icon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ResponsiveDataTableIconTextComponent.prototype, "iconClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ResponsiveDataTableIconTextComponent.prototype, "iconText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ResponsiveDataTableIconTextComponent.prototype, "iconTextExpanded", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ResponsiveDataTableIconTextComponent.prototype, "textClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDataTableIconTextComponent.prototype, "center", void 0);
    ResponsiveDataTableIconTextComponent = __decorate([
        Component({
            selector: 'samplicity-table-icon-text',
            templateUrl: './table-icon-text.component.html',
            styleUrls: ['./table-icon-text.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], ResponsiveDataTableIconTextComponent);
    return ResponsiveDataTableIconTextComponent;
}());
export { ResponsiveDataTableIconTextComponent };
//# sourceMappingURL=table-icon-text.component.js.map