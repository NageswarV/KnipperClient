import { Component, Input, OnInit } from '@angular/core';
import { OrderMetric, OrderMetricsDto, ServiceClient } from '../../generated/service-client';
import { BusySpinner } from '../common/busy-spinner';
import { TimeFrameOptions } from './activity-model';

@Component({
    selector: 'sg-general-activities',
    templateUrl: './general-activities.component.html',
    styleUrls: ['./general-activities.component.scss'],
})
export class GeneralActivitiesComponent extends BusySpinner implements OnInit {

    @Input() timeFrameFilterOptions: TimeFrameOptions;
    @Input() timeFrameDesc: string;
    @Input() transactionDetailDesc: string;
    @Input() dtpActivity: boolean; 
    orderMetrics: OrderMetricsDto;
    timeFrameSelected:string = "QUARTERLY";

    get getButtonWidth() : number {
        const numberOfButtons = this.dtpActivity ? 3 : 2;
        return 100 / numberOfButtons;
    }

    get transactionLink() : string {
        return this.dtpActivity ? '/hcp/orders' : '/reps';
    }

    get disableRightArrow() : boolean {
        return this.orderMetrics && 
            this.orderMetrics.startTime <= new Date() &&
            this.orderMetrics.endTime >= new Date();
    }

    get disableLeftArrow() : boolean {
        return false;
        // this.orderMetrics && 
        //     this.orderMetrics.metrics[0].previousPeriod.startDate;
    }

    constructor(private serviceClient: ServiceClient) {
        super();
    }

    ngOnInit() {
        this.getData(new Date());
    }

    getNextSet() {
        this.getData(this.orderMetrics.metrics[0].currentPeriod.endDate);
    }

    getPrevSet() {
        this.getData(this.orderMetrics.metrics[0].previousPeriod.startDate);
    }
    
    changeTimeFrame(value: string) {
        this.timeFrameSelected = value;
        this.getData(new Date());
    }

    checkIfError(transaction :OrderMetric): boolean {
        const errors = ['Lost In Transit']
        return !!errors.find(x => x === transaction.orderStatus) && this.dtpActivity;
    }

    checkIfWarning(transaction :OrderMetric): boolean {
        const warnings = ['Returns', 'Exceptions']
        return !!warnings.find(x => x === transaction.orderStatus) && this.dtpActivity;
    }

    getData(dateRange: Date) {
        if(this.dtpActivity) {
            this.setBusySpinner(this.serviceClient.getOrderMetrics(this.timeFrameSelected, new Date(dateRange.setHours(15))), 'dtp').subscribe(x =>{
                this.orderMetrics = x;
            });
        } 
        else {
            this.setBusySpinner(this.serviceClient.getOrderMetrics2(this.timeFrameSelected, new Date(dateRange.setHours(15))), 'hc').subscribe(x => {
                this.orderMetrics = x;
            });
        }
    }
}
