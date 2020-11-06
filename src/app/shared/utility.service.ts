import { Injectable, EventEmitter } from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { ClassificationValue } from '../../generated/service-client';
import { CacheService } from '../cache';
import { NotifyService } from './notify.service';
import { LocalizationModule, Localization, LocaleService, TranslationService } from 'angular-l10n';

import * as cls from '../../generated/classification-values';

@Injectable()
export class UtilityService {
    allFilterCriteria: FilterCriteria;
    modalOption: NgbModalOptions;
    lgModalOption: NgbModalOptions;
    classificationValueName: string;
    shippingCountryCodeToTriggerStates = new EventEmitter<string>();
    setSignatureData = new EventEmitter();

    constructor(
        private cacheService: CacheService,
        private notifyService: NotifyService,
        private translationService: TranslationService
    ) {
        this.allFilterCriteria = new FilterCriteria('', this.translationService.translate('hcpportal-shared-filter-all'));
        this.modalOption = { backdrop: 'static' };
        this.lgModalOption = { backdrop: 'static', size: 'lg' };
    }

    getClassificationValueNameByValueId(classId: string): string {
        const classificationValue = this.cacheService.classificationValues.find(x => x.id === classId);
        if (classificationValue) {
            return classificationValue.classificationValueName;
        } else {
            return classId;
        }
    }

    getClassificationValueNameByValueCode(code: string): string {
        const classificationValue = this.cacheService.classificationValues.find(x => x.classificationValueCode === code);
        if (classificationValue) {
            return classificationValue.classificationValueName;
        } else {
            return code;
        }
    }

    getClassificationDropdownByTypeCode(typeCode: string, allOption: boolean = false, excludeValueCodes: string[] = null): [string, string][] {
        const dropdown: [string, string][] = [];

        if (excludeValueCodes) {
            this.cacheService.classificationValues.filter(x => x.classificationTypeCode === typeCode).forEach(x => {
                if (excludeValueCodes.indexOf(x.classificationValueCode) === -1) {
                    dropdown.push([x.id, x.classificationValueName]);
                }
            });
        } else {
            this.cacheService.classificationValues.filter(x => x.classificationTypeCode === typeCode).forEach(x => {
                dropdown.push([x.id, x.classificationValueName]);
            });
        }

        dropdown.sort((a, b) => {
            if (a[1] > b[1]) {
                return 1;
            } else if (a[1] < b[1]) {
                return -1;
            } else {
                return 0;
            }
        });

        if (allOption) {
            dropdown.unshift([this.allFilterCriteria.id, this.allFilterCriteria.name]);
        }

        return dropdown;
    }

    getClassificationFilterCriteriaByTypeCode(typeCode: string, allOption: boolean = false,
        excludeValueCodes: string[] = null, orderedFilterCriteriaIds: string[] = null): FilterCriteria[] {
        const dropdown: FilterCriteria[] = [];

        if (excludeValueCodes) {
            this.cacheService.classificationValues.filter(x => x.classificationTypeCode === typeCode).forEach(x => {
                if (excludeValueCodes.indexOf(x.classificationValueCode) === -1) {
                    dropdown.push(new FilterCriteria(x.id, x.classificationValueName));
                }
            });
        } else {
            this.cacheService.classificationValues.filter(x => x.classificationTypeCode === typeCode).forEach(x => {
                dropdown.push(new FilterCriteria(x.id, x.classificationValueName));
            });
        }

        if (orderedFilterCriteriaIds) {
            dropdown.sort((a, b) => {
                const aindex = orderedFilterCriteriaIds.findIndex(x => x === a.id);
                const bindex = orderedFilterCriteriaIds.findIndex(x => x === b.id);
                if (aindex > bindex) {
                    return 1;
                } else if (aindex < bindex) {
                    return -1;
                } else {
                    return 0;
                }
            });
        } else {
            dropdown.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1;
                } else {
                    return 0;
                }
            });
        }

        if (allOption) {
            dropdown.unshift(new FilterCriteria(this.allFilterCriteria.id, this.allFilterCriteria.name));
        }

        return dropdown;
    }

    getClassificationUnitOfMeasure(classId: string, multiplier: number, orderedQty: number): string {

        switch (classId) {
            case cls.PRODUCT_UOM__BOXES.id: {
                this.classificationValueName = this.getClassificationValueNameByValueId(cls.PRODUCT_UOM__BOXES.id);
                if (orderedQty == 1) {
                    this.classificationValueName = this.classificationValueName.slice(0, -2);
                }
                return this.classificationValueName + ' of ' + multiplier;
            }
            case cls.PRODUCT_UOM__PACKS.id: {
                this.classificationValueName = this.getClassificationValueNameByValueId(cls.PRODUCT_UOM__PACKS.id);
                if (orderedQty == 1) {
                    this.classificationValueName = this.classificationValueName.slice(0, -1);
                }
                return this.classificationValueName + ' of ' + multiplier;
            }
            case cls.PRODUCT_UOM__CASES.id: {
                this.classificationValueName = this.getClassificationValueNameByValueId(cls.PRODUCT_UOM__CASES.id);
                if (orderedQty == 1) {
                    this.classificationValueName = this.classificationValueName.slice(0, -1);
                }
                return this.classificationValueName + ' of ' + multiplier;
            }
            default:
                return this.translationService.translate('hcpportal-shared-singleitem');
        }
    }

    correctNegativeNumber(num: number): number {
        return (num == null || num < 0 ? 0 : num);
    }

    nullToNAString(str: string): string {
        return (str == null ? "N/A" : str);
    }

    translate(text: string): string {
        return this.translationService.translate(text);
    }

    notifySuccess(opts: PNotifyOptions, delay: number = 5000): PNotify {
        return this.notifyService.success(opts, delay);
    }

    notifyNotice(opts: PNotifyOptions, delay: number = 5000): PNotify {
        return this.notifyService.notice(opts, delay);
    }

    notifyError(opts: PNotifyOptions, delay: number = 5000): PNotify {
        return this.notifyService.error(opts, delay);
    }

    notifyInfo(opts: PNotifyOptions, delay: number = 5000): PNotify {
        return this.notifyService.info(opts, delay);
    }

    setCountryCode(countryCode) {
        if (countryCode) {
            this.shippingCountryCodeToTriggerStates.emit(countryCode);
        }
    }

    getSignatureDataInUtilityService()
    {
        this.setSignatureData.emit();
    }

}

export class FilterCriteria {
    id: string;
    name: string;
    checked: boolean;
    sortOrder: number;
    fileUrlText: string;

    constructor(id: string, name: string, sortOrder: number = 0, checked: boolean = false) {
        this.id = id;
        this.name = name;
        this.checked = false;
        this.sortOrder = sortOrder;
    }
}
