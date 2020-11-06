import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, ViewChild, ContentChild, TemplateRef, ElementRef, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { TableColumn, OnStringCompare, OnDateCompare } from './table.model';
import { Language, TranslationService } from 'angular-l10n';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';
import { FormGroup } from '@angular/forms';
var ResponsiveDatatableComponent = /** @class */ (function () {
    function ResponsiveDatatableComponent(translationService, cd) {
        this.translationService = translationService;
        this.cd = cd;
        this.noDefaultSort = false;
        this.staticItems = [];
        this.selectedItems = [];
        this.selectedIdProp = 'id';
        this.hightlightProp = 'highlight';
        this.disablePreselected = false;
        this.maxItems = 500;
        this.perPage = 10;
        this.delayedLoadMore = false; // Used if the loadMore function is not available at init
        this.scrollPercentBottom = 75;
        this.fixedFooter = false;
        this.noResultsFound = false;
        this.noResultsMessage = 'NoSearchResults';
        this.dialog = false;
        this.disableDefaultPagination = false;
        this.readonly = false;
        this.hideSelect = false;
        this.valid = true;
        this.showEndOfList = true;
        this.selectEvent = new EventEmitter();
        this.showMoreClick = new EventEmitter();
        this.showLessClick = new EventEmitter();
        this.columnSortChange = new EventEmitter();
        this.loadMoreInitialized = false;
        this.startCount = 0;
        this.endCount = 0;
        this.totalCount = 0;
        this.pageNum = 1;
        this.isInit = false;
        this.expandedRows = [];
    }
    Object.defineProperty(ResponsiveDatatableComponent.prototype, "disableSorting", {
        get: function () {
            return this._disableSorting;
        },
        set: function (value) {
            this._disableSorting = value;
            if (this.staticItems) {
                this.totalCount = this.staticItems.length;
                this.onLoadStatic(this.currentSort);
            }
        },
        enumerable: false,
        configurable: true
    });
    ResponsiveDatatableComponent.prototype.ngOnInit = function () {
        if (this.loadMore) {
            this.onLoad();
        }
        else {
            this.isLoading = true;
            if (!this.delayedLoadMore) {
                this.staticInit();
            }
        }
        var hasColumnPermissions = this.columns.some(function (x) { return !!(x.linkPermission); });
    };
    ResponsiveDatatableComponent.prototype.ngAfterViewChecked = function () {
        this.cd.detectChanges();
    };
    ResponsiveDatatableComponent.prototype.ngAfterViewInit = function () {
        // this.registerScrollEvent();
        // this.processScrollEvents();
        // this.triggerEventOnScrollDown();
    };
    // Updates table if staticItems input is changed
    ResponsiveDatatableComponent.prototype.ngOnChanges = function (changes) {
        if (changes && changes.staticItems && changes.staticItems.currentValue) {
            this.staticInit();
        }
        if (changes && changes.loadMore && changes.loadMore.currentValue) {
            if (!this.loadMoreInitialized) {
                this.onLoad();
                this.loadMoreInitialized = true;
            }
        }
    };
    ResponsiveDatatableComponent.prototype.staticInit = function () {
        this.isLoading = true;
        this.totalCount = this.staticItems.length;
        this.currentSort = this.setDefaultSort();
        this.onStaticSort(this.currentSort);
        this.onLoadStatic();
    };
    ResponsiveDatatableComponent.prototype.trackById = function (index, item) {
        return item['id'];
    };
    ResponsiveDatatableComponent.prototype.trackColumn = function (index, item) {
        return item['name'];
    };
    ResponsiveDatatableComponent.prototype.toggleInfoRow = function (index, icon) {
        this.cd.detectChanges();
        this.expandedRows[index] = !this.expandedRows[index];
        this.expandedRows[index] ?
            icon._elementRef.nativeElement.classList.add('expanded') :
            icon._elementRef.nativeElement.classList.remove('expanded');
    };
    ResponsiveDatatableComponent.prototype.onSort = function (event) {
        this.disableSorting = false;
        if (this.disableSorting) {
            return;
        }
        if (event) {
            this.currentSort = event;
        }
        if (this.loadMore) {
            this.onLoad(this.currentSort);
        }
        else {
            this.onStaticSort(event);
            this.onLoadStatic(this.currentSort);
        }
        this.cd.detectChanges();
    };
    ResponsiveDatatableComponent.prototype.onStaticSort = function (event) {
        if (this.noDefaultSort) {
            return;
        }
        var column = this.columns.find(function (x) { return x.name === event.sortName; }) || this.selectColumn;
        this.columnSortChange.emit(this.columns);
        // Static tables with form inputs are not sortable
        if (column.sortEnabled != null && !column.sortEnabled) {
            return;
        }
        this.staticItems.sort(function (a, b) {
            if (column && column.sortFunc) {
                return column.sortFunc(a, b, event);
            }
            if (column) {
                if (a[event.sortName] instanceof Date) {
                    return OnDateCompare(a[event.sortName], b[event.sortName], event.sortDir);
                }
                return OnStringCompare(a[event.sortName], b[event.sortName], event.sortDir);
            }
        });
    };
    ResponsiveDatatableComponent.prototype.onInfoRowSort = function (column) {
        this.resetSorts(column);
        if (column.sortDir === 'asc') {
            column.sortDir = 'desc';
        }
        else {
            column.sortDir = 'asc';
        }
        var sort = { sortName: column.name, sortDir: column.sortDir };
        this.onSort(sort);
    };
    ResponsiveDatatableComponent.prototype.resetSorts = function (column) {
        var index = this.columns.indexOf(column);
        this.columns.forEach(function (header, i) {
            if (i !== index) {
                header.sortDir = undefined;
            }
        });
    };
    ResponsiveDatatableComponent.prototype.onCollapseChange = function (collapseValue) {
        this.isCollapsed = collapseValue;
    };
    ResponsiveDatatableComponent.prototype.onSelectAll = function (event) {
        this.selectColumn.selectAll = event.checked;
        if (event.checked) {
            this.selectedItems = Object.assign([], this.staticItems);
        }
        else {
            this.selectedItems = [];
        }
        this.selectEvent.emit(this.selectedItems);
    };
    ResponsiveDatatableComponent.prototype.onSelect = function (event, item) {
        if (this.selectSingle) {
            this.selectedItems = [];
            if (event.source.checked) {
                this.selectedItems.push(item);
            }
        }
        else {
            var index = this.selectedItems.indexOf(item);
            if (event.checked) {
                if (index < 0) {
                    this.selectedItems.push(item);
                }
            }
            else {
                this.selectColumn.selectAll = event.checked;
                this.selectedItems.splice(index, 1);
            }
        }
        this.selectEvent.emit(this.selectedItems);
    };
    ResponsiveDatatableComponent.prototype.onSingleSelectChecked = function (item) {
        if (this.selectedItems.length > 0 && this.selectedItems[0] === item) {
            return true;
        }
        else {
            return false;
        }
    };
    ResponsiveDatatableComponent.prototype.checkSelected = function (item, listItems) {
        var _this = this;
        if (this.preselectedItems) {
            if (listItems) {
                return !!(this.preselectedItems.findIndex(function (selectedItem) { return item[_this.selectedIdProp] === selectedItem[_this.selectedIdProp]; }) > -1);
            }
            else {
                return !!(this.selectedItems.findIndex(function (selectedItem) { return item[_this.selectedIdProp] === selectedItem[_this.selectedIdProp]; }) > -1);
            }
        }
        else {
            return !!(this.selectedItems.findIndex(function (selectedItem) { return item[_this.selectedIdProp] === selectedItem[_this.selectedIdProp]; }) > -1);
        }
    };
    ResponsiveDatatableComponent.prototype.getSelectedItems = function () {
        return this.selectedItems;
    };
    ResponsiveDatatableComponent.prototype.checkHightlight = function (item) {
        if (item[this.hightlightProp]) {
            return true;
        }
        else if (item instanceof FormGroup) {
            return item.contains(this.hightlightProp) && item.get(this.hightlightProp).value;
        }
        else {
            return false;
        }
    };
    ResponsiveDatatableComponent.prototype.checkSelectable = function (item) {
        if (this.itemSelectableProp) {
            if (item[this.itemSelectableProp]) {
                return true;
            }
            else if (item instanceof FormGroup) {
                return item.contains(this.itemSelectableProp) && item.get(this.itemSelectableProp).value;
            }
            return false;
        }
        return true;
    };
    ResponsiveDatatableComponent.prototype.registerScrollEvent = function () {
        // this.scrollEvent$ = Observable.fromEvent(window, 'scroll');
    };
    ResponsiveDatatableComponent.prototype.processScrollEvents = function () {
        // this.processScrollDown();
    };
    ResponsiveDatatableComponent.prototype.processScrollDown = function () {
        // this.scrolledDown$ = this.scrollEvent$.map((): ScrollPosition => ({
        //   sH: document.documentElement.scrollHeight,
        //   sT: window.pageYOffset,
        //   cH: document.documentElement.clientHeight
        // }))
        //   .pairwise()
        //   .filter(positions => !this.isLoading && this.isScrollingDown(positions) && this.isScrollExpectedPercentDown(positions[1]));
    };
    ResponsiveDatatableComponent.prototype.isScrollingDown = function (positions) {
        // return positions[0].sT < positions[1].sT;
        return false;
    };
    ResponsiveDatatableComponent.prototype.isScrollExpectedPercentDown = function (position) {
        // return ((position.sT + position.cH) / position.sH) > (this.scrollPercentBottom / 100);
        return false;
    };
    ResponsiveDatatableComponent.prototype.triggerEventOnScrollDown = function () {
        // this.triggerEventDown$ = this.scrolledDown$;
    };
    ResponsiveDatatableComponent.prototype.onReset = function (sort) {
        this.items = [];
        this.expandedRows = [];
        this.pageNum = 1;
        this.noMoreItems = false;
        sort = this.setDefaultSort();
    };
    ResponsiveDatatableComponent.prototype.onLoad = function (sort, reset) {
        var _this = this;
        if (reset === void 0) { reset = true; }
        if (reset) {
            this.totalCount = 0;
            this.onReset();
        }
        this.isLoading = true;
        this.loadMoreSub = this.loadMore({
            pageNum: this.pageNum,
            perPage: this.perPage,
            sort: this.currentSort,
        }).subscribe(function (x) {
            _this.isLoading = false;
            _this.items = x.items;
            _this.selectedItems = [];
            _this.expandedRows = [];
            x.items.forEach(function (x) { return _this.expandedRows.push(false); });
            if (x.totalCount) {
                _this.totalCount = x.totalCount;
                _this.noMoreItems = _this.pageNum === Math.ceil(_this.totalCount / _this.perPage);
            }
            _this.updatePageDisplay();
        }, function (err) {
            _this.isLoading = false;
            // TODO handle the error
        });
    };
    ResponsiveDatatableComponent.prototype.onLoadStatic = function (sort, reset) {
        var _this = this;
        if (reset === void 0) { reset = true; }
        if (reset) {
            this.onReset();
        }
        if (sort) {
            this.onStaticSort(sort);
        }
        this.updatePageDisplay();
        this.noMoreItems = this.pageNum === Math.ceil(this.totalCount / this.perPage);
        var count = 0;
        this.items = [];
        this.staticItems.forEach(function (x) {
            count++;
            if (count >= _this.startCount && count <= _this.endCount) {
                _this.items.push(x);
                _this.expandedRows.push(false);
            }
        });
        if (this.noResultsFound || this.noMoreItems || this.staticItems.length >= 0) {
            this.isLoading = false;
        }
    };
    ResponsiveDatatableComponent.prototype.triggerLoadData = function () {
        this.onLoad(undefined, true);
    };
    ResponsiveDatatableComponent.prototype.updatePageDisplay = function () {
        this.startCount = (this.pageNum - 1) * this.perPage + 1;
        this.endCount = this.startCount + this.perPage - 1;
        if (this.endCount > this.totalCount) {
            this.endCount = this.totalCount;
        }
        if (this.totalCount === 0) {
            this.startCount = 0;
        }
        this.pageDisplay = 'Display ($0 - $1) of $2 results'
            .replace('$0', this.startCount + '')
            .replace('$1', this.endCount + '')
            .replace('$2', this.totalCount + '');
    };
    ResponsiveDatatableComponent.prototype.setDefaultSort = function () {
        if (this.noDefaultSort) {
            return null;
        }
        if (this.columns) {
            var defaultSort = this.columns.find(this.hasSortProperty) || this.selectColumn;
            var sort = { sortName: defaultSort.name, sortDir: defaultSort.sortDir };
            return sort;
        }
        return null;
    };
    ResponsiveDatatableComponent.prototype.hasSortProperty = function (column) {
        return !!column.sortDir;
    };
    ResponsiveDatatableComponent.prototype.checkStyleApplicable = function (item, array) {
        if (!array)
            return false;
        return !!array.find(function (x) { return x === item; });
    };
    ResponsiveDatatableComponent.prototype.onPaginate = function (page) {
        var _this = this;
        this.pageNum = page;
        if (this.loadMore) {
            this.onLoad(this.currentSort, false);
        }
        else {
            this.onLoadStatic(this.currentSort, false);
            if (!this.isInit) {
                this.isInit = true;
                // To update with change detection in the future
                setTimeout(function () {
                    _this.onPaginate(page);
                }, 300);
            }
            this.cd.detectChanges();
        }
    };
    ResponsiveDatatableComponent.prototype.showLess = function () {
        this.showLessClick.emit();
    };
    ResponsiveDatatableComponent.prototype.showMore = function () {
        this.showMoreClick.emit();
    };
    ResponsiveDatatableComponent.prototype.ngOnDestroy = function () {
        if (this.loadMoreSub) {
            this.loadMoreSub.unsubscribe();
        }
        if (this.loadMoreTriggerSub) {
            this.loadMoreTriggerSub.unsubscribe();
        }
    };
    __decorate([
        Language(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "lang", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ResponsiveDatatableComponent.prototype, "items", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "noDefaultSort", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ResponsiveDatatableComponent.prototype, "staticItems", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ResponsiveDatatableComponent.prototype, "selectedItems", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "selectedIdProp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "hightlightProp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "itemSelectableProp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "disablePreselected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ResponsiveDatatableComponent.prototype, "preselectedItems", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "maxItems", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "perPage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TableColumn)
    ], ResponsiveDatatableComponent.prototype, "selectColumn", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ResponsiveDatatableComponent.prototype, "columns", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], ResponsiveDatatableComponent.prototype, "loadMore", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "delayedLoadMore", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ResponsiveDatatableComponent.prototype, "selectEnabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ResponsiveDatatableComponent.prototype, "selectAllEnabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ResponsiveDatatableComponent.prototype, "selectSingle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "scrollPercentBottom", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "fixedFooter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "translateParams", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "noResultsFound", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "noResultsMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "description", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "dialog", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "disableDefaultPagination", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "readonly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "hideSelect", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "valid", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDatatableComponent.prototype, "showEndOfList", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ResponsiveDatatableComponent.prototype, "selectEvent", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ResponsiveDatatableComponent.prototype, "showMoreClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ResponsiveDatatableComponent.prototype, "showLessClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ResponsiveDatatableComponent.prototype, "columnSortChange", void 0);
    __decorate([
        ContentChild(TemplateRef, { static: false }),
        __metadata("design:type", TemplateRef)
    ], ResponsiveDatatableComponent.prototype, "cellTemplate", void 0);
    __decorate([
        ViewChild('tableHeader', { static: false }),
        __metadata("design:type", ElementRef)
    ], ResponsiveDatatableComponent.prototype, "tableHeader", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ResponsiveDatatableComponent.prototype, "disableSelectSorting", void 0);
    __decorate([
        Input('disableSorting'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], ResponsiveDatatableComponent.prototype, "disableSorting", null);
    ResponsiveDatatableComponent = __decorate([
        Component({
            selector: 'samplicity-responsive-datatable',
            templateUrl: './responsive-datatable.component.html',
            styleUrls: ['./responsive-datatable.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [TranslationService,
            ChangeDetectorRef])
    ], ResponsiveDatatableComponent);
    return ResponsiveDatatableComponent;
}());
export { ResponsiveDatatableComponent };
//# sourceMappingURL=responsive-datatable.component.js.map