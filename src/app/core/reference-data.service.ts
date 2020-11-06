import { Injectable } from '@angular/core';
import {
    Reference,
    ProductTypeDto,
    DoNotHonorExclusionReasonSourceDto,
    DoNotHonorExclusionReasonDto,
    StateDto, ProfessionalDesignationDto,
    AjaxResponseOfProductTypeDto,
    OrderStatusDto,
    OrderStatusReasonTypeDto,
    CommunicationTypeDto,
    AjaxResponseOfIListOfWmsProductTypeDto,
    OrderSourceDto
} from '../shared/service-clients/reference';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs/AsyncSubject';

@Injectable()
export class ReferenceDataService {
    private cacheByValueId: Map<string, string>;
    productTypes: ProductTypeDto[] = [];
    returnCode = false;
    doNotHonorExclusionReasonSources: DoNotHonorExclusionReasonSourceDto[] = [];
    states: StateDto[] = [];
    doNotHonorExclusionReasons: DoNotHonorExclusionReasonDto[] = [];
    professionalDesignations: ProfessionalDesignationDto[] = [];
    orderStatuses: OrderStatusDto[] = [];
    orderSources: OrderSourceDto[]=[];
    orderStatusReasonTypes: OrderStatusReasonTypeDto[] = [];
    communicationEntities: CommunicationTypeDto [] = [];

    public cacheReadySubject = new AsyncSubject();

    constructor(
        private referenceService: Reference
    ) {
        this.cacheByValueId = new Map<string, string>();
    }

    load(): void {
        Promise.all([
            this.loadProductTypeValues(),
            this.getDoNotHonorExclusionReasons(),
            this.getDoNotHonorExclusionReasonSources(),
            this.getStates(),
            this.getProfessionalDesignations(),
            this.getOrderStatuses(),
            this.getOrderSources(),
            this.getOrderStatusReasonTypes(),
            this.getCommunicationEntities()
        ]).then(() => {
            console.log('Reference Data Cache Ready!');
            this.cacheReadySubject.next(true);
            this.cacheReadySubject.complete();
        });
    }

    getProductTypeById(productTypeId: string): Observable<AjaxResponseOfProductTypeDto> {
        const result = this.productTypes.find(x => x.id.toLowerCase() === productTypeId.toLowerCase());
        if (result !== null && result !== undefined) {
            const respone = new AjaxResponseOfProductTypeDto();
            respone.result = result;
            return Observable.of(respone);
        } else {
            const observable = this.referenceService.getProductTypeById(productTypeId);
            observable.subscribe(x => {
                if (!this.productTypes.find(y => y.id.toLowerCase() === x.result.id.toLowerCase())) {
                    this.productTypes.push(x.result);
                }
            });
            return observable;
        }
    }

    getProductTypeByCode(productTypeCode: string): Observable<AjaxResponseOfProductTypeDto> {
        const result = this.productTypes.find(x => x.productTypeCode.toLowerCase() === productTypeCode.toLowerCase());
        if (result !== null && result !== undefined) {
            const respone = new AjaxResponseOfProductTypeDto();
            respone.result = result;
            return Observable.of(respone);
        } else {
            const observable = this.referenceService.getProductTypeByCode(productTypeCode);
            observable.subscribe(x => {
                if (!this.productTypes.find(y => y.productTypeCode.toLowerCase() === x.result.productTypeCode.toLowerCase())) {
                    this.productTypes.push(x.result);
                }
            });
            return observable;
        }
    }

    loadProductTypeValues(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.referenceService.getProductTypes().subscribe(x => {
                this.productTypes = x.result;
                console.log('Reference Data Cache - Loaded ProductTypes!');
                resolve(true);
            });
        });
    }

    getProductTypeValueNameByValueId(valueId: string): Observable<string> {
        const items = this.cacheByValueId.get(valueId.toString());
        if (items) {
            return Observable.of(items);
        } else {
            return this.referenceService.getProductTypeById(valueId).map(x => x.result.productTypeName);
        }
    }

    getDoNotHonorExclusionReasons(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.referenceService.getDoNotHonorExclusionReasons().subscribe(x => {
                this.doNotHonorExclusionReasons = x.result;
                console.log('Reference Data Cache - Loaded DNHE Reasons!');
                resolve(true);
            });
        });
    }

    getDoNotHonorExclusionReasonSources(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.referenceService.getDoNotHonorExclusionReasonSources().subscribe(x => {
                this.doNotHonorExclusionReasonSources = x.result;
                console.log('Reference Data Cache - Loaded DNHE Reason Sources!');
                resolve(true);
            });
        });
    }

    getStates(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.referenceService.getStates().subscribe(x => {
                this.states = x.result;
                console.log('Reference Data Cache - Loaded States!');
                resolve(true);
            });
        });
    }

    getProfessionalDesignations(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.referenceService.getProfessionalDesignations().subscribe(x => {
                this.professionalDesignations = x.result;
                this.professionalDesignations.forEach(y => {
                    this.cacheByValueId.set(y.id, y.name);
                });
                console.log('Reference Data Cache - Loaded Professional Designations!');
                resolve(true);
            });
        });
    }

    getOrderStatuses(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.referenceService.getOrderStatuses().subscribe(x => {
                this.orderStatuses = x.result;
                this.orderStatuses.forEach(y => {
                    this.cacheByValueId.set(y.id, y.name);
                });
                console.log('Reference Data Cache - Loaded Order Statuses!');
                resolve(true);
            });
        });
    }

    getOrderSources(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.referenceService.getOrderSources().subscribe(x => {
                this.orderSources = x.result;
                this.orderSources.forEach(y => {
                    this.cacheByValueId.set(y.id, y.orderSourceName);
                });
                console.log('Reference Data Cache - Loaded Order orderSources!');
                resolve(true);
            });
        });
    }

    getOrderStatusReasonTypes(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.referenceService.getOrderStatusReasonTypes().subscribe(x => {
                this.orderStatusReasonTypes = x.result;
                this.orderStatusReasonTypes.forEach(y => {
                    this.cacheByValueId.set(y.id, y.name);
                });
                console.log('Reference Data Cache - Loaded Order Status Reason Types!');
                resolve(true);
            });
        });
    }

    getCommunicationEntities(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.referenceService.getCommunicationTypes().subscribe(x => {
                this.communicationEntities = x.result;
                this.communicationEntities.forEach(y => {
                    this.cacheByValueId.set(y.id, y.name);
                });
                console.log('Reference Data Cache - Loaded Communication Entities!');
                resolve(true);
            });
        });
    }


    getReferenceDataValueNameByValueId(valueId: string): Observable<string> {
        const items = this.cacheByValueId.get(valueId.toString());
        if (items) {
            return Observable.of(items);
        } else {
            return Observable.of('');
        }
    }

    getWmsProductTypes(): Observable<AjaxResponseOfIListOfWmsProductTypeDto> {
        return this.referenceService.getWmsProductTypes();
    }
}
