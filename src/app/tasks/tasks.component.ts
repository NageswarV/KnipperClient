import { Component, OnInit } from '@angular/core';
import { Report } from '../../generated/service-client';
import { IGridColumns } from '../shared/grid.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CreateNewTaskComponent } from '../shared/components/create-new-task/create-new-task.component';
import { TableColumn } from '../shared';
import { BusySpinner } from '../common/busy-spinner';
import { TaskService } from './tasks.service';
import { CustomDatePipe } from '../shared/custom-date.pipe';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent extends BusySpinner implements OnInit {
  pageSize = 10;
  currentPage = 1;
  columns: IGridColumns[];
  collection: Report[];
  reportsPerPage: Report[];
  totalRecordCount: number;
  fromReport: boolean = true;
  totalPages: number;
  pages = [];
  isCollapsed: boolean;
  columnSortChanged = false;
  sortedColumns: TableColumn[];
  perPage: number = 10;
  taskData = [];
  displayDetailsFlag: boolean = false;
  task: Object;
  loading: boolean = false;

  constructor(private dialog: MatDialog, private taskService: TaskService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.isCollapsed = false;
    this.setBusySpinner(this.taskService.GetTaskList(), 'task').subscribe(x => {
      console.log(x);
      this.taskData = x;
    });
  }

  get columnSchema(): TableColumn[] {
    if (this.columnSortChanged) {
      return this.sortedColumns;
    }
    return this.getTaskColumnSchema()
  }

  get getDataSet() {
    return this.taskData
  }

  onCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  openDialogue() {
    this.dialog.open(CreateNewTaskComponent, {
      panelClass: 'custom-dialog',
      width: '1000px',
    });
  }
  displayDetails(task){
    //this.task=task;
    // this.displayDetailsFlag = true;
    this.router.navigate(['tasks/details'],{state:task});
  }

  getTaskColumnSchema(): TableColumn[] {
    if (this.columnSortChanged) {
      return this.sortedColumns;
    }
    return [
      {
        name: 'description',
        displayName: 'Description',
        visibility: 'xs',
        customTemplate: true,
        // customTemplate: true,
        // sortDir: 'asc'
      },
      {
        name: 'priority',
        displayName: 'Priority',
        visibility: 'md',
        // customTemplate: true,
        // sortEnabled: false
      },
      {
        name: 'status',
        displayName: 'Status',
        visibility: 'md'
      },
      {
        name: 'lineOfBusiness',
        displayName: 'Line Of Business',
        visibility: 'md'
      },
      {
        name: 'assignedTo',
        displayName: 'Assigned To',
        visibility: 'md',
        customTemplate: true,
      },
      {
        name: 'requestorName',
        displayName: 'Requestor Name',
        visibility: 'md',
        customTemplate: true
      },
      {
        name: 'creationTime',
        displayName: 'Creation Date',
        visibility: 'md',
        sortDir: 'desc',
        pipe: new CustomDatePipe(),
        pipeArg2: true
      },
      {
        name: 'requestedCompletionDate',
        displayName: 'Requested Completion Date',
        visibility: 'md',
        pipe: new CustomDatePipe(),
        pipeArg2: true
      },
      {
        name: 'completionDate',
        displayName: 'Completion Date',
        visibility: 'xxl4',
        customTemplate: true
        // pipe: new CustomDatePipe(),
        // pipeArg2: true
      },
      {
        name: 'notesCount',
        displayName: 'Note',
        visibility: 'xxl4',
        // customTemplate: true
      }];
  }

  updateColumnSort(value: TableColumn[]) {
    this.columnSortChanged = true;
    this.sortedColumns = value;
  }

  applyFilter(filterObj: any) { }

  // displayDetails(task) {
  //   this.task = task;
  //   this.displayDetailsFlag = true;
  // }
  showLessClick() {
    this.perPage -= 10;
    this.loading = !this.loading;
  }

  showMoreClick() {
    this.perPage += 10;
    this.loading = !this.loading;
  }
}
