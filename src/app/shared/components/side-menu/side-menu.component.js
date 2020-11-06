import { __decorate, __metadata } from "tslib";
import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ValidationState } from '../../../common/enum-type';
var SideMenuComponent = /** @class */ (function () {
    function SideMenuComponent() {
        this.sidebarTitle = 'Filter';
        this.toggle = new EventEmitter();
    }
    Object.defineProperty(SideMenuComponent.prototype, "error", {
        get: function () {
            return this.state === ValidationState.Error;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SideMenuComponent.prototype, "warning", {
        get: function () {
            return this.state === ValidationState.Warning;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SideMenuComponent.prototype, "valid", {
        get: function () {
            return this.state === ValidationState.Valid;
        },
        enumerable: false,
        configurable: true
    });
    SideMenuComponent.prototype.ngOnInit = function () {
    };
    SideMenuComponent.prototype.toggleMenu = function (state) {
        this.toggle.emit(state);
    };
    __decorate([
        ViewChild('sidenav', { static: false }),
        __metadata("design:type", MatSidenav)
    ], SideMenuComponent.prototype, "sideNav", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SideMenuComponent.prototype, "sidebarTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SideMenuComponent.prototype, "state", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SideMenuComponent.prototype, "toggle", void 0);
    SideMenuComponent = __decorate([
        Component({
            selector: 'samplicity-side-menu',
            templateUrl: './side-menu.component.html',
            styleUrls: ['./side-menu.component.scss'],
        }),
        __metadata("design:paramtypes", [])
    ], SideMenuComponent);
    return SideMenuComponent;
}());
export { SideMenuComponent };
//# sourceMappingURL=side-menu.component.js.map