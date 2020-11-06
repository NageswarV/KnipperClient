import { Component, OnInit, ViewChild, ChangeDetectorRef, OnChanges, SimpleChanges, Input, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { RepService } from '../rep.service';
import { BusySpinner } from '../../common/busy-spinner';
import { IGridColumns } from '../../shared/grid.component';
import { Rep } from '../../../generated/service-client';
import { SalesFilterCriteria } from '../rep.model';
import { CreateNewTaskComponent } from '../../shared/components/create-new-task/create-new-task.component';


@Component({
  selector: 'app-rep-push-shipment-list',
  templateUrl: './rep-push-shipment-list.component.html',
  styleUrls: ['./rep-push-shipment-list.component.scss']
})
export class RepPushShipmentListComponent extends BusySpinner implements OnInit, OnChanges, AfterViewInit {

  reps: Rep[] = [];
  repsPerPage: Rep[] = [];
  totalRecordCount: number;
  pageSize = 3;
  currentPage = 1;
  columns: IGridColumns[];
  perPage = 10;
  pageDisplay: string;
  startCount = 0;
  endCount = 0;
  pageNum = 1;
  totalCount = 0;
  currentList: Rep[] = [];
  @Input() filterObj: { filter: SalesFilterCriteria, isReset: boolean };
  @Input() sortingType: string;
  @Output() emitFilter: EventEmitter<object> = new EventEmitter();

  constructor(private repService: RepService, private cdr: ChangeDetectorRef, public dialog: MatDialog) {
    super();
    this.columns = [
      { title: 'Order #', classes: 'col-xs-2' },
      { title: 'Order Status', classes: 'col-xs-2' },
      { title: 'Order Date', classes: 'col-xs-1' },
      { title: 'Order Type', classes: 'col-xs-1' },
      { title: 'Rush Order', classes: 'col-xs-1' },
      { title: 'Order By', classes: 'col-xs-3' },
      { title: 'Ship To', classes: 'col-xs-4' },
    ];
  }

  ngOnInit() {
  }

  pageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.repsPerPage = this.reps.slice(this.currentPage == 1 ? 0 : (this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'filterObj': {
            let externalFilter = { filter: window.history.state || new SalesFilterCriteria(), isReset: false };
            this.getRepPushShipmenst(changes.filterObj.currentValue ? changes.filterObj.currentValue : externalFilter)
          }
        }
      }
    }
    this.sortReps();
  }

  ngAfterViewInit() {
    if (this.filterObj == undefined) {
      let object = window.history.state
      delete object["navigationId"]
      this.emitFilter.emit(object)
    }
  }

  getRepPushShipmenst(filterObjList?: any) {
    this.setBusySpinner(this.repService.GetRepPushShipments()).subscribe(response => {
      if ((filterObjList && filterObjList.isReset) || filterObjList == undefined || Object.values(filterObjList.filter).every(x => (x === null || x === ''))) {
        this.reps = response;
      } else {
        this.reps = this.getFilteredData(response, filterObjList.filter);
      }
      this.totalRecordCount = this.reps.length;
      this.currentPage = 1
      this.repsPerPage = this.reps.slice(0, this.pageSize);
      this.sortReps();
    })
  }

  getFilteredData(repList: Rep[], filter: SalesFilterCriteria) {
    return repList.filter(item => {
      let data = Object.keys(filter).map(key => {
        return key != 'navigationId' && filter[key] && item[key].toLowerCase().includes(filter[key].toLowerCase())
      });
      if (data.includes(true)) {
        return item
      }
    });
  }
  openCreateTaskDialog() {
    this.dialog.open(CreateNewTaskComponent, {
      panelClass: 'custom-dialog',
      width: '1000px',
    });
  }
  sortReps() {
    if (this.sortingType == 'asc') {
      this.reps.sort((a, b) => (a.firstName.toLowerCase() > b.firstName.toLowerCase()) ? 1 : (a.firstName.toLowerCase() === b.firstName.toLowerCase()) ? ((a.lastName.toLowerCase() > b.lastName.toLowerCase()) ? 1 : -1) : -1)
    } else {
      this.reps.sort((a, b) => (a.firstName.toLowerCase() < b.firstName.toLowerCase()) ? 1 : (a.firstName.toLowerCase() === b.firstName.toLowerCase()) ? ((a.lastName.toLowerCase() < b.lastName.toLocaleLowerCase()) ? 1 : -1) : -1)
    }
    this.totalRecordCount = this.reps.length;
    this.currentPage = 1
    this.repsPerPage = this.reps.slice(0, this.pageSize); 
  }
}
