import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Permissions } from '../../generated/permission-set';
import { UtilityService } from '../shared/utility.service';
import { CacheService } from '../cache';
import { ValidationService } from '../validation';
import { AuthenticationService } from '../authentication';
var NavigationComponent = /** @class */ (function () {
    function NavigationComponent(modalService, utilityService, validationService, router, authenticationService, cacheService) {
        this.modalService = modalService;
        this.utilityService = utilityService;
        this.validationService = validationService;
        this.router = router;
        this.authenticationService = authenticationService;
        this.cacheService = cacheService;
        this.viewShoppingCart = [Permissions.ViewShoppingCart];
        this.addressBookPermissions = [Permissions.EditAddressBook];
        this.viewHcpUsersPermissions = [Permissions.ViewHcpUserList];
        this.viewProductCatalogTabPermissions = [Permissions.ViewProductCatalog];
        this.viewOrderHistoryTabPermissions = [Permissions.ViewMyHcpOrders, Permissions.ViewAllHcpOrders];
        this.viewResourceManagementTabPermissions = [Permissions.ViewResourceManagement];
        this.mimicHCPonProgramMSCSiteBasic = [Permissions.MimicHCPonProgramMSCSiteBasic];
        this.mimicHCPonProgramMSCSiteAdvanced = [Permissions.MimicHCPonProgramMSCSiteAdvanced];
        this.isLoggedIn = false;
        this.isImpersonating = false;
        this.isExternalLogin = false;
        this.isAocOrdersPending = false;
        this.isProgramDeactivated = false;
        this.isSAImpersonating = false;
        this.mimicBasic = false;
        this.mimicAdvanced = false;
        var prevValue = 0;
    }
    NavigationComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.authenticationService.isLoggedIn.subscribe(function (x) {
                    _this.isLoggedIn = x;
                });
                return [2 /*return*/];
            });
        });
    };
    NavigationComponent.prototype.signOut = function () {
        if (this.modalRef) {
            this.modalRef.close();
        }
        this.authenticationService.signOut();
    };
    NavigationComponent.prototype.gotoCart = function () {
        if (this.modalRef) {
            this.modalRef.close();
        }
        this.router.navigate(['/order/cart']);
    };
    __decorate([
        ViewChild('cartitemspopup', { static: true }),
        __metadata("design:type", Object)
    ], NavigationComponent.prototype, "cartitemspopup", void 0);
    NavigationComponent = __decorate([
        Component({
            selector: 'sg-main-nav',
            templateUrl: './navigation.component.html',
            styleUrls: ['./navigation.component.scss']
        }),
        __metadata("design:paramtypes", [NgbModal,
            UtilityService,
            ValidationService,
            Router,
            AuthenticationService,
            CacheService])
    ], NavigationComponent);
    return NavigationComponent;
}());
export { NavigationComponent };
//# sourceMappingURL=navigation.component.js.map