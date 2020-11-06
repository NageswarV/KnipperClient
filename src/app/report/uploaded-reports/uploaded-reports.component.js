import { __decorate, __extends, __metadata } from "tslib";
import { Component } from '@angular/core';
import { BusySpinner } from '../../common/busy-spinner';
var UploadedReportsComponent = /** @class */ (function (_super) {
    __extends(UploadedReportsComponent, _super);
    function UploadedReportsComponent() {
        return _super.call(this) || this;
    }
    UploadedReportsComponent.prototype.ngOnInit = function () {
        this.isCollapsed = false;
    };
    UploadedReportsComponent.prototype.applyFilter = function (filter) {
    };
    UploadedReportsComponent.prototype.onCollapse = function () {
        this.isCollapsed = !this.isCollapsed;
    };
    UploadedReportsComponent = __decorate([
        Component({
            selector: 'app-uploaded-reports',
            templateUrl: './uploaded-reports.component.html',
            styleUrls: ['./uploaded-reports.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], UploadedReportsComponent);
    return UploadedReportsComponent;
}(BusySpinner));
export { UploadedReportsComponent };
//# sourceMappingURL=uploaded-reports.component.js.map