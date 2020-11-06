import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BusySpinner } from '../../../common/busy-spinner';
import { DtpOrderDto, DtrOrderDto, OrderLineItemDto, ServiceClient } from '../../../../generated/service-client';
import { TableColumn } from '../responsive-datatable/table.model';

@Component({
    selector: 'app-dtp-order-details',
    templateUrl: './dtp-order-details.component.html',
    styleUrls: ['./dtp-order-details.component.scss']
})
export class DtpOrderDetailsComponent extends BusySpinner implements OnInit {
    orderDetails: DtpOrderDto;
    orderID: string;
    breadCrumbs: string;
    breadCrumbNavigationUrl: string;
    perPage=3;
    columnSchema: TableColumn[];
    loading: boolean = true;
    orderLineItems: OrderLineItemDto[] = [];
    lifeCycleHeaders = [
      {
        classificationValueName: 'Capture',
        status: 3
      },
      {
        classificationValueName: 'Validate',
        status: 3
      },
      {
        classificationValueName: 'Process',
        status: 3
      },
      {
        classificationValueName: 'Fulfill',
        status: 3
      },
      {
        classificationValueName: 'Close',
        status: 3
      }
    ]

    constructor(private activedRoute: ActivatedRoute, private serviceClient: ServiceClient, private router: Router) {
        super();
    }

    ngOnInit() {
        this.getBreadCrumbUrl(this.router.url);
        // this.orderID = this.activedRoute.snapshot.params['id'];
        this.activedRoute.queryParams.subscribe(params => {
          this.orderID = params['orderId'];
        });
        this.setBusySpinner(this.serviceClient.getDtpOrderDetail(this.orderID)).subscribe(details => {
            this.orderDetails = details;
            this.orderLineItems = details.orderLineItems;
            if(this.orderDetails.orderLifeCycleStage) {
              for(let i = 0; i < this.lifeCycleHeaders.length; i++){
                if(this.lifeCycleHeaders[i].classificationValueName === this.orderDetails.orderLifeCycleStage){
                  this.lifeCycleHeaders[i].status = this.orderDetails.lifeCycleStatus;
                  break;
                }
                this.lifeCycleHeaders[i].status = 1;
              }
            }
            this.loading = false;
        });
        this.columnSchema = [
              {
                name: 'delete',
                displayName: '',
                visibility: 'md',
                sortEnabled: false,
                customTemplate: true
              },
              {
                name: 'productName',
                displayName: 'Product Name',
                visibility: 'md',
                sortDir: 'asc',
                customTemplate: true
              },
              {
                name: 'productDescription',
                displayName: 'Product Description',
                visibility: 'md',
                customTemplate: true,
                sortEnabled: false
              },
              {
                name: 'status',
                displayName: 'Line Item Status',
                visibility: 'md',
                warningProp: ['On Hold', 'Pending Corrections'],
                errorProp: ['Canceled','Lost In Transit', 'Lost In Transit - Partial', 'Rejected']
              },
              {
                name: 'orderQty',
                displayName: 'Ordered Qty',
                visibility: 'md',
                customTemplate: true
              },
              {
                name: 'adjustedOrderQty',
                displayName: 'Adjusted Ordered Qty',
                visibility: 'md'
              },
              {
                name: 'shippedQty',
                displayName: 'Shipped Qty',
                visibility: 'md'
              },
              {
                name: 'deliveredQty',
                displayName: 'Delivered Qty',
                visibility: 'md'
              },
              {
                name: 'adjustedDeliveredQty',
                displayName: 'Adjusted Delivered Qty',
                visibility: 'md'
              },
              {
                name: 'returnedQty',
                displayName: 'Returned Qty',
                visibility: 'md'
              }
        ];
    }

    getBreadCrumbUrl(url: string) {
        let prevPage = url.split('/');
        if (prevPage[1] == 'hcp') {
            this.breadCrumbs = 'HCPs';
            this.breadCrumbNavigationUrl = '/hcp/orders';
        } else if (prevPage[1] == 'reps') {
            this.breadCrumbs = 'Sales Reps';
            this.breadCrumbNavigationUrl = '/reps'
        }
        else if(prevPage[1] == 'products') {
          this.breadCrumbs = 'Products';
          this.breadCrumbNavigationUrl = '/products'
        }
    }

    updateColumnSort(value: TableColumn[]) {

    }

    checkStatusIsWarning(value) {
      let tmp = ['On Hold', 'Pending Corrections'];
      return !!tmp.find(x => x === value);
    }
    checkStatusIsError(value) {
      let tmp = ['Canceled','Lost In Transit', 'Lost In Transit - Partial', 'Rejected'];
      return !!tmp.find(x => x === value);
    }
}
