import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGridColumns } from './../../../shared/grid.component';
import { ReportService } from '../../report.service';
import { BusySpinner } from './../../../common/busy-spinner';
import {AocReportDto, InventoryShippedByItemReportDto } from './../../../../generated/service-client';
import { IMyOptions } from 'mydatepicker';
import { count } from 'console';



@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent extends BusySpinner implements OnInit {
  columns:IGridColumns[];
  collection:any[];
  columnkeys:any[]
  currentPage=1;
  pageSize=20;
  generateReportFlag=false;
  totalRecordCount:number;
  myDatePickerOptions: IMyOptions;
   reportDetails:string;
   navigationBreadCrumb="/reports/generated";
  @Output() showListevent:EventEmitter<string>=new EventEmitter<string>();
  constructor(private reportService:ReportService) {
    super();
    this.initDatePicker();
   }

  ngOnInit() {
    this.reportDetails = history.state.text;
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
  generateReport(){
    this.prepareDataSet();
    this.generateReportFlag=true;
  }
  parseData(data):any[]{
    return data.map(object=>{
      for(let key of this.columnkeys){
        if(object[key] instanceof Date){
          object[key] = object[key].toLocaleDateString();
        }
      }
      return object;
    })
  }
  prepareDataSet(){
    if(this.reportDetails !== "Open AOC Report"){
    this.setBusySpinner(this.reportService.getInventoryShippedByItemReport()).subscribe(report=>{this.collection=report;
      this.totalRecordCount=this.collection.length;
      console.log(this.collection)
      this.columnkeys=Object.keys(this.collection[0]);
      this.collection=this.parseData(this.collection);
      this.columns=Object.keys(this.collection[0])
      .map(column=>{
        return column.charAt(0).toUpperCase()+column.slice(1);})
        .map(column => {return {title:column}})
    });
  }
  else{
    this.setBusySpinner(this.reportService.getAOCReportDetails()).subscribe(report=>{this.collection=report;
      this.totalRecordCount=this.collection.length;
      this.columnkeys=Object.keys(this.collection[0]);
      this.collection=this.parseData(this.collection);
      this.columns=Object.keys(this.collection[0])
      .map(column=>{
        return column.charAt(0).toUpperCase()+column.slice(1);})
      .map(column => {return {title:column}})
    });
  }
}
goToList(){
  this.showListevent.emit("list");
}
}
