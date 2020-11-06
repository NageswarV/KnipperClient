import { Pipe, PipeTransform } from '@angular/core';
import { HcpSalesRepPhoneDto } from '../../shared/service-clients/om-hcp';
import { TranslationService } from 'angular-l10n';

@Pipe({ name: 'tablePhoneNumber' })
export class TablePhoneNumberPipe implements PipeTransform {
  constructor(private translationService: TranslationService) { }

  transform(value: HcpSalesRepPhoneDto): any {
    if (!value) {
      return '';
    }
    const workNumber = [];
    if (value.phoneNbr) {
      workNumber.push(value.phoneNbr);
      if (value.phoneExtensionNbr) {
        workNumber.push(this.translationService.translate('Pipe.ExtDot'));
        workNumber.push(value.phoneExtensionNbr);
      }
      workNumber.push(this.translationService.translate('Pipe.Work'));
    }

    const mobileNumber = [];
    if (value.mobilePhoneNbr) {
      mobileNumber.push(value.mobilePhoneNbr);
      mobileNumber.push(this.translationService.translate('Pipe.Mobile'));
    }

    const faxNumber = [];
    if (value.faxNbr) {
      faxNumber.push(value.faxNbr);
      faxNumber.push(this.translationService.translate('Pipe.Fax'));
    }

    const workText = workNumber.filter(Boolean).join(' ');
    const mobileText = mobileNumber.filter(Boolean).join(' ');
    const faxText = faxNumber.filter(Boolean).join(' ');

    const phoneNumbers = [];
    phoneNumbers.push(workText);
    phoneNumbers.push(mobileText);
    phoneNumbers.push(faxText);
    const phoneNumbersText = phoneNumbers.filter(Boolean).join('<br/>');

    return phoneNumbersText;
  }
}
