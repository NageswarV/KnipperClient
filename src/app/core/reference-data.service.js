import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Reference, AjaxResponseOfProductTypeDto } from '../shared/service-clients/reference';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs/AsyncSubject';
var ReferenceDataService = /** @class */ (function () {
    function ReferenceDataService(referenceService) {
        this.referenceService = referenceService;
        this.productTypes = [];
        this.returnCode = false;
        this.doNotHonorExclusionReasonSources = [];
        this.states = [];
        this.doNotHonorExclusionReasons = [];
        this.professionalDesignations = [];
        this.orderStatuses = [];
        this.orderSources = [];
        this.orderStatusReasonTypes = [];
        this.communicationEntities = [];
        this.cacheReadySubject = new AsyncSubject();
        this.cacheByValueId = new Map();
    }
    ReferenceDataService.prototype.load = function () {
        var _this = this;
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
        ]).then(function () {
            console.log('Reference Data Cache Ready!');
            _this.cacheReadySubject.next(true);
            _this.cacheReadySubject.complete();
        });
    };
    ReferenceDataService.prototype.getProductTypeById = function (productTypeId) {
        var _this = this;
        var result = this.productTypes.find(function (x) { return x.id.toLowerCase() === productTypeId.toLowerCase(); });
        if (result !== null && result !== undefined) {
            var respone = new AjaxResponseOfProductTypeDto();
            respone.result = result;
            return Observable.of(respone);
        }
        else {
            var observable = this.referenceService.getProductTypeById(productTypeId);
            observable.subscribe(function (x) {
                if (!_this.productTypes.find(function (y) { return y.id.toLowerCase() === x.result.id.toLowerCase(); })) {
                    _this.productTypes.push(x.result);
                }
            });
            return observable;
        }
    };
    ReferenceDataService.prototype.getProductTypeByCode = function (productTypeCode) {
        var _this = this;
        var result = this.productTypes.find(function (x) { return x.productTypeCode.toLowerCase() === productTypeCode.toLowerCase(); });
        if (result !== null && result !== undefined) {
            var respone = new AjaxResponseOfProductTypeDto();
            respone.result = result;
            return Observable.of(respone);
        }
        else {
            var observable = this.referenceService.getProductTypeByCode(productTypeCode);
            observable.subscribe(function (x) {
                if (!_this.productTypes.find(function (y) { return y.productTypeCode.toLowerCase() === x.result.productTypeCode.toLowerCase(); })) {
                    _this.productTypes.push(x.result);
                }
            });
            return observable;
        }
    };
    ReferenceDataService.prototype.loadProductTypeValues = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.referenceService.getProductTypes().subscribe(function (x) {
                _this.productTypes = x.result;
                console.log('Reference Data Cache - Loaded ProductTypes!');
                resolve(true);
            });
        });
    };
    ReferenceDataService.prototype.getProductTypeValueNameByValueId = function (valueId) {
        var items = this.cacheByValueId.get(valueId.toString());
        if (items) {
            return Observable.of(items);
        }
        else {
            return this.referenceService.getProductTypeById(valueId).map(function (x) { return x.result.productTypeName; });
        }
    };
    ReferenceDataService.prototype.getDoNotHonorExclusionReasons = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.referenceService.getDoNotHonorExclusionReasons().subscribe(function (x) {
                _this.doNotHonorExclusionReasons = x.result;
                console.log('Reference Data Cache - Loaded DNHE Reasons!');
                resolve(true);
            });
        });
    };
    ReferenceDataService.prototype.getDoNotHonorExclusionReasonSources = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.referenceService.getDoNotHonorExclusionReasonSources().subscribe(function (x) {
                _this.doNotHonorExclusionReasonSources = x.result;
                console.log('Reference Data Cache - Loaded DNHE Reason Sources!');
                resolve(true);
            });
        });
    };
    ReferenceDataService.prototype.getStates = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.referenceService.getStates().subscribe(function (x) {
                _this.states = x.result;
                console.log('Reference Data Cache - Loaded States!');
                resolve(true);
            });
        });
    };
    ReferenceDataService.prototype.getProfessionalDesignations = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.referenceService.getProfessionalDesignations().subscribe(function (x) {
                _this.professionalDesignations = x.result;
                _this.professionalDesignations.forEach(function (y) {
                    _this.cacheByValueId.set(y.id, y.name);
                });
                console.log('Reference Data Cache - Loaded Professional Designations!');
                resolve(true);
            });
        });
    };
    ReferenceDataService.prototype.getOrderStatuses = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.referenceService.getOrderStatuses().subscribe(function (x) {
                _this.orderStatuses = x.result;
                _this.orderStatuses.forEach(function (y) {
                    _this.cacheByValueId.set(y.id, y.name);
                });
                console.log('Reference Data Cache - Loaded Order Statuses!');
                resolve(true);
            });
        });
    };
    ReferenceDataService.prototype.getOrderSources = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.referenceService.getOrderSources().subscribe(function (x) {
                _this.orderSources = x.result;
                _this.orderSources.forEach(function (y) {
                    _this.cacheByValueId.set(y.id, y.orderSourceName);
                });
                console.log('Reference Data Cache - Loaded Order orderSources!');
                resolve(true);
            });
        });
    };
    ReferenceDataService.prototype.getOrderStatusReasonTypes = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.referenceService.getOrderStatusReasonTypes().subscribe(function (x) {
                _this.orderStatusReasonTypes = x.result;
                _this.orderStatusReasonTypes.forEach(function (y) {
                    _this.cacheByValueId.set(y.id, y.name);
                });
                console.log('Reference Data Cache - Loaded Order Status Reason Types!');
                resolve(true);
            });
        });
    };
    ReferenceDataService.prototype.getCommunicationEntities = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.referenceService.getCommunicationTypes().subscribe(function (x) {
                _this.communicationEntities = x.result;
                _this.communicationEntities.forEach(function (y) {
                    _this.cacheByValueId.set(y.id, y.name);
                });
                console.log('Reference Data Cache - Loaded Communication Entities!');
                resolve(true);
            });
        });
    };
    ReferenceDataService.prototype.getReferenceDataValueNameByValueId = function (valueId) {
        var items = this.cacheByValueId.get(valueId.toString());
        if (items) {
            return Observable.of(items);
        }
        else {
            return Observable.of('');
        }
    };
    ReferenceDataService.prototype.getWmsProductTypes = function () {
        return this.referenceService.getWmsProductTypes();
    };
    ReferenceDataService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Reference])
    ], ReferenceDataService);
    return ReferenceDataService;
}());
export { ReferenceDataService };
//# sourceMappingURL=reference-data.service.js.map