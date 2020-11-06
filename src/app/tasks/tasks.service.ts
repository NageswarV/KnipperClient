
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceClient, Task, User } from '../../generated/service-client';

@Injectable()
export class TaskService {

    constructor(private serviceClient: ServiceClient) { }

    GetTaskList(id?: any): Observable<Task[]> {
        return this.serviceClient.getTasks('')
    }
    getTaskById(id): Observable<Task> {
        return this.serviceClient.getTask(id)
    }
    getUsers(): Observable<User[]>{
        return this.serviceClient.getUsers()
    }
}
