import { __decorate, __metadata } from "tslib";
import { Pipe } from '@angular/core';
import { UtilityService } from '../shared/utility.service';
var CustomNumberPipe = /** @class */ (function () {
    function CustomNumberPipe(utilityService) {
        this.utilityService = utilityService;
    }
    CustomNumberPipe.prototype.transform = function (num) {
        return this.utilityService.correctNegativeNumber(num);
    };
    CustomNumberPipe = __decorate([
        Pipe({ name: 'sgCustomNumber' }),
        __metadata("design:paramtypes", [UtilityService])
    ], CustomNumberPipe);
    return CustomNumberPipe;
}());
export { CustomNumberPipe };
//# sourceMappingURL=custom-number.pipe.js.map