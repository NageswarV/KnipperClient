import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter, TemplateRef, ContentChild } from '@angular/core';
var GridComponent = /** @class */ (function () {
    function GridComponent() {
        this.emitSort = new EventEmitter();
        this.emitPageChange = new EventEmitter();
        this.emitpageSizeChange = new EventEmitter();
        this.headerColumnEvent = new EventEmitter();
        this.componentId = performance.now().toString();
    }
    GridComponent.prototype.sort = function (sortQry) {
        this.sortedColumn = sortQry.split(' ')[0];
        this.emitSort.emit(sortQry);
    };
    GridComponent.prototype.paginate = function (pageNumber) {
        this.emitPageChange.emit(pageNumber);
    };
    GridComponent.prototype.pageSizeChange = function (pageSize) {
        this.pageSize = pageSize;
        this.emitpageSizeChange.emit(pageSize);
    };
    GridComponent.prototype.onChange = function (column, $event) {
        column.isChecked = !column.isChecked;
        this.headerColumnEvent.emit(column.isChecked);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], GridComponent.prototype, "columns", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], GridComponent.prototype, "emptyText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], GridComponent.prototype, "items", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], GridComponent.prototype, "totalRecordCount", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], GridComponent.prototype, "pageSize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], GridComponent.prototype, "currentPage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], GridComponent.prototype, "disablePaginationFloating", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], GridComponent.prototype, "disableScrollOnPage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], GridComponent.prototype, "pageSizeOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], GridComponent.prototype, "fromReport", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], GridComponent.prototype, "totalPages", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], GridComponent.prototype, "pages", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], GridComponent.prototype, "emitSort", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], GridComponent.prototype, "emitPageChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], GridComponent.prototype, "emitpageSizeChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], GridComponent.prototype, "headerColumnEvent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], GridComponent.prototype, "loadMorePagination", void 0);
    __decorate([
        ContentChild(TemplateRef, { static: false }),
        __metadata("design:type", TemplateRef)
    ], GridComponent.prototype, "itemTemplate", void 0);
    GridComponent = __decorate([
        Component({
            selector: 'sg-grid',
            templateUrl: './grid.component.html',
            styleUrls: ['./grid.component.scss'],
        }),
        __metadata("design:paramtypes", [])
    ], GridComponent);
    return GridComponent;
}());
export { GridComponent };
//# sourceMappingURL=grid.component.js.map