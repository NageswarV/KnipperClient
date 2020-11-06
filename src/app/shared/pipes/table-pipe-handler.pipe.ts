import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pipeHandler' })
export class TablePipeHandler implements PipeTransform {
  transform(value: any, p: any, arg1?: any, arg2?: any): any {
    return p.transform(value, arg1, arg2);
  }
}
