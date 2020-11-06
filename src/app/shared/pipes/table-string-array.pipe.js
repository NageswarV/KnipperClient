import { __decorate, __metadata } from "tslib";
import { Pipe } from '@angular/core';
var TableStringArrayPipe = /** @class */ (function () {
    function TableStringArrayPipe() {
    }
    TableStringArrayPipe.prototype.transform = function (value) {
        if (!value) {
            return '';
        }
        var text = value.filter(Boolean).join('<br/>');
        return text;
    };
    TableStringArrayPipe = __decorate([
        Pipe({ name: 'tableStringArray' }),
        __metadata("design:paramtypes", [])
    ], TableStringArrayPipe);
    return TableStringArrayPipe;
}());
export { TableStringArrayPipe };
//# sourceMappingURL=table-string-array.pipe.js.map