import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FilterService } from '../../../../core/filter.service';
var ResponsiveDataTablePaginationComponent = /** @class */ (function () {
    function ResponsiveDataTablePaginationComponent(filterService, cd) {
        this.filterService = filterService;
        this.cd = cd;
        this.perPage = 0;
        this.pageNum = 1;
        this.pageSegment = 5;
        this.fixedFooter = false;
        this.dialog = false;
        this.paginateEvent = new EventEmitter();
    }
    Object.defineProperty(ResponsiveDataTablePaginationComponent.prototype, "totalCount", {
        get: function () {
            return this._totalCount;
        },
        set: function (value) {
            this._totalCount = value;
            this.loadPages();
        },
        enumerable: false,
        configurable: true
    });
    ResponsiveDataTablePaginationComponent.prototype.ngOnInit = function () {
        this.loadPages();
    };
    ResponsiveDataTablePaginationComponent.prototype.ngAfterViewInit = function () {
        this.displayScrollButton = this.fixedFooter;
        if (!this.cd['destroyed']) {
            this.cd.detectChanges();
        }
        // this.filterService.getFilterShown().subscribe(x => {
        //   this.isFilterShown = x;
        //   if (!this.cd['destroyed']) {
        //     this.cd.detectChanges();
        //   }
        // });
    };
    // @HostListener('window:scroll', [])
    // onScroll(): void {
    //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    //     this.bottomOfPage = true;
    //   } else {
    //     this.bottomOfPage = false;
    //   }
    // }
    ResponsiveDataTablePaginationComponent.prototype.scrollToTop = function () {
        window.scroll(0, 0);
    };
    ResponsiveDataTablePaginationComponent.prototype.paginate = function (page) {
        this.pageNum = page;
        this.paginateEvent.emit(page);
        this.loadPages();
    };
    ResponsiveDataTablePaginationComponent.prototype.paginatePrevious = function () {
        this.paginate(this.pageNum - 1);
    };
    ResponsiveDataTablePaginationComponent.prototype.paginateNext = function () {
        this.paginate(this.pageNum + 1);
    };
    ResponsiveDataTablePaginationComponent.prototype.paginateFirstEllipses = function () {
        this.paginate(Math.max(this.pageNum - this.pageSegment, 1));
    };
    ResponsiveDataTablePaginationComponent.prototype.paginateLastEllipses = function () {
        this.paginate(Math.min(this.pageNum + this.pageSegment, this.lastPage));
    };
    ResponsiveDataTablePaginationComponent.prototype.loadPages = function () {
        if (!this.totalCount) {
            return;
        }
        var pageTotal = Math.ceil(this.totalCount / this.perPage);
        this.lastPage = pageTotal;
        this.displayFirstPage = this.pageNum > this.pageSegment - 1;
        this.displayLastPage = this.pageNum <= this.lastPage - this.pageSegment + 1;
        var pageStart = this.pageNum - 1;
        var pageEnd = this.pageNum + 1;
        if (!this.displayFirstPage) {
            pageStart = 2;
            pageEnd = this.pageSegment;
        }
        if (!this.displayLastPage) {
            pageStart = pageTotal - this.pageSegment + 1;
            pageEnd = pageTotal - 1;
        }
        pageStart = Math.max(pageStart, 2);
        pageEnd = Math.min(pageEnd, pageTotal - 1);
        this.pages = [];
        for (var c = pageStart; c <= pageEnd; c++) {
            this.pages.push(c);
        }
    };
    ResponsiveDataTablePaginationComponent.prototype.ngOnDestroy = function () {
        this.cd.detach();
        if (this.paginateSub) {
            this.paginateSub.unsubscribe();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDataTablePaginationComponent.prototype, "perPage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDataTablePaginationComponent.prototype, "pageNum", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDataTablePaginationComponent.prototype, "pageSegment", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDataTablePaginationComponent.prototype, "fixedFooter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ResponsiveDataTablePaginationComponent.prototype, "pageDisplay", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ResponsiveDataTablePaginationComponent.prototype, "dialog", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ResponsiveDataTablePaginationComponent.prototype, "isFilterShown", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ResponsiveDataTablePaginationComponent.prototype, "paginateEvent", void 0);
    __decorate([
        Input('totalCount'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], ResponsiveDataTablePaginationComponent.prototype, "totalCount", null);
    ResponsiveDataTablePaginationComponent = __decorate([
        Component({
            selector: 'samplicity-table-pagination',
            templateUrl: './table-pagination.component.html',
            styleUrls: ['./table-pagination.component.scss']
        }),
        __metadata("design:paramtypes", [FilterService,
            ChangeDetectorRef])
    ], ResponsiveDataTablePaginationComponent);
    return ResponsiveDataTablePaginationComponent;
}());
export { ResponsiveDataTablePaginationComponent };
//# sourceMappingURL=table-pagination.component.js.map