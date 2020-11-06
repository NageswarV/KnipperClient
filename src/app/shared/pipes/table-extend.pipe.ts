import { Pipe, PipeTransform } from '@angular/core';
import { TableExtendType } from '../../common/enum-type';
import { TranslationService } from 'angular-l10n';
import { TableExpandedPipe } from './table-expanded.pipe';

@Pipe({ name: 'tableExtend' })
export class TableExtendPipe implements PipeTransform {
  type: TableExtendType;

  constructor(type: TableExtendType, private translationService: TranslationService) {
    this.type = type;
  }

  transform(value: any, pipe: PipeTransform, tableArg: any): any {
    const text = value != null ? value : '';
    let prefix = ' (';
    let suffix = ')';

    if (this.type === TableExtendType.Bracket) {
      prefix = ' (';
    } else if (this.type === TableExtendType.Count) {
      prefix = '<br/><i>(+';
      suffix = this.translationService.translate('More') + ')</i>';
    } else if (this.type === TableExtendType.NextLine) {
      prefix = '<br/>(';
    } else if (this.type === TableExtendType.AddValue) {
      prefix = ': ';
      suffix = '';
    } else if (this.type === TableExtendType.LeadingZero) {
      prefix = '';
      suffix = '';
      return ('00000000' + text).slice(-8);
    } else if (this.type === TableExtendType.CommaSeparated) {
      prefix = ', ';
      suffix = '';
    }

    if (tableArg && pipe) {
      const result = pipe.transform(text);
      if (result) {
        return result + prefix + tableArg + suffix;
      } else {
        return result + this.removeNewLine(prefix) + tableArg + suffix;
      }
    } else if (pipe) {
      return pipe.transform(text);
    } else if (tableArg) {
      if (text) {
        return text + prefix + tableArg + suffix;
      } else {
        return text + this.removeNewLine(prefix) + tableArg + suffix;
      }
    } else {
      return text;
    }
  }

  private removeNewLine(value: string): string {
    const text: string = value != null ? value : '';
    return text.replace('<br/>', ' ');
  }
}
