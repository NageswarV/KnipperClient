import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, ContentChild, TemplateRef, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
var ExpandableTableRowComponent = /** @class */ (function () {
    function ExpandableTableRowComponent() {
        this.sortEvent = new EventEmitter();
    }
    ExpandableTableRowComponent.prototype.ngOnInit = function () {
    };
    ExpandableTableRowComponent.prototype.trackColumn = function (index, item) {
        return item['name'];
    };
    ExpandableTableRowComponent.prototype.onInfoRowSort = function (column) {
        this.sortEvent.emit(column);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ExpandableTableRowComponent.prototype, "item", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ExpandableTableRowComponent.prototype, "columns", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ExpandableTableRowComponent.prototype, "colspan", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ExpandableTableRowComponent.prototype, "sortEvent", void 0);
    __decorate([
        ContentChild(TemplateRef, { static: false }),
        __metadata("design:type", TemplateRef)
    ], ExpandableTableRowComponent.prototype, "cellTemplate", void 0);
    ExpandableTableRowComponent = __decorate([
        Component({
            selector: '[samplicity-expandable-table-row]',
            templateUrl: './expandable-table-row.component.html',
            styleUrls: ['./expandable-table-row.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [])
    ], ExpandableTableRowComponent);
    return ExpandableTableRowComponent;
}());
export { ExpandableTableRowComponent };
//# sourceMappingURL=expandable-table-row.component.js.map