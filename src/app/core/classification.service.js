import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { TranslationHelperService } from './translation-helper.service';
import { AsyncSubject, Observable } from 'rxjs';
import { ClassificationType, ServiceClient } from '../../generated/service-client';
import { CacheService } from '../cache/cache.service';
var ClassificationService = /** @class */ (function () {
    function ClassificationService(serviceClient, translationHelperService, cacheService) {
        this.serviceClient = serviceClient;
        this.translationHelperService = translationHelperService;
        this.cacheService = cacheService;
        this.cacheReadySubject = new AsyncSubject();
        this.cacheByValueId = new Map();
        this.cacheByTypeId = new Map();
        this.cacheByTypeCode = new Map();
    }
    ClassificationService.prototype.load = function () {
        var _this = this;
        this.loadStatic();
        this.cacheService.classificationValues.forEach(function (x) {
            _this.cacheByValueId.set(x.id, x);
            if (_this.cacheByTypeId.get(x.classificationTypeId)) {
                _this.cacheByTypeId.get(x.classificationTypeId).push(x);
            }
            else {
                _this.cacheByTypeId.set(x.classificationTypeId, []);
                _this.cacheByTypeId.get(x.classificationTypeId).push(x);
            }
            if (_this.cacheByTypeCode.get(x.classificationTypeCode)) {
                _this.cacheByTypeCode.get(x.classificationTypeCode).push(x);
            }
            else {
                _this.cacheByTypeCode.set(x.classificationTypeCode, []);
                _this.cacheByTypeCode.get(x.classificationTypeCode).push(x);
            }
        });
        this.cacheReadySubject.next(true);
        this.cacheReadySubject.complete();
    };
    ClassificationService.prototype.loadStatic = function () {
        var priorityClassificationType = new ClassificationType({
            classificationTypeCode: 'PRIORITY',
            classificationTypeName: 'Priority'
        });
    };
    ClassificationService.prototype.addCacheByValueId = function (valueId, value) {
        this.cacheByValueId.set(valueId, value);
    };
    ClassificationService.prototype.getClassificationValueByValueId = function (valueId) {
        var classificationType = new ClassificationType;
        var classificationValue = this.cacheByValueId.get(valueId);
        classificationType.classificationTypeCode = classificationValue.classificationTypeCode;
        classificationType.classificationTypeCode = classificationValue.classificationTypeCode;
        return Observable.of(classificationValue);
    };
    ClassificationService.prototype.getClassificationValueNameByValueId = function (valueId) {
        if (valueId == null) {
            return null;
        }
        var item = this.cacheByValueId.get(valueId.toString());
        if (item) {
            return Observable.of(item.classificationValueName);
        }
    };
    ClassificationService.prototype.getClassificationValueNamesByTypeId = function (typeId) {
        var items = this.cacheByTypeId.get(typeId.toString());
        if (items) {
            return Observable.of(items);
        }
        else {
            return this.serviceClient.getClassificationValuesByType(typeId).map(function (x) { return x; });
        }
    };
    ClassificationService.prototype.getClassificationValuesByTypeCode = function (typeCode) {
        var items = this.cacheByTypeCode.get(typeCode);
        if (items) {
            return Observable.of(items);
        }
        else {
            return this.serviceClient.getClassificationValuesByTypeCode(typeCode).map(function (x) { return x; });
        }
    };
    ClassificationService.prototype.getClassificationValuesByType = function (typeId) {
        return this.serviceClient.getClassificationValuesByType(typeId).map(function (x) { return x; });
    };
    ClassificationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ServiceClient,
            TranslationHelperService,
            CacheService])
    ], ClassificationService);
    return ClassificationService;
}());
export { ClassificationService };
var Item = /** @class */ (function () {
    function Item(value, label, name) {
        if (name === void 0) { name = ''; }
        this.value = value;
        this.label = label;
    }
    return Item;
}());
export { Item };
//# sourceMappingURL=classification.service.js.map