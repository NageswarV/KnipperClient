import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TasksComponent } from './tasks.component';
var TasksModule = /** @class */ (function () {
    function TasksModule() {
    }
    TasksModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                CommonModule,
            ],
            providers: [],
            declarations: [
                TasksComponent
            ],
            exports: []
        })
    ], TasksModule);
    return TasksModule;
}());
export { TasksModule };
//# sourceMappingURL=tasks.module.js.map