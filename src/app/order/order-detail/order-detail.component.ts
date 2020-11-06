import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusySpinner } from '../../common/busy-spinner';

@Component({
    selector: 'app-order-detail-home',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent extends BusySpinner implements OnInit {

    sectionSelected: string;
    orderId: string;
    pageState: string = "Valid";
    
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
        super();
    }

    ngOnInit() {
        this.orderId = this.route.snapshot.params['id'];
        this.onGotoPage('OrderDetail', 'orderdetail');
    }

    onGotoPage(name: string, path: string = '') {
        this.sectionSelected = name;
        this.router.navigate([this.route.snapshot.root.firstChild.routeConfig.path+'/dtporders/' + this.orderId + '/' + path], { queryParams: { orderId: this.orderId } });
    }

    selected(name: string): boolean {
        return this.sectionSelected === name;
    }
}
