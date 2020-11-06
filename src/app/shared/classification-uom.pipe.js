import { __decorate, __metadata } from "tslib";
import { Pipe } from '@angular/core';
import { UtilityService } from '../shared/utility.service';
var ClassificationUomPipe = /** @class */ (function () {
    function ClassificationUomPipe(utilityService) {
        this.utilityService = utilityService;
    }
    ClassificationUomPipe.prototype.transform = function (classId, multiplier, orderedQty) {
        return this.utilityService.getClassificationUnitOfMeasure(classId, multiplier, orderedQty);
    };
    ClassificationUomPipe = __decorate([
        Pipe({ name: 'sgClassificationUom' }),
        __metadata("design:paramtypes", [UtilityService])
    ], ClassificationUomPipe);
    return ClassificationUomPipe;
}());
export { ClassificationUomPipe };
//# sourceMappingURL=classification-uom.pipe.js.map