import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { SortEvent, TableColumn } from '../../../shared';
import { Address, ClassificationValue, DtrOrder, HandCarryDisbursement, HandCarrySignatureAudit, Rep } from '../../../../generated/service-client';
import { BusySpinner } from '../../../common/busy-spinner';
import { CustomDatePipe } from '../../../shared/custom-date.pipe';
import { HcpService } from '../../hcp.service';
import { HcpDialogComponent } from '../hcp-dialog/hcp-dialog.component';
import { MatDialog } from '@angular/material';
import { CreateNewTaskComponent } from '../../../shared/components/create-new-task/create-new-task.component';
import { Router } from '@angular/router';
import { CacheService } from '../../../../app/cache';

@Component({
  selector: 'hcp-data-table',
  templateUrl: './hcp-order-table.component.html',
  styleUrls: ['./hcp-order-table.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HcpOrderDataTableComponent extends BusySpinner implements OnInit {

  @Input() hcpDataSet: Rep;

  perPage: number = 10;
  dtrOrders: DtrOrder[] = [];
  dtpOrderCount = 0;
  selectedTab: string = 'dtp';
  loading: boolean = false;
  columnSortChanged = false;
  sortedColumns: TableColumn[];
  panelExpanded = false;
  addresses: Address[];
  codeOderStatus = "ORDER_STATUS";
  oderedStatusArray: ClassificationValue[];

  selectedHCButton = 'disbursement';
  disbursementsData: HandCarryDisbursement[] = [];
  signatureAuditsData: HandCarrySignatureAudit[] = [];

  get columnSchema(): TableColumn[] {
    if (this.columnSortChanged) {
      return this.sortedColumns;
    }

    if (this.selectedTab === 'dtp') {
      return this.getDTPColumnSchema();
    } else if (this.selectedTab === 'rep') {
      return this.getDTRColumnSchema();
    }
  }

  get getDataSet(): DtrOrder[] {
    if (this.selectedTab === 'dtp') {
      return this.hcpDataSet.dtpOrders;
    } else if (this.selectedTab === 'rep') {
      return this.dtrOrders;
    } else if (this.selectedTab === 'handCarry' && this.selectedHCButton === 'disbursement') {
      return this.disbursementsData;
    }
    else if (this.selectedTab === 'handCarry' && this.selectedHCButton === 'audit') {
      return this.signatureAuditsData;
    }
  }

  constructor(private hcpService: HcpService, public dialog: MatDialog, private router: Router, private cacheService: CacheService) {
    super();
  }

  ngOnInit() {
    this.dtpOrderCount = this.hcpDataSet.dtpOrders.length;
    this.cacheService.GetClassificationValuesByTypeCode(this.codeOderStatus).subscribe((result) => {
      this.oderedStatusArray = result;
    })
  }

  getDTPColumnSchema(): TableColumn[] {
    return [
      {
        name: 'id',
        displayName: 'Order ID',
        visibility: 'md',
        customTemplate: true,
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
        warningProp: ['On Hold', 'Pending Corrections', 'Exception'],
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
        sortFunc: this.customProgramNameSort,
        customTemplate: true
      },
      {
        name: 'salesRep',
        displayName: 'Sales Rep',
        visibility: 'md',
        sortFunc: this.customNameSort,
        customTemplate: true,
        // linkParam: 'id',
        // linkRoute: 'reps',
        // linkDisplay: 'id',
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
      visibility: 'xs',
      sortDir: 'asc',
      customTemplate: true
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
      visibility: 'xs',
      pipe: new CustomDatePipe(),
      pipeArg2: true
    },
    {
      name: 'orderType',
      displayName: 'Order Type',
      visibility: 'xs'
    },
    {
      name: 'rushFlag',
      displayName: 'Rush Order',
      visibility: 'xs',
      sortEnabled: false,
      customTemplate: true
    },
    {
      name: 'orderedByAddress',
      displayName: 'Ordered By',
      visibility: 'xs',
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

  getDisbursementColumnSchema(): TableColumn[] {
    if (this.columnSortChanged) {
      return this.sortedColumns;
    }
    return [{
      name: 'id',
      displayName: 'ID',
      visibility: 'xs',
      linkParam: 'id',
      linkRoute: 'handcarry/disbursement',
      linkDisplay: 'id',
      sortDir: 'asc',
      sortEnabled: false
    },
    {
      name: 'image',
      displayName: 'Img',
      visibility: 'xs',
      customTemplate: true,
      sortEnabled: false
    },
    {
      name: 'referenceNumber',
      displayName: 'Doc / Ref#',
      visibility: 'sm',
      sortEnabled: false
    },
    {
      name: 'disbursementDate',
      displayName: 'Date',
      visibility: 'sm',
      pipe: new CustomDatePipe(),
      pipeArg2: true,
      sortDir: 'desc'
    },
    {
      name: 'repId',
      displayName: 'Rep ID',
      visibility: 'md',
      sortEnabled: false
    },
    {
      name: 'repName',
      displayName: 'Rep Name',
      visibility: 'md',
      sortEnabled: false,
      customTemplate: true
    },
    {
      name: 'territoryName',
      displayName: 'Territory',
      visibility: 'md',
      customTemplate: true,
      sortEnabled: false
    },
    {
      name: 'status',
      displayName: 'Status',
      visibility: 'sm',
      waivedProp: ['Waived'],
      errorProp: ['Exception'],
      successProp: ['Success'],
      sortEnabled: false
    },
    {
      name: 'validForRecon',
      displayName: 'Valid For Recon',
      visibility: 'xxl4',
      customTemplate: true
    },
    {
      name: 'paperReferenceNumber',
      displayName: 'Paper Ref #',
      visibility: 'xxl4',
    },
      // {
      //   name: 'pacForm',
      //   displayName: 'PAC Form(s)',
      //   visibility: 'xxl4',
      //   // linkRoute: 'orders',
      //   // linkDisplay: 'id',
      // }
    ];
  }

  getSignatureColumnSchema(): TableColumn[] {
    if (this.columnSortChanged) {
      return this.sortedColumns;
    }
    return [{
      name: 'listName',
      displayName: 'Signature Audit List Name',
      visibility: 'xs',
      // linkParam: 'id',
      // linkRoute: 'orders',
      // linkDisplay: 'id',
      customTemplate: true,
      sortEnabled: false
    },
    {
      name: 'startDate',
      displayName: 'Audit Start Date',
      visibility: 'sm',
      pipe: new CustomDatePipe(),
      pipeArg2: true,
      sortDir: 'desc',
    },
    {
      name: 'endDate',
      displayName: 'Audit End Date',
      visibility: 'sm',
      pipe: new CustomDatePipe(),
      pipeArg2: true,
      sortEnabled: false
    },
    {
      name: 'auditType',
      displayName: 'Signature Audit Type',
      visibility: 'sm',
      sortEnabled: false
    },
    {
      name: 'auditReason',
      displayName: 'Audit Reason',
      visibility: 'md',
      sortEnabled: false
    },
    // {
    //   name: 'outboundSvlDocument',
    //   displayName: 'Outbound SVL Document',
    //   visibility: 'md',
    //   customTemplate: true,
    //   sortEnabled: false
    // },
    // {
    //   name: 'inboundSvlDocument',
    //   displayName: 'Inbound SVL Document',
    //   visibility: 'md',
    //   customTemplate: true,
    //   sortEnabled: false
    // },
    {
      name: 'employeeId',
      displayName: 'Employee ID',
      visibility: 'sm',
      customTemplate: true,
      sortEnabled: false
    },
    {
      name: 'employeeName',
      displayName: 'Employee Name',
      visibility: 'md',
      sortEnabled: false
    },
    {
      name: 'selectedTransactions',
      displayName: 'Selected Transaction Count',
      visibility: 'sm',
    },
    {
      name: 'totalTransactions',
      displayName: 'Total Transaction Count',
      visibility: 'sm',
    },
    {
      name: 'undeliverable',
      displayName: 'Undeliverable',
      visibility: 'xxl4',
    },
    {
      name: 'pending',
      displayName: 'Pending',
      visibility: 'xxl4',
    },
    {
      name: 'positiveResponses',
      displayName: 'Positive Responses',
      visibility: 'xxl4',
    },
    {
      name: 'neagtiveResponses',
      displayName: 'Negative Responses',
      visibility: 'xxl4',
    }];
  }

  updateColumnSort(value: TableColumn[]) {
    this.columnSortChanged = true;
    this.sortedColumns = value;
  }

  loadRepData() {
    this.setBusySpinner(this.hcpService.GetDtrOrdersByHcpId(this.hcpDataSet.id), 'rep').subscribe(x => {
      this.dtrOrders = x;
    });
  }
  loadAddressData() {
    this.setBusySpinner(this.hcpService.GetAdressByUser(this.hcpDataSet.id), 'address').subscribe(x => {
      this.addresses = x;
    });
  }

  loadHandCarryData() {
    this.setBusySpinner(this.hcpService.GetHandCarryDisbursementsByHcp(this.hcpDataSet.id), 'rep').subscribe(response => {
      this.disbursementsData = response;
    });
    this.setBusySpinner(this.hcpService.GetHandCarrySignatureAuditsByHcp(this.hcpDataSet.id), 'rep').subscribe(response => {
      this.signatureAuditsData = response
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
    if (value === this.selectedTab) return;
    this.columnSortChanged = false;
    this.perPage = 10;
    if (value === 'rep') {
      this.loadRepData();
    } else if (value === 'handCarry') {
      this.loadHandCarryData();
    }
    if (value == 'address') {
      this.loadAddressData();
    }
    this.selectedTab = value;
  }

  selectedButton(button) {
    this.columnSortChanged = false;
    this.selectedHCButton = button
  }

  openDialog(item) {
    let dataToShow;
    this.hcpService.GetCommunicationsyOrderId(item.id).subscribe((result) => {
      dataToShow = result;
      const dialogRef = this.dialog.open(HcpDialogComponent, {
        panelClass: 'custom-dialog',
        width: '1000px',
        data: { show: dataToShow, orderId: item.id, orderReceivedDate: item.orderDate, status: item.status }
      });
    });
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

  goToRepPage(data, tabName: string) {
    let filterObj = {}
    if (tabName == 'dtpOrder') {
      filterObj = { firstName: data.repFirstName, lastName: data.repLastName }
    } else {
      filterObj = { firstName: data.rep.firstName, lastName: data.rep.lastName }
    }
    this.router.navigate(['/reps'], { state: filterObj })
  }
}
