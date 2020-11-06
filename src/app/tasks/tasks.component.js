import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateNewTaskComponent } from '../shared/components/create-new-task/create-new-task.component';
var TasksComponent = /** @class */ (function () {
    function TasksComponent(dialog) {
        this.dialog = dialog;
        this.pageSize = 10;
        this.currentPage = 1;
        this.fromReport = true;
        this.pages = [];
        this.gridata = [
            { Description: 'Etiam sed diam vel lectus volutpat efficitur. Etiam eu bibendum libero', Priority: 'Medium', Status: 'New', LineofBusiness: 'Direct to Practitioner', AssignedTo: 'Sara Murphy (0011223344)', RequesterName: 'Linda Chapman', CreationDate: 'Nov 03, 2019', RequestedCompletionDate: 'Dec 03, 2019' },
            { Description: 'Etiam sed diam vel lectus volutpat efficitur. Etiam eu bibendum libero', Priority: 'Low', Status: 'New', LineofBusiness: 'Direct to Practitioner', AssignedTo: 'Sara Murphy (0011223344)', RequesterName: 'Linda Chapman', CreationDate: 'Nov 03, 2019', RequestedCompletionDate: 'Dec 03, 2019' },
            { Description: 'Etiam sed diam vel lectus volutpat efficitur. Etiam eu bibendum libero', Priority: 'Medium', Status: 'Active', LineofBusiness: 'Direct to Practitioner', AssignedTo: 'Sara Murphy (0011223344)', RequesterName: 'Linda Chapman', CreationDate: 'Nov 03, 2019', RequestedCompletionDate: 'Dec 03, 2019' },
            { Description: 'Etiam sed diam vel lectus volutpat efficitur. Etiam eu bibendum libero', Priority: 'Medium', Status: 'New', LineofBusiness: 'Direct to Practitioner', AssignedTo: 'Sara Murphy (0011223344)', RequesterName: 'Linda Chapman', CreationDate: 'Nov 03, 2019', RequestedCompletionDate: 'Dec 03, 2019' },
            { Description: 'Etiam sed diam vel lectus volutpat efficitur. Etiam eu bibendum libero', Priority: 'Medium', Status: 'New', LineofBusiness: 'Direct to Practitioner', AssignedTo: 'Sara Murphy (0011223344)', RequesterName: 'Linda Chapman', CreationDate: 'Nov 03, 2019', RequestedCompletionDate: 'Dec 03, 2019' },
            { Description: 'Etiam sed diam vel lectus volutpat efficitur. Etiam eu bibendum libero', Priority: 'Medium', Status: 'New', LineofBusiness: 'Direct to Practitioner', AssignedTo: 'Sara Murphy (0011223344)', RequesterName: 'Linda Chapman', CreationDate: 'Nov 03, 2019', RequestedCompletionDate: 'Dec 03, 2019' },
        ];
        this.columns = [
            { title: 'Description', classes: 'col-xs-4' },
            { title: 'Priority', classes: 'col-xs-2' },
            { title: 'Status', classes: 'col-xs-2' },
            { title: 'Line of Business', classes: 'col-xs-2' },
            { title: 'Assigned To', classes: 'col-xs-2' },
            { title: 'Requester Name', classes: 'col-xs-2' },
            { title: 'Creation Date', classes: 'col-xs-2' },
            { title: 'Requested Completion Date', classes: 'col-xs-2' }
        ];
    }
    TasksComponent.prototype.ngOnInit = function () {
        this.isCollapsed = false;
    };
    TasksComponent.prototype.onCollapse = function () {
        this.isCollapsed = !this.isCollapsed;
    };
    TasksComponent.prototype.openDialogue = function () {
        this.dialog.open(CreateNewTaskComponent, {
            panelClass: 'custom-dialog',
            width: '1000px',
        });
    };
    TasksComponent = __decorate([
        Component({
            selector: 'app-tasks',
            templateUrl: './tasks.component.html',
            styleUrls: ['./tasks.component.scss']
        }),
        __metadata("design:paramtypes", [MatDialog])
    ], TasksComponent);
    return TasksComponent;
}());
export { TasksComponent };
//# sourceMappingURL=tasks.component.js.map