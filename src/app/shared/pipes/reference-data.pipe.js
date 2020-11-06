import { __decorate, __metadata } from "tslib";
import { Pipe } from '@angular/core';
import { ReferenceDataService } from '../../core/reference-data.service';
import { ReferenceData } from '../../common/reference-data-consts';
import { Observable } from 'rxjs/Observable';
var ReferenceDataPipe = /** @class */ (function () {
    function ReferenceDataPipe(referenceDataService) {
        this.referenceDataService = referenceDataService;
        this.iePattern = new RegExp(/(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:)(\d+)/);
    }
    ReferenceDataPipe.prototype.transform = function (value, type) {
        var _this = this;
        if (value === null || value === undefined || value === '') {
            return '';
        }
        if (type === ReferenceData.ReferenceType.productType) {
            return new Observable(function (observer) {
                _this.referenceDataService.getProductTypeById(value).subscribe(function (x) {
                    observer.next(x.result.productTypeName);
                    _this.cachedValue = x.result.productTypeName;
                });
            });
        }
        else if (type === ReferenceData.ReferenceType.productDistributionUom) {
        }
        else if (type === 'DoNotHonorExclusionReasonDto') {
            var record = this.referenceDataService.doNotHonorExclusionReasons.find(function (x) { return x.id === value; });
            return record ? record.doNotHonorExclusionReasonName : null;
        }
        else if (type === 'DoNotHonorExclusionReasonSources') {
            var record = this.referenceDataService.doNotHonorExclusionReasonSources.find(function (x) { return x.id === value; });
            return record ? record.sourceClassificationValueId : null;
        }
        else if (type === 'ProfessionalDesignation') {
            var record = this.referenceDataService.professionalDesignations.find(function (x) { return x.id === value; });
            return record ? record.name : null;
        }
        else if (type === 'OrderStatus') {
            var record = this.referenceDataService.orderStatuses.find(function (x) { return x.id === value; });
            return record ? record.name : null;
        }
        else if (type === 'OrderSource') {
            var record = this.referenceDataService.orderSources.find(function (x) { return x.id === value; });
            return record ? record.orderSourceName : null;
        }
        else if (type === 'CommunicationType') {
            var record = this.referenceDataService.communicationEntities.find(function (x) { return x.id === value; });
            if (record) {
                return record ? record.name : null;
            }
            else {
                return '';
            }
        }
        else if (type === 'OrderStatusReasonType') {
            var records = this.referenceDataService.orderStatusReasonTypes.filter(function (x) {
                if (navigator.userAgent.search(_this.iePattern) > 0) {
                    if (value.length > 0 && value.indexOf(x.id) > -1) {
                        return true;
                    }
                }
                else {
                    if (value.length > 0 && value.includes(x.id)) {
                        return true;
                    }
                }
            });
            if (records && records.length > 0) {
                return records.map(function (x) { return x.name; }).join(', ');
            }
            return '';
        }
        else if (type === 'State') {
            var record = this.referenceDataService.states.find(function (x) { return x.code === value; });
            return record ? record.name : null;
        }
        else {
            // Fall back
            if (value !== this.cachedId) {
                var record = this.referenceDataService.getReferenceDataValueNameByValueId(value).subscribe(function (x) {
                    _this.cachedValue = x;
                });
            }
            return this.cachedValue;
        }
    };
    ReferenceDataPipe = __decorate([
        Pipe({ name: 'referenceData' }),
        __metadata("design:paramtypes", [ReferenceDataService])
    ], ReferenceDataPipe);
    return ReferenceDataPipe;
}());
export { ReferenceDataPipe };
//# sourceMappingURL=reference-data.pipe.js.map