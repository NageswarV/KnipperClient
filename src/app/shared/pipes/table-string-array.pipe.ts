import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tableStringArray' })
export class TableStringArrayPipe implements PipeTransform {
  constructor() { }

  transform(value: string[]): any {
    if (!value) {
      return '';
    }
    const text = value.filter(Boolean).join('<br/>');

    return text;
  }
}
