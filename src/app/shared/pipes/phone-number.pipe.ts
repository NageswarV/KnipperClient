import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phoneNumber' })
export class PhoneNumberPipe implements PipeTransform {
  transform(value: string): string {
    if (value == null || value === '') {return ''; }
    const text = value.split('-').join('');

    return `${text.slice(0, 3)}-${text.slice(3, 6)}-${text.slice(6)}`;
  }
}
