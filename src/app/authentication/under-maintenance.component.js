import { __decorate, __extends, __metadata } from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from 'angular-l10n';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BusySpinner } from '../common/busy-spinner';
import { AuthenticationService, LoginData } from './authentication.service';
var UnderMaintenanceComponent = /** @class */ (function (_super) {
    __extends(UnderMaintenanceComponent, _super);
    function UnderMaintenanceComponent(translationService, authenticationService, modalService, router) {
        var _this = _super.call(this) || this;
        _this.translationService = translationService;
        _this.authenticationService = authenticationService;
        _this.modalService = modalService;
        _this.router = router;
        _this.loginData = new LoginData();
        _this.modalOption = { backdrop: 'static' };
        return _this;
    }
    UnderMaintenanceComponent.prototype.ngOnInit = function () {
    };
    UnderMaintenanceComponent = __decorate([
        Component({
            selector: 'sg-under-maintenance-cmp',
            templateUrl: './under-maintenance.component.html',
            styleUrls: ['./under-maintenance.component.scss']
        }),
        __metadata("design:paramtypes", [TranslationService,
            AuthenticationService,
            NgbModal,
            Router])
    ], UnderMaintenanceComponent);
    return UnderMaintenanceComponent;
}(BusySpinner));
export { UnderMaintenanceComponent };
//# sourceMappingURL=under-maintenance.component.js.map