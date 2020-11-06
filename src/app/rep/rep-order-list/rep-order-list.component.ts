import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IGridColumns } from '../../shared/grid.component';
import { DtrOrder, Rep, HandCarryInventory, HandCarryTransactionSummaryDto, Address, HandCarrySignatureAudit, HandCarryReconciliation, Reconciliation } from '../../../generated/service-client';
import { BusySpinner } from '../../common/busy-spinner';
import { RepService } from '../rep.service';
import { MatDialog } from '@angular/material';
import { RepTerritoryHistoryComponent } from '../rep-territory-history/rep-territory-history.component';
import { SalesFilterCriteria } from '../rep.model';
import { ActivatedRoute } from '@angular/router';
import { TableColumn } from '../../shared';
import { CustomDatePipe } from '../../shared/custom-date.pipe';
import { CreateNewTaskComponent } from '../../shared/components/create-new-task/create-new-task.component';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { HcpDialogComponent } from '../../hcp/hcp-order-list/hcp-dialog/hcp-dialog.component';
import { CacheService } from './../../..../../cache';


type RepActivity = {
  Rep: Rep;
  DtrOrders: DtrOrder[];
  HandCarryTransactions: HandCarryTransactionSummaryDto[];
  HandCarryInventoryData: HandCarryInventory[];
  // HandCarryReconciliationData: HandCarryInventory[]
}

@Component({
  selector: 'app-rep-order-list',
  templateUrl: './rep-order-list.component.html',
  styleUrls: ['./rep-order-list.component.scss']
})

export class RepOrderListComponent extends BusySpinner implements OnInit, OnChanges, AfterViewInit {
  perPage: number = 10;
  loading: boolean = false;
  columnSortChanged = false;
  sortedColumns: TableColumn[];
  reps: Rep[] = [];
  totalRecordCount: number;
  pageSize = 3;
  currentPage = 1;
  dtpcolumns: IGridColumns[];
  dtrcolumns: IGridColumns[];
  handCarryTransactions: IGridColumns[] = [];
  handCarryReconcilation: IGridColumns[];
  handCarryInventory;
  repsActivities: RepActivity[] = [];
  repsActivitiesPerPage: RepActivity[] = [];
  oderedStatusArray;
  codeOderStatus = "ORDER_STATUS";
  addresses: Address[] = []
  handCarrySignatureData: HandCarrySignatureAudit[] = [];
  HandCarryReconciliationData: Reconciliation[]= [];

  get columnSchema(): TableColumn[] {
    return this.getDTPColumnSchema();
  }
  get columnSchemSignature(): TableColumn[] {
    return this.getHandCarrySignatureColumnSchema();
  }

  getDTPColumnSchema(): TableColumn[] {
    return [
      {
        name: 'territoryId',
        displayName: 'Territory Code',
        visibility: 'md',
        customTemplate: true,
        sortDir: 'asc'
      },
      {
        name: 'reportedDate',
        displayName: 'Inventroy Reported Date',
        visibility: 'md',
        pipe: new CustomDatePipe(),
        pipeArg2: true
      },
      {
        name: 'productId',
        displayName: 'Product Name (Product ID)',
        visibility: 'md',
        customTemplate: true,
        sortDir: 'asc'
      },
      {
        name: 'lotNumber',
        displayName: 'Lot#',
        visibility: 'md',
        customTemplate: true,
        sortDir: 'asc'
      },
      {
        name: 'lotExpiryDate',
        displayName: 'Lot# Expire Date',
        visibility: 'md',
        pipe: new CustomDatePipe(),
        pipeArg2: true
      },
      {
        name: 'transferIn',
        displayName: 'Days to Expire/Expired',
        visibility: 'md',
        customTemplate: true,
      },
      {
        name: 'totalInventory',
        displayName: 'Total Inventory',
        visibility: 'md',
        customTemplate: true,
      },
      {
        name: 'disbursements',
        displayName: 'Disbursements',
        visibility: 'md',
        customTemplate: true,
      },
      {
        name: 'shipments',
        displayName: 'Shipment',
        visibility: 'md',
        customTemplate: true,
      },
      {
        name: 'returnAcknowledgements',
        displayName: 'Shipment Acnowledgement(s)',
        visibility: 'xxl4',
        customTemplate: true
      },
      {
        name: 'transferOut',
        displayName: 'Transfer Out',
        visibility: 'xxl4',
        customTemplate: true
      },
      {
        name: 'transferIn',
        displayName: 'Transfer In',
        visibility: 'xxl4',
        customTemplate: true
      },
      {
        name: 'returns',
        displayName: 'Returns(Field Rerurns)',
        visibility: 'xxl4',
        customTemplate: true
      },
      {
        name: 'returnAcknowledgements',
        displayName: 'Return Acknowledgements(Corp.Returns):',
        visibility: 'xxl4',
        customTemplate: true
      },
      {
        name: 'thefts',
        displayName: 'Thefts',
        visibility: 'xxl4',
        customTemplate: true
      },
      {
        name: 'losses',
        displayName: 'Losses',
        visibility: 'xxl4',
        customTemplate: true
      },
      {
        name: 'adjustments',
        displayName: 'Adjustments',
        visibility: 'xxl4',
        customTemplate: true
      },
      {
        name: 'quantityOnHand',
        displayName: 'Quantity On Hand',
        visibility: 'xxl4',
        customTemplate: true
      }
    ];
  }
  getHandCarrySignatureColumnSchema(): TableColumn[] {
    return [
      {
        name: 'signatureAuditListName',
        displayName: 'Signature Audit List Name',
        visibility: 'md',
        customTemplate: true,
        sortDir: 'asc'
      },
      {
        name: 'auditStartDate',
        displayName: 'Audit Start Date',
        visibility: 'md',
        pipe: new CustomDatePipe(),
        pipeArg2: true
      },
      {
        name: 'auditEndDate',
        displayName: 'Audit End Date',
        visibility: 'md',
        pipe: new CustomDatePipe(),
        pipeArg2: true
      },
      {
        name: 'signatureAuditType',
        displayName: 'Signature Audit Type',
        visibility: 'md',
        customTemplate: true,
        sortDir: 'asc'
      },
      {
        name: 'auditReason',
        displayName: 'Audit Reason',
        visibility: 'md',
        customTemplate: true,
      },
      {
        name: 'outboundSVLDocument',
        displayName: 'Outbound SVL Document',
        visibility: 'md',
        customTemplate: true,
      },
      {
        name: 'inboundSvlDocument',
        displayName: 'Inbound SVL Document',
        visibility: 'md',
        customTemplate: true,
      },
      {
        name: 'selectedTransactionCount',
        displayName: 'Selected Transaction Count',
        visibility: 'md',
        customTemplate: true,
      },
      {
        name: 'selectedHcpCount',
        displayName: 'Selected HCP Count',
        visibility: 'xxl4',
        customTemplate: true
      },
      {
        name: 'totalTransactionCOunt',
        displayName: 'Total Transaction Count',
        visibility: 'xxl4',
        customTemplate: true
      },
      {
        name: 'undeliverable',
        displayName: 'Undeliverable',
        visibility: 'xxl4',
        customTemplate: true
      },
      {
        name: 'pending',
        displayName: 'Pending',
        visibility: 'xxl4',
        customTemplate: true
      },
      {
        name: 'positiveResponses',
        displayName: 'Positive Responses',
        visibility: 'xxl4',
        customTemplate: true
      },
      {
        name: 'negativeResponses',
        displayName: 'Negative Responses',
        visibility: 'xxl4',
        customTemplate: true
      },
    ];
  }
  @Input() filterObj: { filter: SalesFilterCriteria, isReset: boolean } = { filter: new SalesFilterCriteria(), isReset: false };
  @Input() sortingType: string;
  @Output() emitFilter: EventEmitter<object> = new EventEmitter();

  constructor(
    public repService: RepService,
    private dialogue: MatDialog,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private cacheService: CacheService
  ) {
    super();

    this.dtpcolumns = [
      { title: 'Order #', classes: 'col-xs-2' },
      { title: 'Ship To Address', classes: 'col-xs-3' },
      { title: 'Order Received Date', classes: 'col-xs-2' },
      { title: 'Order Status', classes: 'col-xs-2' },
      { title: 'Order Source', classes: 'col-xs-2' },
      { title: 'Program', classes: 'col-xs-2' },
      { title: 'Communication(s)', classes: 'col-xs-2' },
    ];

    this.dtrcolumns = [
      { title: 'Order #', classes: 'col-xs-1' },
      { title: 'Order Status', classes: 'col-xs-1' },
      { title: 'Order Date', classes: 'col-xs-1' },
      { title: 'Order Type', classes: 'col-xs-1' },
      { title: 'Rush Order', classes: 'col-xs-1' },
      { title: 'Ordered By', classes: 'col-xs-3' },
      { title: 'Ship To', classes: 'col-xs-3' },
    ];
    this.handCarryTransactions = [
      { title: 'Id #', classes: 'col-xs-1' },
      { title: 'Img', classes: 'col-xs-1' },
      { title: 'Type', classes: 'col-xs-2' },
      { title: 'Doc / Ref#', classes: 'col-xs-1' },
      { title: 'Date', classes: 'col-xs-1' },
      { title: 'Status', classes: 'col-xs-1' },
      { title: 'Valid for Recon?', classes: 'col-xs-1' },
      { title: 'Paper Ref#', classes: 'col-xs-1' },
    ];
    this.handCarryReconcilation = [
      { title: 'Inventory Start Date', classes: 'col-xs-1' },
      { title: 'Inventory End Date', classes: 'col-xs-1' },
      { title: 'Intial Reconciliation', classes: 'col-xs-1' },
      { title: 'Final Reconciliation', classes: 'col-xs-1' },
      { title: 'Analyst Notes', classes: 'col-xs-1' },
    ];
  }

  ngOnInit() {
    this.cacheService.GetClassificationValuesByTypeCode(this.codeOderStatus).subscribe((result) => {
      this.oderedStatusArray = result;
    })
  }
  openDialog(id) {
    let dataToShow;
    this.repService.GetCommunicationsyOrderId(id).subscribe((result) => {
      console.log("from rep communication", result);
      dataToShow = result;
      const dialogRef = this.dialog.open(HcpDialogComponent, {
        panelClass: 'custom-dialog',
        width: '1000px',
        data: { show: dataToShow }
      });
    });
  }
  showLessClick() {
    this.perPage -= 10;
    this.loading = !this.loading;
  }
  getClass(status: string) {
    return {
      'colorSuccess': status == "Success",
      'warn': status == "Pending Approval",
      'exceptionCss': status == "Exception" || status == "Cancelled" || status == "Rejected",
    }
  }
  showMoreClick() {
    this.perPage += 10;
    this.loading = !this.loading;
  }
  updateColumnSort(value: TableColumn[]) {
    this.columnSortChanged = true;
    this.sortedColumns = value;
  }
  pageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.repsActivitiesPerPage = this.repsActivities.slice(this.currentPage == 1 ? 0 : (this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }

  loadDtrOrders(repId) {
    this.setBusySpinner(this.repService.GetDtrOrdersByRepId(repId), 'repDtrOrders').subscribe(x => {
      this.repsActivitiesPerPage.filter(y => y.Rep.id == repId)[0].DtrOrders = x;
    });
  }
  loadHandCarryTransactionByRep(repId) {
    this.setBusySpinner(this.repService.GetHandCarryTransactionsByRep(repId), 'handCaryTransaction').subscribe(x => {
      this.repsActivitiesPerPage.filter(y => y.Rep.id == repId)[0].DtrOrders = x;
      console.log(x);
    });
  }

  loadHandCarryInventoriesByRep(repId) {
    this.setBusySpinner(this.repService.GetHandCarryInventoriesByRep(repId), 'handCarryInventory').subscribe(x => {
      this.repsActivitiesPerPage.filter(y => y.Rep.id == repId)[0].HandCarryInventoryData = x;
      console.log(x);
    })
  }

  loadHandCarrySignatureAudits() {
    this.setBusySpinner(this.repService.GetHandCarrySignatureAuditsByRep(), 'handCarySignature').subscribe(x => {
      this.handCarrySignatureData = x;
      console.log(x);
    });
  }

  loadHandCarryReconciliation(repId) {
    this.setBusySpinner(this.repService.getReconciliations(), 'handCarryReconciliation').subscribe(x => {
      this.HandCarryReconciliationData = x;
      console.log(x);
    })
  }

  openDialogue(repId: string) {
    this.repService.GetRepTerritoryHistory(repId).subscribe(res => {
      this.dialogue.open(RepTerritoryHistoryComponent, {
        panelClass: 'custom-dialog',
        data: { rep: res },
        width: '1000px',
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'filterObj': {
            let externalFilter = { filter: window.history.state || new SalesFilterCriteria(), isReset: false };
            let exitMethod = false;
            this.route.queryParams.subscribe(x => {
              if (x.startDate || x.endDate) {
                externalFilter.filter.startDate = new Date(x.startDate);
                externalFilter.filter.endDate = new Date(x.endDate);
                this.getRepActivities(externalFilter)
                exitMethod = true;
              }
            });
            if (!exitMethod) {
              let objectFilter = changes.filterObj.currentValue ? changes.filterObj.currentValue : externalFilter;
              this.getRepActivities(objectFilter)
            }
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

  getRepActivities(filterObjList?: any) {
    this.setBusySpinner(this.repService.GetRepsIncludingDtpOrders()).subscribe(x => {
      if ((filterObjList && filterObjList.isReset) || filterObjList == undefined || Object.values(filterObjList.filter).every(x => (x === null || x === ''))) {
        this.reps = x
      } else {
        this.reps = this.getFilteredData(x, filterObjList.filter);
      }
      this.repsActivities = []
      this.reps.forEach(y => {
        var repActivity: RepActivity = {
          Rep: y,
          DtrOrders: [],
          HandCarryInventoryData: [],
          HandCarryTransactions: []
        }
        this.repsActivities.push(repActivity);
      });
      this.totalRecordCount = this.reps.length;
      this.currentPage = 1
      this.repsActivitiesPerPage = this.repsActivities.slice(0, this.pageSize);
      this.sortReps();
    })
  }

  getFilteredData(hcpList: Rep[], filter: SalesFilterCriteria) {
    let result = hcpList.filter(item => {
      let data = Object.keys(filter).map(key => {
        if (filter[key] instanceof Date) return true;
        return key != 'navigationId' && filter[key] && item[key].toLowerCase().includes(filter[key].toLowerCase())
      });
      if (data.includes(true)) {
        return item
      }
    });
    if (filter.startDate || filter.endDate)
      result.forEach(x => {
        let tmp = x.dtpOrders.filter(x => new Date(x.orderDate) >= filter.startDate && new Date(x.orderDate) <= filter.endDate)
        x.dtpOrders = tmp;
      });
    return result;
  }
  openCreateTaskDialog() {
    this.dialogue.open(CreateNewTaskComponent, {
      panelClass: 'custom-dialog',
      width: '1000px',
    });
  }
  sortReps() {
    if (this.sortingType == 'asc') {
      this.repsActivities.sort((a, b) => (a.Rep.firstName.toLowerCase() > b.Rep.firstName.toLowerCase()) ? 1 : (a.Rep.firstName.toLowerCase() === b.Rep.firstName.toLowerCase()) ? ((a.Rep.lastName.toLowerCase() > b.Rep.lastName.toLowerCase()) ? 1 : -1) : -1)
    } else {
      this.repsActivities.sort((a, b) => (a.Rep.firstName.toLowerCase() < b.Rep.firstName.toLowerCase()) ? 1 : (a.Rep.firstName.toLowerCase() === b.Rep.firstName.toLowerCase()) ? ((a.Rep.lastName.toLowerCase() < b.Rep.lastName.toLocaleLowerCase()) ? 1 : -1) : -1)
    }
    this.totalRecordCount = this.repsActivities.length;
    this.currentPage = 1
    this.repsActivitiesPerPage = this.repsActivities.slice(0, this.pageSize);
  }

  loadAddressData(repId) {
    this.setBusySpinner(this.repService.GetAdressByUser(repId), 'address').subscribe(x => {
      this.addresses = x;
    });
  }
}
