import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Communication } from '../../../../generated/service-client';

import { MatTableDataSource} from '@angular/material';
import { IGridColumns } from '../../../../app/shared/grid.component';
import { RecipeintDialogComponent } from '../recipeint-dialog/recipeint-dialog.component';
@Component({
  selector: 'app-hcp-dialog',
  templateUrl: './hcp-dialog.component.html',
  styleUrls: ['./hcp-dialog.component.scss']
})
export class HcpDialogComponent implements OnInit {
  columnsOut: IGridColumns[];
  columnsIn: IGridColumns[];
  // collection;
  obj;
  pageSize = 10;
  currentPage = 1;
  // columns: IGridColumns[];
  collection:Communication[];
  collectionIn:Communication[];
  collectionOut:Communication[];
  reportsPerPageIn:Communication[];
  reportsPerPageOut:Communication[];
  totalRecordCountOut:number;
  totalRecordCountIn:number;
  fromReport:boolean=true;
  totalPagesIn:number;
  totalPagesOut:number;

  constructor(public dialogRef: MatDialogRef<HcpDialogComponent>,public dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Communication[]) {
      this.columnsOut = [
        { title: 'Attachment Type', classes: 'col-xs-1 pl-2' },
        { title: 'OutBound DocumentName', classes: 'col-xs-7' },
        { title: 'Action', classes: 'col-xs-3' }
        
      ];
      this.columnsIn = [
       
        { title: 'InBound DocumentName', classes: 'col-xs-6' },
        { title: 'Action', classes: 'col-xs-4' }
      ];
    }
  
  ngOnInit() {
    this.obj=(this.data);
    this.collection=this.obj.show;
   this.collectionOut = this.collection.filter(collection => collection.direction == "Out");
   this.collectionIn = this.collection.filter(collection => collection.direction == "In");
    this.totalRecordCountOut=this.collectionOut.length;
    this.totalRecordCountIn=this.collectionIn.length;
    this.reportsPerPageIn=this.collectionIn.slice(0,this.pageSize);
    this.reportsPerPageOut=this.collectionOut.slice(0,this.pageSize);
    this.totalPagesIn=Math.ceil(this.totalRecordCountIn/this.pageSize);
    this.totalPagesOut=Math.ceil(this.totalRecordCountOut/this.pageSize);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  // send(){
    
  // }
  openDialog(comm){

    const dialogRef = this.dialog.open(RecipeintDialogComponent, {
      panelClass: 'custom-dialog',
      width:'1000px',
      data: {data:comm}
    });

  }
  close(){
    this.dialogRef.close();
  }

}
