import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { Language } from 'angular-l10n';
var SideFilterSectionComponent = /** @class */ (function () {
    function SideFilterSectionComponent() {
        this.expanded = true;
        this.height = '24px';
    }
    Object.defineProperty(SideFilterSectionComponent.prototype, "headerIsDto", {
        get: function () {
            return Array.isArray(this.header) && this.header[0] instanceof Object;
        },
        enumerable: false,
        configurable: true
    });
    SideFilterSectionComponent.prototype.ngOnInit = function () {
        if (this.isCard) {
            this.headerClass = 'card-section-header';
        }
    };
    __decorate([
        Language(),
        __metadata("design:type", String)
    ], SideFilterSectionComponent.prototype, "lang", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SideFilterSectionComponent.prototype, "header", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SideFilterSectionComponent.prototype, "headerParameters", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SideFilterSectionComponent.prototype, "isCard", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SideFilterSectionComponent.prototype, "expanded", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SideFilterSectionComponent.prototype, "height", void 0);
    SideFilterSectionComponent = __decorate([
        Component({
            selector: 'samplicity-side-filter-section',
            templateUrl: './side-filter-section.component.html',
            styleUrls: ['./side-filter-section.component.scss']
        })
    ], SideFilterSectionComponent);
    return SideFilterSectionComponent;
}());
export { SideFilterSectionComponent };
//# sourceMappingURL=side-filter-section.component.js.map