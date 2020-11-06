import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sgCustomDateTime' })
export class CustomDateTimePipe implements PipeTransform {
    transform(value: string, time: boolean, formatType: number) {
        if (value == null) {
            return '';
        }
        if(formatType === 1) {
            return "July 08 7:30 PM, 2020 EST"
        }
    }
}
