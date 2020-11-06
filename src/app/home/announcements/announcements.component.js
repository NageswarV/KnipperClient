import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
var AnnouncementsComponent = /** @class */ (function () {
    function AnnouncementsComponent() {
    }
    AnnouncementsComponent.prototype.ngOnInit = function () { };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AnnouncementsComponent.prototype, "announcements", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AnnouncementsComponent.prototype, "currentPage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AnnouncementsComponent.prototype, "pageSize", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AnnouncementsComponent.prototype, "totalRecordCount", void 0);
    AnnouncementsComponent = __decorate([
        Component({
            selector: 'sg-announcements',
            templateUrl: './announcements.component.html',
            styleUrls: ['./announcements.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], AnnouncementsComponent);
    return AnnouncementsComponent;
}());
export { AnnouncementsComponent };
//# sourceMappingURL=announcements.component.js.map