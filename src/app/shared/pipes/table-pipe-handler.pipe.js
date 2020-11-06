import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
var TablePipeHandler = /** @class */ (function () {
    function TablePipeHandler() {
    }
    TablePipeHandler.prototype.transform = function (value, p, arg1, arg2) {
        return p.transform(value, arg1, arg2);
    };
    TablePipeHandler = __decorate([
        Pipe({ name: 'pipeHandler' })
    ], TablePipeHandler);
    return TablePipeHandler;
}());
export { TablePipeHandler };
//# sourceMappingURL=table-pipe-handler.pipe.js.map