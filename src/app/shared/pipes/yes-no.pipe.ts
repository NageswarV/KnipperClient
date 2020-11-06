import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from 'angular-l10n';

@Pipe({ name: 'yesNo' })
export class YesNoPipe implements PipeTransform {

  constructor(private translationService: TranslationService) { }

  transform(value: any, trueFlag: string = 'Yes', falseFlag: string = 'No'): any {
    if (value) {
      return this.translationService.translate(trueFlag);
    } else if (value === false) {
      return this.translationService.translate(falseFlag);
    } else {
      return this.translationService.translate('NotApplicable');
    }
  }
}
