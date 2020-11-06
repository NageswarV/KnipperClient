import { Component, OnInit, Output } from '@angular/core';
import { BusySpinner } from './../../../common/busy-spinner';
import { Report } from './../../../../generated/service-client';
import { IGridColumns } from './../../../shared/grid.component';
import { ReportService } from './../../report.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material';
import { UploadReportsComponent } from '../upload-reports/upload-reports.component';

@Component({
  selector: 'app-uploaded-report-list',
  templateUrl: './uploaded-report-list.component.html',
  styleUrls: ['./uploaded-report-list.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class UploadedReportListComponent extends BusySpinner implements OnInit {

   pageSize = 10;
  currentPage = 1;
  columns: IGridColumns[];
  collection:Report[];
  reportsPerPage:Report[];
  totalRecordCount:number;
  fromReport:boolean=true;
  totalPages:number;
  isDisabled:boolean;
  pages=[];
  reportToExport:string;
  constructor(public reportService: ReportService,public dialog:MatDialog,config: NgbModalConfig, private modalService: NgbModal) {
    super();
    this.columns = [
      { title: 'Report Name' },
      {title: 'Report Type'  },
      { title: 'Report Category' },
      { title: 'Date and Time of Export' },
      { title: 'Report Format' },
      {title: 'Uploaded By'}
    ];
  }

  ngOnInit() {
    this.setBusySpinner(this.reportService.GetGeneratedReports(),"Reports").subscribe(report=>{this.collection=report;
      console.log(this.collection);
      this.totalRecordCount=this.collection.length;
      this.reportsPerPage=this.collection.slice(0,this.pageSize);
      for(let i=1;i<=Math.ceil(this.totalRecordCount/this.pageSize);i++){
        this.pages.push(i);
    }
      for(let report of this.reportsPerPage){
        report["format"]=report.attachment.slice(report.attachment.indexOf('.')+1);
        // report["exportDate"]=report.uploadedOn.toLocaleDateString()+" at "+report.uploadedOn.toLocaleTimeString()+" "+report.uploadedOn.toUTCString().slice(-3);
      }
    });
    
  }
  paginate(pageNumber: number): void {
    this.currentPage = pageNumber;
     this.onSubmit({ }, true);
   
  }
  onSubmit(filterObj: any, isPagination?: boolean): void {
    if (filterObj.isFilterChanged === true || isPagination === true) {
      if (!isPagination) {
        this.currentPage = 1;
      };
      
      var remainingItemsCount = this.totalRecordCount - ((this.currentPage-1) * this.pageSize);
      var itemsToLoad = remainingItemsCount > this.pageSize ? this.pageSize : remainingItemsCount;

      this.reportsPerPage = this.collection.slice((this.currentPage-1) * this.pageSize, itemsToLoad+((this.currentPage-1) * this.pageSize));
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(UploadReportsComponent, {
      panelClass: 'custom-dialog'
      //data: {show:dataToShow}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }
  setReportPath(type){
    if(type === 'Open AOC Report'){
      this.reportToExport="resources/sample_reports/MasterActivityReport.xlsx"
    }
    else{
      this.reportToExport="resources/sample_reports/ReturnsReport.xlsx"
    }
  }
}
