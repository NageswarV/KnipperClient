import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
import { AuthenticationService } from './../../authentication';
var TaskDetailsComponent = /** @class */ (function () {
    function TaskDetailsComponent(authenticationService) {
        this.authenticationService = authenticationService;
        this.priority = 'low';
        this.date = new Date();
    }
    TaskDetailsComponent.prototype.ngOnInit = function () {
        this.initDatePicker();
    };
    TaskDetailsComponent.prototype.priorityLow = function () {
        this.priority = 'low';
    };
    TaskDetailsComponent.prototype.priorityMedium = function () {
        this.priority = 'medium';
    };
    TaskDetailsComponent.prototype.priorityHigh = function () {
        console.log(this.task);
        this.priority = 'high';
    };
    TaskDetailsComponent.prototype.initDatePicker = function () {
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
        Input(),
        __metadata("design:type", Object)
    ], TaskDetailsComponent.prototype, "task", void 0);
    TaskDetailsComponent = __decorate([
        Component({
            selector: 'app-task-details',
            templateUrl: './task-details.component.html',
            styleUrls: ['./task-details.component.scss']
        }),
        __metadata("design:paramtypes", [AuthenticationService])
    ], TaskDetailsComponent);
    return TaskDetailsComponent;
}());
export { TaskDetailsComponent };
//# sourceMappingURL=task-details.component.js.map