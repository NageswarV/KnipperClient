import { Component, OnDestroy, EventEmitter, Output, ViewChild, OnInit } from "@angular/core";
import { IMyOptions } from 'mydatepicker';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { UploadedReportFilterCriteria } from '../../report.model';

@Component({
  selector: "app-upload-report-filter",
  templateUrl: "./upload-report-filter.component.html",
  styleUrls: ["./upload-report-filter.component.scss"],
})
export class UploadReportFilterComponent implements OnInit {

  @Output() emitSearch: EventEmitter<UploadedReportFilterCriteria> = new EventEmitter<UploadedReportFilterCriteria>();
  myDatePickerOptions: IMyOptions;
  uploadedReportFilterCriteria: UploadedReportFilterCriteria;
  @ViewChild('accordian', { static: true }) accordian: NgbAccordion;

  constructor() {
    this.init(null);
  }

  ngOnInit() {
    this.initDatePicker();
  }

  init(uploadedReportFilterCriteria: UploadedReportFilterCriteria) {
    this.uploadedReportFilterCriteria = new UploadedReportFilterCriteria();
    this.setDefaultFilters();
  }

  setDefaultFilters() {
    this.uploadedReportFilterCriteria.firstName = "";
    this.uploadedReportFilterCriteria.lastName = "";
  }

  onSubmit() {
    this.emitSearch.emit(this.uploadedReportFilterCriteria);
  }

  resetFilter() {
    this.setDefaultFilters();
    this.onSubmit();
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