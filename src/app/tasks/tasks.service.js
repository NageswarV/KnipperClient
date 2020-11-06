import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { ServiceClient } from '../../generated/service-client';
var TaskService = /** @class */ (function () {
    function TaskService(serviceClient) {
        this.serviceClient = serviceClient;
    }
    TaskService.prototype.GetTaskList = function (id) {
        return this.serviceClient.getTasks(id);
    };
    TaskService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ServiceClient])
    ], TaskService);
    return TaskService;
}());
export { TaskService };
//# sourceMappingURL=tasks.service.js.map