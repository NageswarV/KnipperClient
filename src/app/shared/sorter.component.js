import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
var SorterComponent = /** @class */ (function () {
    function SorterComponent() {
        this.emitSort = new EventEmitter();
        this.sortClass = 'sorting';
    }
    SorterComponent.prototype.ngOnChanges = function () {
        if (this.columnName !== this.isActive) {
            this.sortClass = 'sorting';
        }
    };
    SorterComponent.prototype.sort = function () {
        if (this.isAscending) {
            this.isAscending = false;
            this.sortClass = 'sorting_desc';
            this.emitSort.emit(this.columnName + ' DESC');
        }
        else {
            this.isAscending = true;
            this.sortClass = 'sorting_asc';
            this.emitSort.emit(this.columnName);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SorterComponent.prototype, "columnName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SorterComponent.prototype, "isActive", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SorterComponent.prototype, "emitSort", void 0);
    SorterComponent = __decorate([
        Component({
            selector: 'sg-sorter',
            changeDetection: ChangeDetectionStrategy.OnPush,
            templateUrl: './sorter.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], SorterComponent);
    return SorterComponent;
}());
export { SorterComponent };
//# sourceMappingURL=sorter.component.js.map