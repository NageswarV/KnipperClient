import { Pipe, PipeTransform } from '@angular/core';
import { TableExtendType } from '../../common/enum-type';

@Pipe({ name: 'tableExpanded' })
export class TableExpandedPipe implements PipeTransform {

  transform(value: any, pipe: PipeTransform, tableArg: any): any {
    let text: string = value != null ? value : '';
    text = text.replace('<br/>', ' ');
    return text;
  }
}
