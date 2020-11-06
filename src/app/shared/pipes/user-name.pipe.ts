import { Pipe, PipeTransform } from '@angular/core';
import { SecurityService } from '../../core/security.service';
import { TranslationService } from 'angular-l10n';

@Pipe({ name: 'userName' })
export class UserNamePipe implements PipeTransform {
  cachedId: number;
  cachedValue: string;

  constructor(private service: SecurityService, private translationService: TranslationService = null) { }

  transform(valueId: number, displayDefaultIfNotExistingId: boolean): any {
    if (valueId !== this.cachedId) {
      this.cachedValue = this.service.getUserName(valueId);
    }

    if (valueId == null) {
      return this.translationService.translate('SystemUser');
    }

    if (!this.cachedValue && displayDefaultIfNotExistingId) {
      return this.translationService.translate('SystemUser');
    }

    return this.cachedValue;
  }
}
