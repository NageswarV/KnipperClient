import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusySpinner } from '../../../common/busy-spinner';
import { ServiceClient } from '../../../../generated/service-client';
import { IGridColumns } from '../../grid.component';

@Component({
  selector: 'app-handcarry-distbursement-order-details',
  templateUrl: './handcarry-distbursement-order-details.component.html',
  styleUrls: ['./handcarry-distbursement-order-details.component.scss']
})
export class HandcarryDistbursementOrderDetailsComponent extends BusySpinner implements OnInit {
  transactionID: string;
  breadCrumbs: string;
  breadCrumbNavigationUrl: string;
  commentsColumns: IGridColumns[];
  productsColumns: IGridColumns[];
  responseColumns: IGridColumns[];
  order : any;

  constructor( private activedRoute : ActivatedRoute, private serviceClient: ServiceClient, private router : Router) { 
    super();
    this.commentsColumns = [
      { title: 'Comment', classes: 'col-xs-3 p-1 vertical-align-top border-bottom-grey pl-25px' },
      { title: 'Comment Type', classes: 'col-xs-1 p-1 vertical-align-top border-bottom-grey' },
      { title: 'Comment Source', classes: 'col-xs-1 p-1 vertical-align-top border-bottom-grey' },
      { title: 'Comment Visibility', classes: 'col-xs-1 p-1 vertical-align-top border-bottom-grey' },
      { title: 'Comment Included On Recon Report?', classes: 'col-xs-2 p-1 vertical-align-top border-bottom-grey' },
      { title: 'Comment Author', classes: 'col-xs-2 p-1 vertical-align-top border-bottom-grey' },
      { title: 'Comment Date', classes: 'col-xs-2 p-1 vertical-align-top border-bottom-grey' },
      { title: 'Comment File', classes: 'col-xs-2 p-1 vertical-align-top pr-2 border-bottom-grey' }
    ];
    this.productsColumns = [
      { title: 'Product Name (Prodtc ID)', classes: 'col-xs-3 p-1 vertical-align-top border-bottom-grey pl-25px' },
      { title: 'Lot #', classes: 'col-xs-3 p-1 vertical-align-top border-bottom-grey' },
      { title: 'Disbursed Qty', classes: 'col-xs-3 p-1 vertical-align-top border-bottom-grey' },
      { title: 'Correction Type', classes: 'col-xs-3 p-1 vertical-align-top border-bottom-grey' }
    ];
    this.responseColumns = [
      { title: '# ', classes: ' p-1 vertical-align-top border-bottom-grey pl-2' },
      { title: 'Response Form', classes: 'col-xs-5 p-1 vertical-align-top border-bottom-grey' },
      { title: 'Form Received Date ', classes: 'col-xs-2 p-1 vertical-align-top border-bottom-grey' },
      { title: 'Form Status', classes: 'col-xs-2 p-1 vertical-align-top border-bottom-grey' },
      { title: 'Extended Response Due Date ', classes: 'col-xs-2 p-1 vertical-align-top border-bottom-grey' }
    ]
  }

  ngOnInit() {
    this.getBreadCrumbUrl(this.router.url)
    this.transactionID=this.activedRoute.snapshot.params['id'];

    this.setBusySpinner(this.serviceClient.getHandCarryDisbursementDetails(this.transactionID)).subscribe(details=>{
      this.order=details;
      console.log(this.order);
    });
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
