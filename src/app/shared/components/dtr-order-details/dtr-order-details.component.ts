import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  Observable } from 'rxjs';
import { BusySpinner } from '../../../common/busy-spinner';
import { DtrOrderDto, ServiceClient } from '../../../../generated/service-client';
import { IGridColumns } from '../../grid.component';

@Component({
  selector: 'app-dtr-order-details',
  templateUrl: './dtr-order-details.component.html',
  styleUrls: ['./dtr-order-details.component.scss']
})
export class DtrOrderDetailsComponent extends BusySpinner  implements OnInit {
  orderDetails: DtrOrderDto;
  orderID: string;
  breadCrumbs: string;
  breadCrumbNavigationUrl: string;
  columns: IGridColumns[];
  
  constructor( private activedRoute : ActivatedRoute, private serviceClient: ServiceClient, private router : Router) { 
    super();
    this.columns = [
      { title: 'Product Name' },
      { title: 'Product Code'},
      { title: 'Unit of Measure'},
      { title: 'Quantity' }
    ];
  }

  ngOnInit() {
    this.getBreadCrumbUrl(this.router.url)
    this.orderID=this.activedRoute.snapshot.params['id'];
    this.setBusySpinner(this.GetDtrOrderDetail(this.orderID)).subscribe(details=>{
      this.orderDetails=details;
      console.log(this.orderDetails);
    });
  }

  GetDtrOrderDetail(orderId : string): Observable<DtrOrderDto>{
    return this.serviceClient.getDtrOrderDetail(orderId);
  }

  getBreadCrumbUrl(url: string){
    let prevPage=url.split('/');
    if(prevPage[1]=='hcp'){
      this.breadCrumbs='HCPs';
      this.breadCrumbNavigationUrl='/hcp/orders';
    }else if(prevPage[1]=='reps'){
      this.breadCrumbs='Sales Reps';
      this.breadCrumbNavigationUrl='/reps'
    }else if(prevPage[1]=='products'){
      this.breadCrumbs='Products';
      this.breadCrumbNavigationUrl='/products'
    }
  }
}
