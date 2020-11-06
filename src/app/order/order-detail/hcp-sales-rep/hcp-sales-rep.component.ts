import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumn } from '../../../shared';
import { DtrOrder, Rep, ServiceClient } from '../../../../generated/service-client';
import { BusySpinner } from '../../../common/busy-spinner';
import { CustomDatePipe } from '../../../shared/pipes/custom-date.pipe';

@Component({
    selector: 'app-hcp-sales-rep-details',
    templateUrl: './hcp-sales-rep.component.html',
    styleUrls: ['./hcp-sales-rep.component.scss']
})
export class HCPSalesRepComponent extends BusySpinner implements OnInit {

    orderID: string;
    breadCrumbs: string;
    breadCrumbNavigationUrl: string;
    hcpDataSet: Rep;
    perPage: number = 10;
    dtpOrderCount = 0;
    selectedTab: string = 'dtp';
    loading: boolean = false;
    columnSortChanged = false;
    sortedColumns: TableColumn[];
    panelExpanded = false;

    constructor(private activedRoute: ActivatedRoute, private serviceClient: ServiceClient, private router: Router) {
        super();
    }

    ngOnInit() {
        this.loading = true;
        this.getBreadCrumbUrl(this.router.url);
        this.activedRoute.queryParams.subscribe(params => {
            this.orderID = params['orderId'];
        });
        this.setBusySpinner(this.serviceClient.getHcpsIncludingDtpOrders(), 'dtp').subscribe(response => {
            this.hcpDataSet = response.find(x => x.dtpOrders.find(y => y.id === this.orderID));
            let tmp = [this.hcpDataSet.dtpOrders.find(y => y.id === this.orderID)];
            this.hcpDataSet.dtpOrders = tmp;
            this.loading = false;
        });
    }
    get columnSchema(): TableColumn[] {
        if (this.columnSortChanged) {
          return this.sortedColumns;
        }
    
        if (this.selectedTab === 'dtp') {
          return this.getDTPColumnSchema();
        }
      }
    
      get getDataSet(): DtrOrder[] {
        if (this.selectedTab === 'dtp' && this.hcpDataSet) {
          return this.hcpDataSet.dtpOrders;
        }
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
                customTemplate: true
            },
            {
                name: 'salesRep',
                displayName: 'Sales Rep',
                visibility: 'md',
                customTemplate: true
            },
            {
                name: 'repId',
                displayName: 'Rep ID',
                visibility: 'xxl4'
            },
            {
                name: 'territoryId',
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

    getBreadCrumbUrl(url: string) {
        let prevPage = url.split('/');
        if (prevPage[1] == 'hcp') {
            this.breadCrumbs = 'HCPs';
            this.breadCrumbNavigationUrl = '/hcp/orders';
        } else if (prevPage[1] == 'rep') {
            this.breadCrumbs = 'Sales Reps';
            this.breadCrumbNavigationUrl = '/rep/orders'
        }
    }

    updateColumnSort(value: TableColumn[]) {
        this.columnSortChanged = true;
        this.sortedColumns = value;
      }
    
      loadRepData() {
        // this.setBusySpinner(this.hcpService.GetDtrOrdersByHcpId(this.hcpDataSet.id), 'rep').subscribe(x => {
        //   this.dtrOrders = x;
        // });
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
        }
        this.selectedTab = value;
      }
      openDialog(id){
        // let dataToShow;
        //   this.hcpService.GetCommunicationsyOrderId(id).subscribe((result)=>{
        //     dataToShow=result;
        //     console.log("dataToShow",dataToShow);
        //     const dialogRef = this.dialog.open(HcpDialogComponent, {
        //       panelClass: 'custom-dialog',
        //       data: {show:dataToShow}
        //     });
        //     dialogRef.afterClosed().subscribe(result => {
        //       console.log('The dialog was closed');
             
        //     });
        //   });
      }
         
         
      openCreateTaskDialog() {
        // console.log("Hello");
        // this.dialog.open(CreateNewTaskComponent, {
        //   panelClass: 'custom-dialog',
        //   width: '1000px',
        // });
      }
}
