import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TableColumn } from '../table.model';
import { Language } from 'angular-l10n';
var ResponsiveDataTableHeaderComponent = /** @class */ (function () {
    function ResponsiveDataTableHeaderComponent() {
        this.readonly = false;
        this.sortEvent = new EventEmitter();
        this.selectAllEvent = new EventEmitter();
        this.collapseEvent = new EventEmitter();
    }
    ResponsiveDataTableHeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.processCollapsed();
        this.windowResize$ = Observable.fromEvent(window, 'resize');
        this.windowResizeSub = this.windowResize$.subscribe(function () {
            _this.processCollapsed();
        });
    };
    ResponsiveDataTableHeaderComponent.prototype.ngAfterViewInit = function () {
    };
    ResponsiveDataTableHeaderComponent.prototype.onSort = function (header) {
        if (this.disableSorting || header.sortEnabled === false) {
            return;
        }
        this.resetSorts(header);
        if (header.sortDir === 'asc') {
            header.sortDir = 'desc';
        }
        else {
            header.sortDir = 'asc';
        }
        var sort = { sortName: header.name, sortDir: header.sortDir };
        this.sortEvent.emit(sort);
    };
    ResponsiveDataTableHeaderComponent.prototype.resetSorts = function (column) {
        var index = this.columns.indexOf(column);
        if (this.selectColumn && column.name != this.selectColumn.name) {
            this.selectColumn.sortDir = undefined;
        }
        this.columns.forEach(function (col, i) {
            if (i !== index) {
                col.sortDir = undefined;
            }
        });
    };
    ResponsiveDataTableHeaderComponent.prototype.onSelectAll = function (event) {
        this.selectAllEvent.emit(event);
    };
    ResponsiveDataTableHeaderComponent.prototype.getColSpan = function (first) {
        return this.isCollapsed && first ? 2 : 1;
    };
    ResponsiveDataTableHeaderComponent.prototype.processCollapsed = function () {
        var screenWidth = window.innerWidth;
        var xxl4 = 2064;
        var xxl3 = 1864;
        var xxl2 = 1824;
        var xxl1 = 1784;
        var xxl = 1744;
        var xl3 = 1704;
        var xl2 = 1664;
        var xl1 = 1624;
        var xl = 1584;
        var lg3 = 1544;
        var lg2 = 1504;
        var lg1 = 1464;
        var lg = 1424;
        var md3 = 1384;
        var md2 = 1344;
        var md1 = 1304;
        var md = 1264;
        var sm1 = 1224;
        var sm = 1184;
        var xs1 = 1144;
        if (screenWidth >= xxl4) {
            this.checkCollapse(['collapsed']);
        }
        else if (screenWidth < xxl4 && screenWidth >= xxl3) {
            this.checkCollapse(['collapsed', 'xxl4']);
        }
        else if (screenWidth < xxl3 && screenWidth >= xxl2) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3']);
        }
        else if (screenWidth < xxl2 && screenWidth >= xxl1) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2']);
        }
        else if (screenWidth < xxl1 && screenWidth >= xxl) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1']);
        }
        else if (screenWidth < xxl && screenWidth >= xl3) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl']);
        }
        else if (screenWidth < xl3 && screenWidth >= xl2) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3']);
        }
        else if (screenWidth < xl2 && screenWidth >= xl1) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2']);
        }
        else if (screenWidth < xl && screenWidth >= xl) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1']);
        }
        else if (screenWidth < xl && screenWidth >= lg3) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl']);
        }
        else if (screenWidth < lg3 && screenWidth >= lg2) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3']);
        }
        else if (screenWidth < lg2 && screenWidth >= lg1) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2']);
        }
        else if (screenWidth < lg1 && screenWidth >= lg) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2', 'lg1']);
        }
        else if (screenWidth < lg && screenWidth >= md3) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2', 'lg1', 'lg']);
        }
        else if (screenWidth < md3 && screenWidth >= md2) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2', 'lg1', 'lg', 'md3']);
        }
        else if (screenWidth < md2 && screenWidth >= md1) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2', 'lg1', 'lg', 'md3', 'md2']);
        }
        else if (screenWidth < md1 && screenWidth >= md) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2', 'lg1', 'lg', 'md3', 'md2', 'md1']);
        }
        else if (screenWidth < md && screenWidth >= sm1) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2', 'lg1', 'lg', 'md3', 'md2', 'md1', 'md']);
        }
        else if (screenWidth < sm1 && screenWidth >= sm) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2', 'lg1', 'lg', 'md3', 'md2', 'md1', 'md', 'sm1']);
        }
        else if (screenWidth < sm && screenWidth >= xs1) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2', 'lg1', 'lg', 'md3', 'md2', 'md1', 'md', 'sm1', 'sm']);
        }
        else if (screenWidth < xs1) {
            this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2', 'lg1', 'lg', 'md3', 'md2', 'md1', 'md', 'sm1', 'sm', 'xs1']);
        }
    };
    ResponsiveDataTableHeaderComponent.prototype.checkCollapse = function (sizeArray) {
        var sizes = [];
        var output = false;
        this.columns.forEach(function (header) { return sizes.push(header.visibility); });
        sizeArray.forEach(function (size) {
            if (sizes.indexOf(size) >= 0) {
                output = true;
            }
        });
        this.setCollapseState(output);
    };
    ResponsiveDataTableHeaderComponent.prototype.setCollapseState = function (newState) {
        this.isCollapsed = newState;
        this.collapseEvent.emit(newState);
    };
    __decorate([
        Language(),
        __metadata("design:type", Object)
    ], ResponsiveDataTableHeaderComponent.prototype, "lang", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TableColumn)
    ], ResponsiveDataTableHeaderComponent.prototype, "selectColumn", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ResponsiveDataTableHeaderComponent.prototype, "columns", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ResponsiveDataTableHeaderComponent.prototype, "selectColumnText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ResponsiveDataTableHeaderComponent.prototype, "selectEnabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ResponsiveDataTableHeaderComponent.prototype, "selectAllEnabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ResponsiveDataTableHeaderComponent.prototype, "disableSorting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ResponsiveDataTableHeaderComponent.prototype, "disableSelectSorting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDataTableHeaderComponent.prototype, "translateParams", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDataTableHeaderComponent.prototype, "readonly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ResponsiveDataTableHeaderComponent.prototype, "hideColumn", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ResponsiveDataTableHeaderComponent.prototype, "sortEvent", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ResponsiveDataTableHeaderComponent.prototype, "selectAllEvent", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ResponsiveDataTableHeaderComponent.prototype, "collapseEvent", void 0);
    ResponsiveDataTableHeaderComponent = __decorate([
        Component({
            selector: '[samplicity-table-header]',
            templateUrl: './table-header.component.html',
            styleUrls: ['./table-header.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], ResponsiveDataTableHeaderComponent);
    return ResponsiveDataTableHeaderComponent;
}());
export { ResponsiveDataTableHeaderComponent };
//# sourceMappingURL=table-header.component.js.map