import { __decorate, __metadata } from "tslib";
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SectionValidation } from '../../../../shared/service-clients/om-order';
import { ValidationState } from '../../../../common/enum-type';
var SideMenuHeaderComponent = /** @class */ (function () {
    function SideMenuHeaderComponent() {
        this.selected = false;
        this.goto = new EventEmitter();
    }
    Object.defineProperty(SideMenuHeaderComponent.prototype, "valid", {
        get: function () {
            if (this.validation) {
                return this.validation.state === ValidationState.Valid;
            }
            else {
                return false;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SideMenuHeaderComponent.prototype, "error", {
        get: function () {
            if (this.validation) {
                return this.validation.state === ValidationState.Error;
            }
            else {
                return false;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SideMenuHeaderComponent.prototype, "warning", {
        get: function () {
            if (this.validation) {
                return this.validation.state === ValidationState.Warning;
            }
            else {
                return false;
            }
        },
        enumerable: false,
        configurable: true
    });
    SideMenuHeaderComponent.prototype.ngOnInit = function () {
    };
    SideMenuHeaderComponent.prototype.onClick = function () {
        if (this.validation) {
            this.goto.emit(this.validation.name);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", SectionValidation)
    ], SideMenuHeaderComponent.prototype, "validation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SideMenuHeaderComponent.prototype, "header", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SideMenuHeaderComponent.prototype, "selected", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SideMenuHeaderComponent.prototype, "goto", void 0);
    SideMenuHeaderComponent = __decorate([
        Component({
            selector: 'samplicity-side-menu-header',
            templateUrl: './side-menu-header.component.html',
            styleUrls: ['./side-menu-header.component.scss'],
        }),
        __metadata("design:paramtypes", [])
    ], SideMenuHeaderComponent);
    return SideMenuHeaderComponent;
}());
export { SideMenuHeaderComponent };
//# sourceMappingURL=side-menu-header.component.js.map