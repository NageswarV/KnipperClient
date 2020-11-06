import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';

import { IGridColumns } from '../../../shared/grid.component';
import { DtpOrder, DtrOrder, HandCarryDisbursement, Product, Rep } from '../../../../generated/service-client';
import { BusySpinner } from '../../../common/busy-spinner';
import { SortEvent, TableColumn } from '../../../shared';
import { CustomDatePipe } from '../../../shared/custom-date.pipe';
import { MatDialog } from '@angular/material';
import { CreateNewTaskComponent } from '../../../shared/components/create-new-task/create-new-task.component';
import { Router } from '@angular/router';
import { HcpDialogComponent } from './../../../hcp/hcp-order-list/hcp-dialog/hcp-dialog.component';

@Component({
  selector: 'app-products-data-table',
  templateUrl: './product-data-table.component.html',
  styleUrls: ['./product-data-table.component.scss']
})
export class ProductsDataTableComponent extends BusySpinner implements OnInit {
  @Input() productDataSet: Product;

  perPage: number = 10;
  dtrOrders: DtrOrder[] = [];
  dtpOrders: DtpOrder[] = [];
  dtpOrderCount = 0;
  selectedTab: string = 'dtp';
  loading: boolean = false;
  columnSortChanged = false;
  sortedColumns: TableColumn[];
  panelExpanded = false;
  hcDataSet = [];


  get columnSchema(): TableColumn[] {
    if (this.columnSortChanged) {
      return this.sortedColumns;
    }

    if (this.selectedTab === 'dtp') {
      return this.getDTPColumnSchema();
    } else if (this.selectedTab === 'rep') {
      return this.getDTRColumnSchema();
    } else if (this.selectedTab === 'hc') {
      return this.getHcColumnSchema();
    }
  }

  get getDataSet() {
    if (this.selectedTab === 'dtp') {
      return this.dtpOrders;
    } else if (this.selectedTab === 'rep') {
      return this.dtrOrders;
    } else if (this.selectedTab === 'hc') {
      return this.hcDataSet;
    }
  }

  constructor(private productService: ProductService, public dialog: MatDialog, private router: Router) {
    super();
  }

  ngOnInit() {
    // if (this.productDataSet) {
      this.changeTabs('dtp');
    // }
  }

  getDTPColumnSchema(): TableColumn[] {
    return [
      {
        name: 'id',
        displayName: 'Order ID',
        visibility: 'md',
        customTemplate:true,
        sortDir: 'asc'
      },
      {
        name: 'shipToAddress',
        displayName: 'Ship to Address',
        visibility: 'md',
        customTemplate: true,
        sortEnabled: false
      },
      {
        name: 'orderDate',
        displayName: 'Order Received Date',
        visibility: 'md',
        pipe: new CustomDatePipe(),
        pipeArg2: true
      },
      {
        name: 'status',
        displayName: 'Order Status',
        visibility: 'md',
        warningProp: ['On Hold', 'Pending Corrections'],
        errorProp: ['Canceled', 'Lost In Transit', 'Lost In Transit - Partial', 'Rejected']
      },
      {
        name: 'orderSource',
        displayName: 'Order Source',
        visibility: 'md'
      },
      {
        name: 'programName',
        displayName: 'Program',
        visibility: 'md',
        customTemplate: true,
        sortFunc: this.customProgramNameSort
      },
      {
        name: 'salesRep',
        displayName: 'Sales Rep',
        visibility: 'md',
        customTemplate: true,
        sortFunc: this.customNameSort
      },
      {
        name: 'repId',
        displayName: 'Rep ID',
        visibility: 'xxl4'
      },
      {
        name: 'repTerritory',
        displayName: 'Territory Code',
        visibility: 'xxl4'
      },
      {
        name: 'communicationLabel',
        displayName: 'Communication(s)',
        visibility: 'xxl4',
        customTemplate: true
      }];
  }

  getDTRColumnSchema(): TableColumn[] {
    return [{
      name: 'id',
      displayName: 'Order #',
      visibility: 'md',
      linkParam: 'id',
      customTemplate: true,
      sortDir: 'asc'
    },
    {
      name: 'status',
      displayName: 'Order Status',
      visibility: 'md',
      warningProp: ['Pending Approval'],
      errorProp: ['Canceled']
    },
    {
      name: 'orderDate',
      displayName: 'Order Received Date',
      visibility: 'md',
      pipe: new CustomDatePipe(),
      pipeArg2: true
    },
    {
      name: 'orderType',
      displayName: 'Order Type',
      visibility: 'md'
    },
    {
      name: 'rushFlag',
      displayName: 'Rush Order',
      visibility: 'md',
      sortEnabled: false,
      customTemplate: true
    },
    {
      name: 'orderedByAddress',
      displayName: 'Ordered By',
      visibility: 'md',
      sortEnabled: false,
      customTemplate: true
    },
    {
      name: 'shipToAddress',
      displayName: 'Ship to Address',
      visibility: 'xs',
      customTemplate: true,
      sortEnabled: false
    }];
  }

  getHcColumnSchema(): TableColumn[] {
    return [{
      name: 'id',
      displayName: 'ID',
      visibility: 'md',
      sortDir: 'asc',
      customTemplate: true
    },
    {
      name: 'image',
      displayName: 'Img',
      visibility: 'md',
      customTemplate: true,
      sortEnabled: false
    },
    {
      name: 'transactionType',
      displayName: 'Type',
      visibility: 'md'
    },
    {
      name: 'referenceNumber',
      displayName: 'Doc /Ref #',
      visibility: 'md'
    },
    {
      name: 'transactionDate',
      displayName: 'Date',
      visibility: 'md',
      pipe: new CustomDatePipe(),
      pipeArg2: true
    },
    {
      name: 'status',
      displayName: 'Status',
      visibility: 'md',
      errorProp: ['Exception'],
      successProp: ['Success']
    },
    {
      name: 'validForRecon',
      displayName: 'Valid for Recon ?',
      visibility: 'md',
      customTemplate: true,
      sortEnabled: false,
    },
    {
      name: 'paperReferenceNumber',
      displayName: 'Paper Ref #',
      visibility: 'md'
    }];
  }

  updateColumnSort(value: TableColumn[]) {
    this.columnSortChanged = true;
    this.sortedColumns = value;
  }

  
  loadHcpData() {
    this.setBusySpinner(this.productService.GetRelatedDtpOrdersByProductId(this.productDataSet.id)).subscribe(x => {
      this.dtpOrders = x;
      this.dtpOrderCount = this.dtpOrders.length;
    });
  }

  loadRepData() {
    this.setBusySpinner(this.productService.GetRelatedDtrOrdersByProductId(this.productDataSet.id)).subscribe(x => {
      this.dtrOrders = x;
    });
  }

  loadHcData() {
    this.setBusySpinner(this.productService.GetRelatedHandCarryTransactionsByProductId(this.productDataSet.id)).subscribe(x => {
      this.hcDataSet = x;
    });
  }

  loadTableData() {
    this.panelExpanded = true;
  }

  hideTableData() {
    this.panelExpanded = false;
  }

  showLessClick() {
    this.perPage -= 10;
    this.loading = !this.loading;
  }

  showMoreClick() {
    this.perPage += 10;
    this.loading = !this.loading;
  }

  changeTabs(value) {
    // if (value === this.selectedTab) return;
    this.columnSortChanged = false;
    this.perPage = 10;
    if (value === 'dtp') {
      this.loadHcpData();
    }
    if (value === 'rep') {
      this.loadRepData();
    }
    if (value === 'hc') {
      this.loadHcData();
    }
    this.selectedTab = value;
  }

  customNameSort(a, b, event?: SortEvent): number {
    let result = a.repFirstName.localeCompare(b.repFirstName);
    if (result === 0) {
      result = a.repLastName.localeCompare(b.repLastName);
    }
    return (event.sortDir === 'asc' ? result : -result);
  }

  customProgramNameSort(a, b, event?: SortEvent): number {
    let result = 0;
    if (!a.programId) {
      result = 1;
    }
    else if (!b.programId) {
      result = -1;
    } else {
      result = a.programId.localeCompare(b.programId);
    }
    return (event.sortDir === 'asc' ? result : -result);
  }
  openCreateTaskDialog() {
    this.dialog.open(CreateNewTaskComponent, {
      panelClass: 'custom-dialog',
      width: '1000px',
    });
  }

  goToRepPage(data) {
    let filterObj = { firstName: data.repFirstName, lastName: data.repLastName }
    this.router.navigate(['/reps'], { state: filterObj })
  }
  openDialog(item) {
    let dataToShow;
    this.productService.GetCommunicationsyOrderId(item.id).subscribe((result) => {
      dataToShow = result;
      console.log(dataToShow)
      const dialogRef = this.dialog.open(HcpDialogComponent, {
        panelClass: 'custom-dialog',
        width:'1000px',
        data: { show: dataToShow, orderId: item.id, orderReceivedDate: item.orderDate, status: item.status  }
      });
    });
  }
}
