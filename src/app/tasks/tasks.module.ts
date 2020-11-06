import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { TasksComponent } from './tasks.component';
import { TasksListFilterComponent } from './tasks-list-filter/tasks-list-filter.component';
import { MyDatePickerModule } from 'mydatepicker';
import { TaskService } from './tasks.service';
import { TaskDetailsComponent } from './task-details/task-details.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        MyDatePickerModule
    ],
    providers: [TaskService],
    declarations: [
        TasksComponent, TaskDetailsComponent, TasksListFilterComponent
    ],
    exports: [
    ]
})
export class TasksModule { }
