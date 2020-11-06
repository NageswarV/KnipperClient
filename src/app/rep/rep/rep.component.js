import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
var RepComponent = /** @class */ (function () {
    function RepComponent() {
        this.byRepOrders = true;
    }
    RepComponent.prototype.ngOnInit = function () {
        this.isCollapsed = false;
    };
    RepComponent.prototype.viewByHomeOffce = function () {
        if (this.byRepOrders) {
            this.byRepOrders = !this.byRepOrders;
        }
    };
    RepComponent.prototype.viewBySalesRep = function () {
        if (!this.byRepOrders) {
            this.byRepOrders = !this.byRepOrders;
        }
    };
    RepComponent.prototype.onCollapse = function () {
        this.isCollapsed = !this.isCollapsed;
    };
    RepComponent.prototype.onSubmit = function (event) {
        this.filterObj = event;
    };
    RepComponent = __decorate([
        Component({
            selector: 'app-rep',
            templateUrl: './rep.component.html',
            styleUrls: ['./rep.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], RepComponent);
    return RepComponent;
}());
export { RepComponent };
//# sourceMappingURL=rep.component.js.map