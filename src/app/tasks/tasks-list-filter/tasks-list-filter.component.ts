import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { IMyOptions } from 'mydatepicker';
import { CacheService } from '../../cache/cache.service';
import { TaskFilterCriteria } from '../task.model';

@Component({
  selector: 'sg-tasks-list-filter',
  templateUrl: './tasks-list-filter.component.html',
  styleUrls: ['./tasks-list-filter.component.scss']
})
export class TasksListFilterComponent implements OnInit {
  @Output() emitTaskSearch: EventEmitter<{ filter: TaskFilterCriteria, isReset: boolean }> = new EventEmitter<{ filter: TaskFilterCriteria, isReset: boolean }>();
  myDatePickerOptions: IMyOptions;
  stateOptions = []

  taskFilterCriteria: TaskFilterCriteria;
  @ViewChild('accordian', { static: true }) accordian: NgbAccordion;

  constructor(private cacheService: CacheService) {
    this.init(null);
  }

  ngOnInit() {
    this.initDatePicker();
    this.stateOptions = this.cacheService.stateCache;
  }

  init(taskFilterCriteria: TaskFilterCriteria) {
    //get and fill initial data if any
    this.taskFilterCriteria = new TaskFilterCriteria();
    this.taskFilterCriteria.status = '';
    this.taskFilterCriteria.priority = '';
  }

  onSubmit(reset?: boolean) {
    this.emitTaskSearch.emit({ filter: this.taskFilterCriteria, isReset: reset || false });
  }

  resetFilter() {
    this.taskFilterCriteria.status = '';
    this.taskFilterCriteria.priority = '';
    this.onSubmit(true);
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

}
