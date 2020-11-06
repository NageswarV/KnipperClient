export class TaskFilterCriteria {
    status: string;
    priority: string;

    clone(): TaskFilterCriteria {
        const taskFilterCriteria: TaskFilterCriteria = new TaskFilterCriteria();
        taskFilterCriteria.status = this.status;
        taskFilterCriteria.priority = this.priority;

        return taskFilterCriteria;
    }
}
