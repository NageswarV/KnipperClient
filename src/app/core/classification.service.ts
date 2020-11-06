import { Injectable } from '@angular/core';
import { TranslationHelperService } from './translation-helper.service';
import { AsyncSubject, Observable } from 'rxjs';
import { ClassificationType, ClassificationValue, ServiceClient } from '../../generated/service-client';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class ClassificationService {
  private cacheByValueId: Map<string, ClassificationValue>;
  private cacheByTypeId: Map<string, ClassificationValue[]>;
  private cacheByTypeCode: Map<string, ClassificationValue[]>;

  public cacheReadySubject = new AsyncSubject();

  constructor(
    private serviceClient: ServiceClient,
    private translationHelperService: TranslationHelperService,
    private cacheService: CacheService
  ) {
    this.cacheByValueId = new Map<string, ClassificationValue>();
    this.cacheByTypeId = new Map<string, ClassificationValue[]>();
    this.cacheByTypeCode = new Map<string, ClassificationValue[]>();
  }

  load() {
    this.loadStatic();

    this.cacheService.classificationValues.forEach(x => {
      this.cacheByValueId.set(x.id, x);

      if (this.cacheByTypeId.get(x.classificationTypeId)) {
        this.cacheByTypeId.get(x.classificationTypeId).push(x);
      } else {
        this.cacheByTypeId.set(x.classificationTypeId, []);
        this.cacheByTypeId.get(x.classificationTypeId).push(x);
      }

      if (this.cacheByTypeCode.get(x.classificationTypeCode)) {
        this.cacheByTypeCode.get(x.classificationTypeCode).push(x);
      } else {
        this.cacheByTypeCode.set(x.classificationTypeCode, []);
        this.cacheByTypeCode.get(x.classificationTypeCode).push(x);
      }
    });
    this.cacheReadySubject.next(true);
    this.cacheReadySubject.complete();
  }

  private loadStatic() {
    const priorityClassificationType = new ClassificationType({
      classificationTypeCode: 'PRIORITY',
      classificationTypeName: 'Priority'
    });
  }

  addCacheByValueId(valueId: string, value: ClassificationValue): void {
    this.cacheByValueId.set(valueId, value);
  }

  getClassificationValueByValueId(valueId: string): Observable<ClassificationValue> {
    var classificationType = new ClassificationType;
    var classificationValue = this.cacheByValueId.get(valueId);
    classificationType.classificationTypeCode = classificationValue.classificationTypeCode;
    classificationType.classificationTypeCode = classificationValue.classificationTypeCode;
    return Observable.of(classificationValue);
  }

  getClassificationValueNameByValueId(valueId: string): Observable<string> {
    if (valueId == null) {
      return null;
    }
    const item = this.cacheByValueId.get(valueId.toString());
    if (item) {
      return Observable.of(item.classificationValueName);
    }
  }

  getClassificationValueNamesByTypeId(typeId: string): Observable<ClassificationValue[]> {
    const items = this.cacheByTypeId.get(typeId.toString());
    if (items) {
      return Observable.of(items);
    } else {
      return this.serviceClient.getClassificationValuesByType(typeId).map(x => x);
    }
  }

  getClassificationValuesByTypeCode(typeCode: string): Observable<ClassificationValue[]> {
    const items = this.cacheByTypeCode.get(typeCode);
    if (items) {
      return Observable.of(items);
    } else {
      return this.serviceClient.getClassificationValuesByTypeCode(typeCode).map(x => x);
    }
  }

  getClassificationValuesByType(typeId: string): Observable<ClassificationValue[]> {
    return this.serviceClient.getClassificationValuesByType(typeId).map(x => x);
  }
}

export class Item {
  value: any;
  label: string;

  constructor(value, label: string, name = '') {
    this.value = value;
    this.label = label;
  }
}
