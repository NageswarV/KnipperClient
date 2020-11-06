import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'mydatepicker';
import { TaskService } from './../../../tasks/tasks.service';
import { AuthenticationService } from '../../../authentication/index';
import { User } from './../../../../generated/service-client';

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.scss']
})
export class CreateNewTaskComponent implements OnInit {
  priority: string='low';
  date: Date= new Date();
  myDatePickerOptions: IMyOptions;
  users:User[];
  constructor(private authenticationService: AuthenticationService,private taskService:TaskService) { }

  ngOnInit() {
    this.initDatePicker();
    this.getUsers();
  }
  priorityLow(){
    this.priority='low';
  }
  priorityMedium(){
    this.priority='medium'
  }
  priorityHigh(){
    this.priority='high'
  }
  initDatePicker() {
    this.myDatePickerOptions = {
        dateFormat: 'mm/dd/yyyy',
        firstDayOfWeek: "su",
        selectionTxtFontSize: '15px',
        showClearDateBtn: true,
        editableDateField: false,
        inline: false,
        height: '45px'
    };
}
getUsers(){
  this.taskService.getUsers().subscribe(users=>this.users=users);
}
}
