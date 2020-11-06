import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { IGridColumns } from './../../../shared/grid.component';

@Component({
  selector: 'app-upload-reports',
  templateUrl: './upload-reports.component.html',
  styleUrls: ['./upload-reports.component.scss']
})
export class UploadReportsComponent implements OnInit {
  columnsOut:IGridColumns[];
  reportsPerPage:File[];
  collection:File[]=[];
  fileToUpload:File = null;
  currentPage=1;
  fromReport=true;
  pageSize = 3;
  reportsToDisplay: Array<ReportStructure>= new Array<ReportStructure>();
  reportsCount=0;
  constructor(public dialogRef: MatDialogRef<UploadReportsComponent>,public dialog:MatDialog) {
    this.columnsOut = [
      { title: 'Upload Report', classes: 'col-xs-4 str' },
      { title: 'Select Report Type', classes: 'col-xs-4 str' },
      { title: 'Report Name', classes: 'col-xs-4 str' }
      
    ]
   }
   clearUploads(){
    // this.reportsPerPage.length=0;
    this.collection.length=0;
    this.reportsToDisplay.length=0;
   }
   
  ngOnInit() {
  }
  paginate(pageNo){
    this.currentPage=pageNo;
  }
  disableDilog(){
    this.clearUploads();
    this.dialogRef.close();
  }
  // addReportsToArray(files:FileList) {
  //      this.collection.push(files.item(0));
  //    this.reportsPerPage=this.collection.slice(0,this.collection.length > this.pageSize ? this.pageSize:this.collection.length);
  //    this.reportsToDisplay[this.reportsCount++].file=files.item(0);
  //   }
    addReportsToPage(){
      console.log(this.reportsToDisplay);
      this.reportsToDisplay[this.reportsToDisplay.length]=new ReportStructure();
      this.reportsToDisplay[this.reportsToDisplay.length-1].index=1;
      this.reportsToDisplay[this.reportsToDisplay.length-1].file="Example File.pdf"
     
    }
}
export class ReportStructure{
  public file:string;
  public index:number;
}
