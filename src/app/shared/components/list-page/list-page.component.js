import { __decorate, __metadata } from "tslib";
import { Component, ViewChild, Input, ContentChild, TemplateRef, EventEmitter, Output } from '@angular/core';
import { NotificationComponent } from '../../../shared/components/notification/notification.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResponsiveDatatableComponent } from '../responsive-datatable/responsive-datatable.component';
import { TableColumn } from '../responsive-datatable/table.model';
import { TranslationService } from 'angular-l10n';
import { FilterService } from '../../../core/filter.service';
var ListPageComponent = /** @class */ (function () {
    function ListPageComponent(translationService, filterService, route, fb) {
        this.translationService = translationService;
        this.filterService = filterService;
        this.route = route;
        this.clientIdChangeKey = 'samplicity-dtp-changed-client';
        this.hightlightProp = 'highlight';
        this.createLinkVisible = true;
        this.hideCreateButton = false;
        this.selectEnabled = false;
        this.selectEvent = new EventEmitter();
        this.scrollToTopRequired = false;
        this.searchForm = fb.group({
            search: ['']
        });
    }
    ListPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initFilter();
        this.route.queryParams.subscribe(function (params) {
            if (params.discarded) {
                _this.notificationWindow.displayInfoMessage(_this.translationService.translate('Notifications.ChangesDiscardedSuccess').replace('$0', params.discarded), 'Notifications.InfoTitleDefault');
                _this.scrollToTopRequired = true;
            }
            if (params.deleted) {
                _this.notificationWindow.displaySuccessMessage(_this.translationService.translate('Notifications.DeletedSuccess').replace('$0', params.deleted), 'Notifications.SuccessTitleDefault');
                _this.scrollToTopRequired = true;
            }
            if (params.canceled) {
                _this.notificationWindow.displaySuccessMessage(_this.translationService.translate('Notifications.CanceledSuccess').replace('$0', params.canceled), 'Notifications.SuccessTitleDefault');
                _this.scrollToTopRequired = true;
            }
            _this.setClientChange();
        });
        var hasColumnPermissions = this.columns.some(function (x) { return !!(x.linkPermission); });
    };
    ListPageComponent.prototype.ngAfterViewInit = function () {
        if (this.scrollToTopRequired) {
            this.scrollToTop();
        }
    };
    ListPageComponent.prototype.scrollToTop = function () {
        var sidenav = document.querySelector('.mat-sidenav-content');
        sidenav ? sidenav.scrollTo(0, 0) : window.scrollTo(0, 0);
        this.scrollToTopRequired = false;
    };
    ListPageComponent.prototype.initFilter = function () {
        if (this.filterService.hasFilter(this.pageTitle)) {
            var filterValue = this.filterService.loadFilter(this.pageTitle);
            if (Object.keys(filterValue).length > 0) {
                this.filterForm.setValue(filterValue);
            }
            else {
                this.filterForm.reset();
            }
        }
        else {
            this.filterForm.reset();
        }
    };
    ListPageComponent.prototype.getFilterValue = function (name) {
        var field = this.filterForm.get(name);
        if (field) {
            return field.value;
        }
        return null;
    };
    ListPageComponent.prototype.hasFilter = function () {
        return this.filterService.hasFilter(this.pageTitle);
    };
    ListPageComponent.prototype.getSearchValue = function () {
        var field = this.searchForm.get('search');
        if (field) {
            return field.value;
        }
        return '';
    };
    ListPageComponent.prototype.doSearch = function () {
        if (this.displayColumns) {
            this.columns = this.displayColumns;
        }
        if (this.filterForm.valid && this.searchForm.valid) {
            this.filterService.saveFilter(this.pageTitle, this.filterForm.getRawValue());
            this.notificationWindow.removeMessage();
            this.table.triggerLoadData();
        }
    };
    ListPageComponent.prototype.getSelectedItems = function () {
        return this.table.getSelectedItems();
    };
    ListPageComponent.prototype.onClearFilter = function (stickyItem) {
        var _this = this;
        var stickyValue;
        this.filterService.clearFilter(this.pageTitle);
        if (stickyItem != null) {
            stickyValue = this.filterForm.get(stickyItem).value;
        }
        this.filterForm.reset();
        if (this.defaultFilterValues) {
            Object.keys(this.defaultFilterValues).forEach(function (key) {
                _this.filterForm.get(key).setValue(_this.defaultFilterValues[key]);
            });
        }
        if (stickyValue != null) {
            this.filterForm.get(stickyItem).setValue(stickyValue);
        }
        this.table.triggerLoadData();
    };
    ListPageComponent.prototype.onToggleFilter = function (toggle) {
        this.filterService.toggleFilter(toggle);
    };
    ListPageComponent.prototype.setClientChange = function () {
        localStorage.setItem(this.clientIdChangeKey, JSON.stringify(false));
    };
    ListPageComponent.prototype.onSelect = function (selectedItems) {
        this.selectEvent.emit(selectedItems);
    };
    __decorate([
        ViewChild('table', { static: false }),
        __metadata("design:type", ResponsiveDatatableComponent)
    ], ListPageComponent.prototype, "table", void 0);
    __decorate([
        ViewChild('notificationWindow', { static: false }),
        __metadata("design:type", NotificationComponent)
    ], ListPageComponent.prototype, "notificationWindow", void 0);
    __decorate([
        ContentChild(TemplateRef, { static: false }),
        __metadata("design:type", TemplateRef)
    ], ListPageComponent.prototype, "cellTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], ListPageComponent.prototype, "filterForm", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ListPageComponent.prototype, "columns", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ListPageComponent.prototype, "items", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], ListPageComponent.prototype, "loadMore", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ListPageComponent.prototype, "delayedLoadMore", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ListPageComponent.prototype, "createLink", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ListPageComponent.prototype, "createBtnText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ListPageComponent.prototype, "createLinkPermission", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ListPageComponent.prototype, "pageTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ListPageComponent.prototype, "stickyResetItem", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ListPageComponent.prototype, "breadcrumbText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ListPageComponent.prototype, "options", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ListPageComponent.prototype, "displayColumns", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListPageComponent.prototype, "hightlightProp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListPageComponent.prototype, "createLinkVisible", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListPageComponent.prototype, "hideCreateButton", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListPageComponent.prototype, "defaultFilterValues", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListPageComponent.prototype, "selectEnabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TableColumn)
    ], ListPageComponent.prototype, "selectColumn", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ListPageComponent.prototype, "disableSelectSorting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ListPageComponent.prototype, "itemSelectableProp", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ListPageComponent.prototype, "selectEvent", void 0);
    ListPageComponent = __decorate([
        Component({
            selector: 'samplicity-list-page',
            templateUrl: './list-page.component.html',
            styleUrls: ['./list-page.component.scss']
        }),
        __metadata("design:paramtypes", [TranslationService,
            FilterService,
            ActivatedRoute,
            FormBuilder])
    ], ListPageComponent);
    return ListPageComponent;
}());
export { ListPageComponent };
//# sourceMappingURL=list-page.component.js.map