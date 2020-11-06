import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
var TableExpandedPipe = /** @class */ (function () {
    function TableExpandedPipe() {
    }
    TableExpandedPipe.prototype.transform = function (value, pipe, tableArg) {
        var text = value != null ? value : '';
        text = text.replace('<br/>', ' ');
        return text;
    };
    TableExpandedPipe = __decorate([
        Pipe({ name: 'tableExpanded' })
    ], TableExpandedPipe);
    return TableExpandedPipe;
}());
export { TableExpandedPipe };
//# sourceMappingURL=table-expanded.pipe.js.map