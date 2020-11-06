import { Pipe, PipeTransform } from '@angular/core';
import { ProductTypeDto, DoNotHonorExclusionReasonDto, DoNotHonorExclusionReasonSourceDto} from '../service-clients/reference';
import { ReferenceDataService } from '../../core/reference-data.service';
import { ReferenceData } from '../../common/reference-data-consts';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Pipe({ name: 'referenceData' })
export class ReferenceDataPipe implements PipeTransform {
  cachedId: string;
  cachedValue: string;
  iePattern = new RegExp(/(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:)(\d+)/);

  constructor(private referenceDataService: ReferenceDataService) { }

  transform(value: any, type: string): any {
    if (value === null || value === undefined || value === '') {
      return '';
    }
    if (type === ReferenceData.ReferenceType.productType) {
      return new Observable<string>((observer: Observer<string>) => {
        this.referenceDataService.getProductTypeById(value).subscribe(x => {
          observer.next(x.result.productTypeName);
          this.cachedValue = x.result.productTypeName;
        });
      });
    } else if (type === ReferenceData.ReferenceType.productDistributionUom) {

    } else if (type === 'DoNotHonorExclusionReasonDto') {
      const record = this.referenceDataService.doNotHonorExclusionReasons.find(x => x.id === value);
      return record ? record.doNotHonorExclusionReasonName : null;
    } else if (type === 'DoNotHonorExclusionReasonSources') {
      const record = this.referenceDataService.doNotHonorExclusionReasonSources.find(x => x.id === value);
      return record ? record.sourceClassificationValueId : null;
    } else if (type === 'ProfessionalDesignation') {
      const record = this.referenceDataService.professionalDesignations.find(x => x.id === value);
      return record ? record.name : null;
    } else if (type === 'OrderStatus') {
      const record = this.referenceDataService.orderStatuses.find(x => x.id === value);
      return record ? record.name : null;
    } else if (type === 'OrderSource') {
      const record = this.referenceDataService.orderSources.find(x => x.id === value);
      return record ? record.orderSourceName : null;
    } else if (type === 'CommunicationType') {
      const record = this.referenceDataService.communicationEntities.find(x => x.id === value);
      if (record) {
        return record ? record.name : null;
      } else {
        return '';
      }
    } else if (type === 'OrderStatusReasonType') {
      const records = this.referenceDataService.orderStatusReasonTypes.filter(x => {
        if (navigator.userAgent.search(this.iePattern) > 0) {
          if (value.length > 0 && value.indexOf(x.id) > -1) {
            return true;
          }
        } else {
          if (value.length > 0 && value.includes(x.id)) {
            return true;
          }
        }
      });
      if (records && records.length > 0) {
        return records.map(x => x.name).join(', ');
      }
      return '';
    } else if (type === 'State') {
      const record = this.referenceDataService.states.find(x => x.code === value);
      return record ? record.name : null;
    } else {
      // Fall back
      if (value !== this.cachedId) {
        const record = this.referenceDataService.getReferenceDataValueNameByValueId(value).subscribe(x => {
          this.cachedValue = x;
        });
      }
      return this.cachedValue;
    }
  }
}
