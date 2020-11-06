import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'zipCode' })
export class ZipCodePipe implements PipeTransform {
  transform(value: string): string {
    if (value == null || value === '') {return ''; }
    const text = value.split('-').join('');
    if (value.length > 5) {
      return `${text.slice(0, 5)}-${text.slice(5, 9)}`;
    } else {
      return value;
    }
  }
}
