import { __decorate, __metadata } from "tslib";
import { Pipe } from '@angular/core';
import { ReferenceDataService } from '../../core/reference-data.service';
import { ReferenceData } from '../../common/reference-data-consts';
import { Observable } from 'rxjs/Observable';
var ReferenceDataByCodePipe = /** @class */ (function () {
    function ReferenceDataByCodePipe(referenceDataService) {
        this.referenceDataService = referenceDataService;
    }
    ReferenceDataByCodePipe.prototype.transform = function (value, type) {
        var _this = this;
        if (type === ReferenceData.ReferenceType.productType) {
            return new Observable(function (observer) {
                _this.referenceDataService.getProductTypeByCode(value).subscribe(function (x) {
                    observer.next(x.result.productTypeName);
                });
            });
        }
    };
    ReferenceDataByCodePipe = __decorate([
        Pipe({ name: 'referenceDataByCode' }),
        __metadata("design:paramtypes", [ReferenceDataService])
    ], ReferenceDataByCodePipe);
    return ReferenceDataByCodePipe;
}());
export { ReferenceDataByCodePipe };
//# sourceMappingURL=reference-data-by-code.pipe.js.map