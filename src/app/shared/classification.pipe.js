import { __decorate, __metadata } from "tslib";
import { Pipe } from '@angular/core';
import { UtilityService } from '../shared/utility.service';
var ClassificationPipe = /** @class */ (function () {
    function ClassificationPipe(utilityService) {
        this.utilityService = utilityService;
    }
    ClassificationPipe.prototype.transform = function (classId) {
        // Implement translation service
        return this.utilityService.getClassificationValueNameByValueId(classId);
    };
    ClassificationPipe = __decorate([
        Pipe({ name: 'sgClassification' }),
        __metadata("design:paramtypes", [UtilityService])
    ], ClassificationPipe);
    return ClassificationPipe;
}());
export { ClassificationPipe };
//# sourceMappingURL=classification.pipe.js.map