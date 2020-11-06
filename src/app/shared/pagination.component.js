import { __decorate, __metadata } from "tslib";
import { debounceTime } from 'rxjs/operators';
import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
var PaginationComponent = /** @class */ (function () {
    function PaginationComponent() {
        this.paginationUpdate = new Subject();
        this.emitPageChange = new EventEmitter();
        this.emitpageSizeChange = new EventEmitter();
        this.pageDisplay = "";
        this.autoHide = true;
        this.pageSize = 0;
        this.totalRecordCount = 0;
    }
    PaginationComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.disableFloating) {
            this.paginationUpdate.pipe(debounceTime(50)).subscribe(function () {
                var self = _this;
                var el = $('pagination-template').get(0);
                if (el) {
                    var visible = (el.getBoundingClientRect().top >= 0) && (el.getBoundingClientRect().top <= window.innerHeight);
                    if (self.paginationFloating !== !visible) {
                        self.paginationFloating = !visible;
                    }
                }
            });
        }
        this.pageDisplay = 'Display (1 - $0) of $1 results'
            .replace('$0', (this.pageSize > this.totalRecordCount ? this.totalRecordCount : this.pageSize).toString() + '')
            .replace('$1', this.totalRecordCount + '');
        this.bkpPageSize = this.pageSize;
    };
    PaginationComponent.prototype.ngOnChanges = function (changes) {
        this.paginationUpdate.next();
    };
    PaginationComponent.prototype.onResize = function (event) {
        this.paginationUpdate.next(event);
    };
    PaginationComponent.prototype.onScroll = function (event) {
        this.paginationUpdate.next(event);
    };
    PaginationComponent.prototype.changePage = function (pageNumber) {
        this.emitPageChange.emit(pageNumber);
        if (!this.disableScroll) {
            window.scrollTo(0, 0);
        }
    };
    PaginationComponent.prototype.getPage = function (event) {
        this.emitPageChange.emit(event.srcElement.childNodes[0].data);
        if (!this.disableScroll) {
            window.scrollTo(0, 0);
        }
    };
    PaginationComponent.prototype.pageSizeChange = function (size) {
        this.emitpageSizeChange.emit(this.pageSize);
        if (!this.disableScroll) {
            window.scrollTo(0, 0);
        }
    };
    PaginationComponent.prototype.scrollToTop = function () {
        $('html,body').animate({ scrollTop: 0 }, 'slow');
    };
    PaginationComponent.prototype.showLess = function () {
        this.pageSize = this.bkpPageSize;
        this.pageDisplay = 'Display (1 - $0) of $1 results'
            .replace('$0', this.pageSize + '')
            .replace('$1', this.totalRecordCount + '');
        this.emitpageSizeChange.emit(this.pageSize);
    };
    PaginationComponent.prototype.showMore = function () {
        this.pageSize = this.pageSize + this.bkpPageSize > this.totalRecordCount ? this.totalRecordCount : this.pageSize + this.bkpPageSize;
        this.pageDisplay = 'Display (1 - $0) of $1 results'
            .replace('$0', this.pageSize + '')
            .replace('$1', this.totalRecordCount + '');
        this.emitpageSizeChange.emit(this.pageSize);
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PaginationComponent.prototype, "componentId", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PaginationComponent.prototype, "totalRecordCount", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PaginationComponent.prototype, "pageSize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PaginationComponent.prototype, "bkpPageSize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PaginationComponent.prototype, "currentPage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PaginationComponent.prototype, "autoHide", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PaginationComponent.prototype, "disableFloating", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PaginationComponent.prototype, "disableScroll", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PaginationComponent.prototype, "pageSizeOptions", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PaginationComponent.prototype, "emitPageChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PaginationComponent.prototype, "emitpageSizeChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PaginationComponent.prototype, "fromAnnouncement", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PaginationComponent.prototype, "maxSize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PaginationComponent.prototype, "totalPages", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PaginationComponent.prototype, "fromReport", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PaginationComponent.prototype, "loadMorePagination", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PaginationComponent.prototype, "pages", void 0);
    __decorate([
        HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PaginationComponent.prototype, "onResize", null);
    __decorate([
        HostListener('window:scroll', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PaginationComponent.prototype, "onScroll", null);
    PaginationComponent = __decorate([
        Component({
            selector: 'sg-pagination',
            templateUrl: './pagination.component.html',
            styleUrls: ['./pagination.component.scss'],
        }),
        __metadata("design:paramtypes", [])
    ], PaginationComponent);
    return PaginationComponent;
}());
export { PaginationComponent };
//# sourceMappingURL=pagination.component.js.map