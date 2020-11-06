import { __decorate, __extends, __metadata } from "tslib";
import { Component } from '@angular/core';
import { BusySpinner } from '../../common/busy-spinner';
var GenerateReportsComponent = /** @class */ (function (_super) {
    __extends(GenerateReportsComponent, _super);
    function GenerateReportsComponent() {
        return _super.call(this) || this;
    }
    GenerateReportsComponent.prototype.ngOnInit = function () {
        this.isCollapsed = false;
    };
    GenerateReportsComponent.prototype.onCollapse = function () {
        this.isCollapsed = !this.isCollapsed;
    };
    GenerateReportsComponent = __decorate([
        Component({
            selector: 'app-generate-reports',
            templateUrl: './generate-reports.component.html',
            styleUrls: ['./generate-reports.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], GenerateReportsComponent);
    return GenerateReportsComponent;
}(BusySpinner));
export { GenerateReportsComponent };
//# sourceMappingURL=generate-reports.component.js.map