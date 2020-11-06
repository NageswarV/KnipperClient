import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sgCustomTime' })
export class CustomTimePipe implements PipeTransform {
    transform(value: string) {
        if (value == null) {
            return '';
        }
        
        const date = new Date(value);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        let dateStr = "";

        dateStr = dateStr + hours.toString() + ':' + (minutes < 10 ? '0' + minutes.toString() : minutes.toString()) + ' ' + ampm;

        return dateStr;
    }

    pad(num: number, size: number): string {
        let s = num + '';
        while (s.length < size) {
            s = '0' + s;
        }
        return s;
    }
}