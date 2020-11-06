import { __decorate, __metadata } from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
var ViewActivityComponent = /** @class */ (function () {
    function ViewActivityComponent() {
        this.searchName = new EventEmitter();
    }
    ViewActivityComponent.prototype.ngOnInit = function () {
    };
    ViewActivityComponent.prototype.goToSearchPage = function (searchBy) {
        this.searchName.emit(searchBy);
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ViewActivityComponent.prototype, "searchName", void 0);
    ViewActivityComponent = __decorate([
        Component({
            selector: 'sg-view-activity',
            templateUrl: './view-activity.component.html',
            styleUrls: ['./view-activity.component.scss', '../home.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], ViewActivityComponent);
    return ViewActivityComponent;
}());
export { ViewActivityComponent };
//# sourceMappingURL=view-activity.component.js.map