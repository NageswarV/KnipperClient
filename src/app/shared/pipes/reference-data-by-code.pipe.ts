import { Pipe, PipeTransform } from '@angular/core';
import { ReferenceDataService } from '../../core/reference-data.service';
import { ReferenceData } from '../../common/reference-data-consts';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Pipe({ name: 'referenceDataByCode' })
export class ReferenceDataByCodePipe implements PipeTransform {
  constructor(private referenceDataService: ReferenceDataService) { }

  transform(value: string, type: string): any {
    if (type === ReferenceData.ReferenceType.productType) {
      return new Observable<string>((observer: Observer<string>) => {
        this.referenceDataService.getProductTypeByCode(value).subscribe(x => {
          observer.next(x.result.productTypeName);
        });
      });
    }
  }
}
