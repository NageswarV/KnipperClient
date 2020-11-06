import { OrderMetricPeriod, OrderMetricsDto } from '../../../generated/service-client';
import {Pipe,PipeTransform} from '@angular/core'
@Pipe({ name: 'sgCustomDateRange' })
export class CustomDateRangePipe implements PipeTransform {
    transform(value: any, type: number, period: string) {
        let startDate: Date;
        let endDate: Date;
        if (value == null) {
            return '';
        }
        if(type === 1) {
            startDate = (<OrderMetricsDto> value).startTime;
            endDate = (<OrderMetricsDto> value).endTime;
        } 
        else if(type === 2) {
            startDate = (<OrderMetricPeriod> value).startDate;
            endDate = (<OrderMetricPeriod> value).endDate;
        }

        return this.getDateRangeString(period, startDate, endDate);
    }

    getDateRangeString(period, start, end) : string {
        if(period === 'WEEKLY'){
            let last = new Date(end - 3 * 24 * 60 * 60 * 1000) 
            let prefix = start.toLocaleString('default', { month: 'short' }) + ' ' + start.getDate();
            let prefix2 = last.toLocaleString('default', { month: 'short' }) + ' ' + last.getDate();
            if(start.getFullYear() !== last.getFullYear()) {
                return prefix + ', ' + start.getFullYear() + ' - ' + prefix2 + ', ' + last.getFullYear();
            }
            return prefix + ' - ' + prefix2 + ', ' + end.getFullYear();
        }
        else if(period === 'MONTHLY') {
            return start.toLocaleString('default', { month: 'short' }) + ', ' + start.getFullYear();
        }
        else if(period === 'QUARTERLY') {
            return 'Q' + (Math.ceil((start.getMonth() + 1) / 3)) + ', ' + start.getFullYear();
        }
        return '';
    }
}
