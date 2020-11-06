import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sgCustomDate' })
export class CustomDatePipe implements PipeTransform {
  transform(value: string, time: boolean, rpTableFormat: boolean) {
    if(rpTableFormat) {
      let tmp = new Date(value);
      let valueDate: string = (tmp.getDate() + '').length === 1 ? '0' + tmp.getDate() : tmp.getDate()+'';
      return tmp.toLocaleString('default', { month: 'short' }) + ' ' + tmp.getDate() + ',' + tmp.getFullYear();
    }
    if (value == null) {
      return '';
    }
    time = time || false;
    const date = new Date(value);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let dateStr = this.pad(date.getMonth() + 1, 2) + '/'
      + this.pad(date.getDate(), 2) + '/'
      + date.getFullYear().toString();
    if (time) {
      dateStr = dateStr + ' ' + hours.toString() + ':' + (minutes < 10 ? '0' + minutes.toString() : minutes.toString()) + ' ' + ampm;
    }
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
