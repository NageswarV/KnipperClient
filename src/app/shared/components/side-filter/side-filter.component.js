import { __decorate, __metadata } from "tslib";
import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
var SideFilterComponent = /** @class */ (function () {
    function SideFilterComponent() {
        this.isFilter = true;
        this.sidebarTitle = 'Filter';
        this.filter = new EventEmitter();
        this.clear = new EventEmitter();
        this.toggle = new EventEmitter();
    }
    SideFilterComponent.prototype.ngOnInit = function () {
    };
    SideFilterComponent.prototype.ngAfterViewInit = function () {
        this.toggle.emit(this.sideNav.opened);
    };
    SideFilterComponent.prototype.toggleFilter = function () {
        this.toggle.emit(this.sideNav.opened);
    };
    // Removed need to handle on mousewheel scroll since #8384
    SideFilterComponent.prototype.onMousewheel = function (event) {
        // Prevent scrolling of the page by mouse wheeling of the sidebar 
        var el = event.currentTarget;
        if ((el.scrollTop + el.offsetHeight >= el.scrollHeight && event.deltaY > 0)
            || (el.scrollTop === 0 && event.deltaY < 0)) {
            event = event || window.event;
            if (event.preventDefault) {
                event.preventDefault();
            }
            event.returnValue = false;
        }
    };
    __decorate([
        ViewChild('sidenav', { static: false }),
        __metadata("design:type", MatSidenav)
    ], SideFilterComponent.prototype, "sideNav", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SideFilterComponent.prototype, "isFilter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SideFilterComponent.prototype, "sidebarTitle", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SideFilterComponent.prototype, "filter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SideFilterComponent.prototype, "clear", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SideFilterComponent.prototype, "toggle", void 0);
    SideFilterComponent = __decorate([
        Component({
            selector: 'samplicity-side-filter',
            templateUrl: './side-filter.component.html',
            styleUrls: ['./side-filter.component.scss'],
        }),
        __metadata("design:paramtypes", [])
    ], SideFilterComponent);
    return SideFilterComponent;
}());
export { SideFilterComponent };
//# sourceMappingURL=side-filter.component.js.map