import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { CacheService } from '../../cache/cache.service';
import { TaskFilterCriteria } from '../task.model';
var TasksListFilterComponent = /** @class */ (function () {
    function TasksListFilterComponent(cacheService) {
        this.cacheService = cacheService;
        this.emitTaskSearch = new EventEmitter();
        this.stateOptions = [];
        this.init(null);
    }
    TasksListFilterComponent.prototype.ngOnInit = function () {
        this.initDatePicker();
        this.stateOptions = this.cacheService.stateCache;
    };
    TasksListFilterComponent.prototype.init = function (taskFilterCriteria) {
        //get and fill initial data if any
        this.taskFilterCriteria = new TaskFilterCriteria();
        this.taskFilterCriteria.status = '';
        this.taskFilterCriteria.priority = '';
    };
    TasksListFilterComponent.prototype.onSubmit = function (reset) {
        this.emitTaskSearch.emit({ filter: this.taskFilterCriteria, isReset: reset || false });
    };
    TasksListFilterComponent.prototype.resetFilter = function () {
        this.taskFilterCriteria.status = '';
        this.taskFilterCriteria.priority = '';
        this.onSubmit(true);
    };
    TasksListFilterComponent.prototype.initDatePicker = function () {
        this.myDatePickerOptions = {
            dateFormat: 'mm/dd/yyyy',
            firstDayOfWeek: "su",
            selectionTxtFontSize: '15px',
            showClearDateBtn: true,
            editableDateField: false,
            inline: false,
            height: '45px'
        };
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TasksListFilterComponent.prototype, "emitTaskSearch", void 0);
    __decorate([
        ViewChild('accordian', { static: true }),
        __metadata("design:type", NgbAccordion)
    ], TasksListFilterComponent.prototype, "accordian", void 0);
    TasksListFilterComponent = __decorate([
        Component({
            selector: 'sg-tasks-list-filter',
            templateUrl: './tasks-list-filter.component.html',
            styleUrls: ['./tasks-list-filter.component.scss']
        }),
        __metadata("design:paramtypes", [CacheService])
    ], TasksListFilterComponent);
    return TasksListFilterComponent;
}());
export { TasksListFilterComponent };
//# sourceMappingURL=tasks-list-filter.component.js.map