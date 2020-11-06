import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
var SideMenuSectionComponent = /** @class */ (function () {
    function SideMenuSectionComponent() {
        this.expanded = true;
    }
    SideMenuSectionComponent.prototype.ngOnInit = function () {
    };
    SideMenuSectionComponent.prototype.ngAfterViewInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SideMenuSectionComponent.prototype, "header", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SideMenuSectionComponent.prototype, "expanded", void 0);
    SideMenuSectionComponent = __decorate([
        Component({
            selector: 'samplicity-side-menu-section',
            templateUrl: './side-menu-section.component.html',
            styleUrls: ['./side-menu-section.component.scss'],
        })
    ], SideMenuSectionComponent);
    return SideMenuSectionComponent;
}());
export { SideMenuSectionComponent };
//# sourceMappingURL=side-menu-section.component.js.map