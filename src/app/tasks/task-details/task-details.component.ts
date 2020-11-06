import { Component, Input, OnInit } from '@angular/core';
import { IMyOptions } from 'mydatepicker';
import { IGridColumns } from './../../shared/grid.component';
import { AuthenticationService } from './../../authentication';
import { TaskService } from '../tasks.service';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from './../../../generated/service-client';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  task:any;
  priority: string='low';
  date: Date= new Date();
  myDatePickerOptions: IMyOptions;
  notes=[];
  columns:IGridColumns[];
  currentPage=1;
  pageSize=2;
  loadMorePagination=true;
  RequestCompletionDate:string;
  navigationBreadCrumb:string="/tasks"
  myform:FormGroup;
  myGroup:FormGroup;
  users:User[];
  constructor(private authenticationService: AuthenticationService, private taskService:TaskService) {
    this.myGroup = new FormGroup({
      reqDate: new FormControl()
   });
    this.columns=[
      { title:"Descriprion" },
      { title: "Logged Date" },
      { title: "Notes Owner" }]
   }

  ngOnInit() {
    this.task = history.state;
    this.taskService.getTaskById(this.task.id).subscribe(task=>{this.task=task;
    this.notes=this.task.taskNotes;
    console.log(this.notes)
    })
    this.priority = this.task.priority;
    this.initDatePicker();
    this.getUsers();
  }
  priorityLow(){
    this.priority='Low';
  }
  priorityMedium(){
    this.priority='Medium'
  }
  priorityHigh(){
    console.log(this.task);
    this.priority='High'
  }
  initDatePicker() {
    this.myDatePickerOptions = {
        dateFormat: 'dd.mm.yyyy',
        firstDayOfWeek: "su",
        selectionTxtFontSize: '15px',
        showClearDateBtn: true,
        editableDateField: false,
        inline: false,
        height: '45px'
    };
  }
  setDate(): void {
    this.myform.setValue({
            reqDate: {
                    date: {
                            year: this.task.requestCompletionDate.getFullYear(),
                            month: this.task.requestCompletionDate.getMonth() + 1,
                            day: this.task.requestCompletionDate.getDate()
                    }
            }
    });
}
getUsers(){
  this.taskService.getUsers().subscribe(users=>this.users=users);
}
}
