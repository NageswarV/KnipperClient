import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderMetric } from '../../generated/service-client';

@Component({
    selector: 'sg-activitiy',
    templateUrl: './activity-transaction.component.html',
    styleUrls: ['./activity-transaction.component.scss'],
})
export class ActivityTransactionComponent implements OnInit {
    @Input() transaction: OrderMetric;
    @Input() link: string;
    @Input() timeFrameSelected: string;
    @Input() errorCapsule: boolean;
    @Input() warningCapsule: boolean;
    @Input() capsuleIndex: number;

    constructor(private router : Router) {

    }

    getTop() {
        var count = this.capsuleIndex % 2 === 0 ? 3 : this.capsuleIndex % 2;
        return 65.5 * count + '%';
    }

    getLeft() {
        var count = this.capsuleIndex % 3 === 0 ? 3 : this.capsuleIndex % 3;
        var index = [1, 3, 5];
        return 7.5 * index[count] + 'em';
    }

    ngOnInit() {
        
    }

    gotoPreviousPeriodRoute() {
        this.router.navigate([this.link],
            {
              queryParams: {
                startDate: this.transaction.previousPeriod.startDate,
                endDate: this.transaction.previousPeriod.endDate
              }
            });
    }
    
    gotoCurrentPeriodRoute() {
        this.router.navigate([this.link],
            {
              queryParams: {
                startDate: this.transaction.currentPeriod.startDate,
                endDate: this.transaction.currentPeriod.endDate
              }
            });
    }
}
