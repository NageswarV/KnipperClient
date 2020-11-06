import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { AuthenticationService } from '../../../authentication/index';
var CreateNewTaskComponent = /** @class */ (function () {
    function CreateNewTaskComponent(authenticationService) {
        this.authenticationService = authenticationService;
        this.priority = 'low';
        this.date = new Date();
    }
    CreateNewTaskComponent.prototype.ngOnInit = function () {
        this.initDatePicker();
    };
    CreateNewTaskComponent.prototype.priorityLow = function () {
        this.priority = 'low';
    };
    CreateNewTaskComponent.prototype.priorityMedium = function () {
        this.priority = 'medium';
    };
    CreateNewTaskComponent.prototype.priorityHigh = function () {
        this.priority = 'high';
    };
    CreateNewTaskComponent.prototype.initDatePicker = function () {
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
    CreateNewTaskComponent = __decorate([
        Component({
            selector: 'app-create-new-task',
            templateUrl: './create-new-task.component.html',
            styleUrls: ['./create-new-task.component.scss']
        }),
        __metadata("design:paramtypes", [AuthenticationService])
    ], CreateNewTaskComponent);
    return CreateNewTaskComponent;
}());
export { CreateNewTaskComponent };
//# sourceMappingURL=create-new-task.component.js.map