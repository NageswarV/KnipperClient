var TaskFilterCriteria = /** @class */ (function () {
    function TaskFilterCriteria() {
    }
    TaskFilterCriteria.prototype.clone = function () {
        var taskFilterCriteria = new TaskFilterCriteria();
        taskFilterCriteria.status = this.status;
        taskFilterCriteria.priority = this.priority;
        return taskFilterCriteria;
    };
    return TaskFilterCriteria;
}());
export { TaskFilterCriteria };
//# sourceMappingURL=task.model.js.map