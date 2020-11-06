import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Report } from '../../../../generated/service-client';
import { IGridColumns } from '../../../shared/grid.component';
import { ReportService } from '../../report.service';
import { BusySpinner } from '../../../common/busy-spinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-generate-reports-list',
  templateUrl: './generate-reports-list.component.html',
  styleUrls: ['./generate-reports-list.component.scss']
})
export class GenerateReportsListComponent extends BusySpinner implements OnInit {

  pageSize = 10;
  currentPage = 1;
  columns: IGridColumns[];
  collection:Report[];
  reportsPerPage:Report[];
  totalRecordCount:number;
  fromReport:boolean=true;
  totalPages:number;
  pages=[];
  @Output() reportDetailsEvent: EventEmitter<string>=new EventEmitter<string>();
  constructor(public reportService: ReportService, private router:Router) {
    super();
    this.columns = [
      { title: 'Report Name', classes: 'col-xs-2' },
      { title: 'Report Description', classes: 'col-xs-3' },
      { title: 'Line Of Business', classes: 'col-xs-2' },
      { title: 'Category', classes: 'col-xs-2' }
    ];
  }

  ngOnInit() {
    this.setBusySpinner(this.reportService.GetReportDefinitions(),"Reports").subscribe(report=>{this.collection=report;
      this.totalRecordCount=this.collection.length;
      this.reportsPerPage=this.collection.slice(0,this.pageSize);
      this.totalPages=Math.ceil(this.totalRecordCount/this.pageSize);
      for(let i=1;i<=Math.ceil(this.totalRecordCount/this.pageSize);i++){
        this.pages.push(i);
    }
    });
    
  }
  paginate(pageNumber: number){
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
  displayDetails(event){
    // console.log(event);
    this.router.navigate(['reports/generated/InventoryReturnReceipt'],{state:{text:event.srcElement.innerText}})
    //this.reportDetailsEvent.emit(event.srcElement.innerText);
  }

}
