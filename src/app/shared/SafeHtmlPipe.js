import { __decorate, __metadata } from "tslib";
import { DomSanitizer } from '@angular/platform-browser';
import { Pipe } from "@angular/core";
var SafeHtmlPipe = /** @class */ (function () {
    function SafeHtmlPipe(sanitized) {
        this.sanitized = sanitized;
    }
    SafeHtmlPipe.prototype.transform = function (value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    };
    SafeHtmlPipe = __decorate([
        Pipe({ name: 'safeHtml' }),
        __metadata("design:paramtypes", [DomSanitizer])
    ], SafeHtmlPipe);
    return SafeHtmlPipe;
}());
export { SafeHtmlPipe };
//# sourceMappingURL=SafeHtmlPipe.js.map