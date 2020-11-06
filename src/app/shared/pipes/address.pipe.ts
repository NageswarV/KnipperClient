import { Pipe, PipeTransform } from '@angular/core';
import { HcpAddressDto } from '../../shared/service-clients/om-hcp';
import { ZipCodePipe } from './zip-code.pipe';

@Pipe({ name: 'address' })
export class AddressPipe implements PipeTransform {

  constructor() { }

  transform(value: HcpAddressDto): any {
    if (!value) {
      return '';
    }
    const city = [];
    city.push(value.cityName);
    city.push(value.stateCode);
    if (value.zipCode) {
      const pipe = new ZipCodePipe();
      city.push(pipe.transform(value.zipCode));
    }
    const cityText = city.filter(Boolean).join(', ');

    const address = [];
    address.push(value.companyName);
    address.push(value.address1Text);
    address.push(value.address2Text);
    address.push(cityText);
    const addressText = address.filter(Boolean).join('<br/>');

    return addressText;
  }
}
