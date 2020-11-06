import { __decorate, __metadata } from "tslib";
import { Injectable, EventEmitter } from '@angular/core';
import { CacheService } from '../cache';
import { NotifyService } from './notify.service';
import { TranslationService } from 'angular-l10n';
import * as cls from '../../generated/classification-values';
var UtilityService = /** @class */ (function () {
    function UtilityService(cacheService, notifyService, translationService) {
        this.cacheService = cacheService;
        this.notifyService = notifyService;
        this.translationService = translationService;
        this.shippingCountryCodeToTriggerStates = new EventEmitter();
        this.setSignatureData = new EventEmitter();
        this.allFilterCriteria = new FilterCriteria('', this.translationService.translate('hcpportal-shared-filter-all'));
        this.modalOption = { backdrop: 'static' };
        this.lgModalOption = { backdrop: 'static', size: 'lg' };
    }
    UtilityService.prototype.getClassificationValueNameByValueId = function (classId) {
        var classificationValue = this.cacheService.classificationValues.find(function (x) { return x.id === classId; });
        if (classificationValue) {
            return classificationValue.classificationValueName;
        }
        else {
            return classId;
        }
    };
    UtilityService.prototype.getClassificationValueNameByValueCode = function (code) {
        var classificationValue = this.cacheService.classificationValues.find(function (x) { return x.classificationValueCode === code; });
        if (classificationValue) {
            return classificationValue.classificationValueName;
        }
        else {
            return code;
        }
    };
    UtilityService.prototype.getClassificationDropdownByTypeCode = function (typeCode, allOption, excludeValueCodes) {
        if (allOption === void 0) { allOption = false; }
        if (excludeValueCodes === void 0) { excludeValueCodes = null; }
        var dropdown = [];
        if (excludeValueCodes) {
            this.cacheService.classificationValues.filter(function (x) { return x.classificationTypeCode === typeCode; }).forEach(function (x) {
                if (excludeValueCodes.indexOf(x.classificationValueCode) === -1) {
                    dropdown.push([x.id, x.classificationValueName]);
                }
            });
        }
        else {
            this.cacheService.classificationValues.filter(function (x) { return x.classificationTypeCode === typeCode; }).forEach(function (x) {
                dropdown.push([x.id, x.classificationValueName]);
            });
        }
        dropdown.sort(function (a, b) {
            if (a[1] > b[1]) {
                return 1;
            }
            else if (a[1] < b[1]) {
                return -1;
            }
            else {
                return 0;
            }
        });
        if (allOption) {
            dropdown.unshift([this.allFilterCriteria.id, this.allFilterCriteria.name]);
        }
        return dropdown;
    };
    UtilityService.prototype.getClassificationFilterCriteriaByTypeCode = function (typeCode, allOption, excludeValueCodes, orderedFilterCriteriaIds) {
        if (allOption === void 0) { allOption = false; }
        if (excludeValueCodes === void 0) { excludeValueCodes = null; }
        if (orderedFilterCriteriaIds === void 0) { orderedFilterCriteriaIds = null; }
        var dropdown = [];
        if (excludeValueCodes) {
            this.cacheService.classificationValues.filter(function (x) { return x.classificationTypeCode === typeCode; }).forEach(function (x) {
                if (excludeValueCodes.indexOf(x.classificationValueCode) === -1) {
                    dropdown.push(new FilterCriteria(x.id, x.classificationValueName));
                }
            });
        }
        else {
            this.cacheService.classificationValues.filter(function (x) { return x.classificationTypeCode === typeCode; }).forEach(function (x) {
                dropdown.push(new FilterCriteria(x.id, x.classificationValueName));
            });
        }
        if (orderedFilterCriteriaIds) {
            dropdown.sort(function (a, b) {
                var aindex = orderedFilterCriteriaIds.findIndex(function (x) { return x === a.id; });
                var bindex = orderedFilterCriteriaIds.findIndex(function (x) { return x === b.id; });
                if (aindex > bindex) {
                    return 1;
                }
                else if (aindex < bindex) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
        }
        else {
            dropdown.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                else if (a.name < b.name) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
        }
        if (allOption) {
            dropdown.unshift(new FilterCriteria(this.allFilterCriteria.id, this.allFilterCriteria.name));
        }
        return dropdown;
    };
    UtilityService.prototype.getClassificationUnitOfMeasure = function (classId, multiplier, orderedQty) {
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
    };
    UtilityService.prototype.correctNegativeNumber = function (num) {
        return (num == null || num < 0 ? 0 : num);
    };
    UtilityService.prototype.nullToNAString = function (str) {
        return (str == null ? "N/A" : str);
    };
    UtilityService.prototype.translate = function (text) {
        return this.translationService.translate(text);
    };
    UtilityService.prototype.notifySuccess = function (opts, delay) {
        if (delay === void 0) { delay = 5000; }
        return this.notifyService.success(opts, delay);
    };
    UtilityService.prototype.notifyNotice = function (opts, delay) {
        if (delay === void 0) { delay = 5000; }
        return this.notifyService.notice(opts, delay);
    };
    UtilityService.prototype.notifyError = function (opts, delay) {
        if (delay === void 0) { delay = 5000; }
        return this.notifyService.error(opts, delay);
    };
    UtilityService.prototype.notifyInfo = function (opts, delay) {
        if (delay === void 0) { delay = 5000; }
        return this.notifyService.info(opts, delay);
    };
    UtilityService.prototype.setCountryCode = function (countryCode) {
        if (countryCode) {
            this.shippingCountryCodeToTriggerStates.emit(countryCode);
        }
    };
    UtilityService.prototype.getSignatureDataInUtilityService = function () {
        this.setSignatureData.emit();
    };
    UtilityService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [CacheService,
            NotifyService,
            TranslationService])
    ], UtilityService);
    return UtilityService;
}());
export { UtilityService };
var FilterCriteria = /** @class */ (function () {
    function FilterCriteria(id, name, sortOrder, checked) {
        if (sortOrder === void 0) { sortOrder = 0; }
        if (checked === void 0) { checked = false; }
        this.id = id;
        this.name = name;
        this.checked = false;
        this.sortOrder = sortOrder;
    }
    return FilterCriteria;
}());
export { FilterCriteria };
//# sourceMappingURL=utility.service.js.map