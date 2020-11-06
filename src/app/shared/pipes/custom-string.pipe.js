import { __decorate, __metadata } from "tslib";
import { Pipe } from '@angular/core';
import { UtilityService } from '../../shared/utility.service';
var CustomStringPipe = /** @class */ (function () {
    function CustomStringPipe(utilityService) {
        this.utilityService = utilityService;
    }
    CustomStringPipe.prototype.transform = function (str) {
        return this.utilityService.nullToNAString(str);
    };
    CustomStringPipe = __decorate([
        Pipe({ name: 'sgCustomString' }),
        __metadata("design:paramtypes", [UtilityService])
    ], CustomStringPipe);
    return CustomStringPipe;
}());
export { CustomStringPipe };
//# sourceMappingURL=custom-string.pipe.js.map