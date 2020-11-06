import { __decorate, __metadata, __values } from "tslib";
import { Component, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { NavbarSchema } from '../../../shared/components/navbar/navbar.model';
import { AuthService } from '../../../core/auth.service';
import { LocaleService } from 'angular-l10n';
import { SecurityService } from '../../../core/security.service';
import { ClientService } from '../../../core/client.service';
import { ClassificationValues } from '../../../common/classification-value';
import { SamplicityPermission } from '../../../common/permissions';
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(changeDetectorRef, locale, router, authService, securityService, clientService) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.locale = locale;
        this.router = router;
        this.authService = authService;
        this.securityService = securityService;
        this.clientService = clientService;
        this.isLoggedIn = false;
        this.isPermissionsLoaded = false;
        this.showDashboard = false;
        this.securityServiceUserAccessSub = this.securityService.onUserAccessChange.subscribe({
            next: function (userAccess) {
                // this.handleUserAccess(userAccess);
                _this.refreshCurrentClientDetails();
            }
        });
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setReuseRouteStrategy();
        this.checkBrowser();
        this.securityService.userAccessSubject.subscribe(function (userAccess) {
            // this.handleUserAccess(userAccess);
            _this.refreshCurrentClientDetails();
        });
        this.securityService.checkPermission(SamplicityPermission.Dashboard.DashboardView).then(function (x) {
            if (x) {
                _this.showDashboard = true;
            }
        });
        if (this.authService.isLoggedIn()) {
            this.isLoggedIn = true;
        }
    };
    NavbarComponent.prototype.ngOnDestroy = function () {
        if (this.securityServiceUserAccessSub) {
            this.securityServiceUserAccessSub.unsubscribe();
        }
    };
    NavbarComponent.prototype.checkPermissions = function (permissions) {
        var e_1, _a;
        try {
            for (var _b = __values(this.navbarSchema.links), _c = _b.next(); !_c.done; _c = _b.next()) {
                var link = _c.value;
                this.setMenuElementsVisibility(permissions, link);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (this.navbarSchema.logoPermissions
            && this.navbarSchema.logoPermissions.length > 0
            && !this.hasAnyPermissions(permissions, this.navbarSchema.logoPermissions)) {
            this.navbarSchema.logoLink = undefined;
        }
        this.setDtrAndFgMenuVisibility();
    };
    NavbarComponent.prototype.refreshCurrentClientDetails = function () {
        var _this = this;
        this.clientService.getCurrentClientDetails().subscribe(function (client) {
            if (client) {
                if (client.tenantModules.length === 1) {
                    var status_1 = client.tenantModules[0].tenantModuleStatusClassificationValueId;
                    var isActive = (status_1 === ClassificationValues.TENANT_MODULE_STATUS_ACTIVE
                        || status_1 === ClassificationValues.TENANT_MODULE_STATUS_NEW);
                    _this.clientService.setIsCurrentClientActive(isActive);
                }
                else {
                    _this.clientService.setIsCurrentClientActive(false);
                }
            }
            _this.changeDetectorRef.detectChanges();
        });
    };
    NavbarComponent.prototype.setDtrAndFgMenuVisibility = function () {
        var _this = this;
        var observable = this.clientService.getCurrentClientDetails();
        observable.subscribe(function (client) {
            if (client) {
                if (client.tenantModules.length === 1) {
                    var status_2 = client.tenantModules[0].tenantModuleStatusClassificationValueId;
                    var isActive = (status_2 === ClassificationValues.TENANT_MODULE_STATUS_ACTIVE
                        || status_2 === ClassificationValues.TENANT_MODULE_STATUS_NEW);
                    _this.clientService.setIsCurrentClientActive(isActive);
                }
                else {
                    _this.clientService.setIsCurrentClientActive(false);
                }
                _this.setTenantModules(client.tenantModules);
            }
            _this.isPermissionsLoaded = true;
            _this.changeDetectorRef.detectChanges();
        });
    };
    NavbarComponent.prototype.setTenantModules = function (tenantModules) {
        var e_2, _a, e_3, _b, e_4, _c;
        if (tenantModules) {
            try {
                for (var _d = __values(this.navbarSchema.links), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var navbarSchemaLink = _e.value;
                    if (navbarSchemaLink.menu && navbarSchemaLink.menu.length > 0) {
                        try {
                            for (var _f = (e_3 = void 0, __values(navbarSchemaLink.menu)), _g = _f.next(); !_g.done; _g = _f.next()) {
                                var menu = _g.value;
                                if (menu.classificationType === 'TENANT_MODULE') {
                                    var showMenu = false;
                                    var _loop_1 = function (link) {
                                        if (link.classificationValue === ClassificationValues.TENANT_MODULE_TYPE_DTP) {
                                            var tm = tenantModules.find(function (x) { return x.moduleId === link.classificationValue; });
                                            if (tm) {
                                                link.hide = false;
                                                link.url = tm.tenantModuleUrlText;
                                                showMenu = true;
                                            }
                                            else {
                                                link.hide = true;
                                            }
                                        }
                                        if (link.classificationValue === ClassificationValues.TENANT_MODULE_TYPE_FGPORTAL) {
                                            var tm = tenantModules.find(function (x) { return x.moduleId === link.classificationValue; });
                                            if (tm) {
                                                link.hide = false;
                                                link.url = tm.tenantModuleUrlText;
                                                showMenu = true;
                                            }
                                            else {
                                                link.hide = true;
                                            }
                                        }
                                    };
                                    try {
                                        for (var _h = (e_4 = void 0, __values(menu.links)), _j = _h.next(); !_j.done; _j = _h.next()) {
                                            var link = _j.value;
                                            _loop_1(link);
                                        }
                                    }
                                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                    finally {
                                        try {
                                            if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                                        }
                                        finally { if (e_4) throw e_4.error; }
                                    }
                                    if (showMenu) {
                                        menu.hide = false;
                                    }
                                    else {
                                        menu.hide = true;
                                    }
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    };
    NavbarComponent.prototype.setMenuElementsVisibility = function (userPermissions, navbarLink) {
        var e_5, _a, e_6, _b;
        if (navbarLink.menu && navbarLink.menu.length > 0) {
            try {
                for (var _c = __values(navbarLink.menu), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var menu = _d.value;
                    try {
                        for (var _e = (e_6 = void 0, __values(menu.links)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var link = _f.value;
                            this.setMenuElementsVisibility(userPermissions, link);
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                    if (menu.links.find(function (x) { return x.hide === false || x.hide === undefined; })) {
                        menu.hide = false;
                    }
                    else {
                        menu.hide = true;
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_5) throw e_5.error; }
            }
            if (navbarLink.menu.find(function (x) { return x.hide === false || x.hide === undefined; })) {
                navbarLink.hide = false;
            }
            else {
                navbarLink.hide = true;
            }
        }
        else {
            if (navbarLink.permissions && navbarLink.permissions.length > 0) {
                if (this.hasAnyPermissions(userPermissions, navbarLink.permissions)) {
                    navbarLink.hide = false;
                }
                else {
                    navbarLink.hide = true;
                }
            }
            else {
                navbarLink.hide = false;
            }
        }
    };
    NavbarComponent.prototype.hasAnyPermissions = function (userPermissions, itemPermissions) {
        var e_7, _a;
        if (userPermissions) {
            var _loop_2 = function (permission) {
                if (userPermissions.find(function (x) { return x.toLowerCase() === permission.toLowerCase(); })) {
                    return { value: true };
                }
            };
            try {
                for (var itemPermissions_1 = __values(itemPermissions), itemPermissions_1_1 = itemPermissions_1.next(); !itemPermissions_1_1.done; itemPermissions_1_1 = itemPermissions_1.next()) {
                    var permission = itemPermissions_1_1.value;
                    var state_1 = _loop_2(permission);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (itemPermissions_1_1 && !itemPermissions_1_1.done && (_a = itemPermissions_1.return)) _a.call(itemPermissions_1);
                }
                finally { if (e_7) throw e_7.error; }
            }
        }
        return false;
    };
    NavbarComponent.prototype.checkBrowser = function () {
        var iePattern = new RegExp(/(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:)(\d+)/);
        var ffPattern = new RegExp(/Firefox/);
        if (navigator.userAgent.search(iePattern) > 0) {
            this.isIE11 = true;
        }
        if (navigator.userAgent.search(ffPattern) > 0) {
            this.isFirefox = true;
        }
    };
    NavbarComponent.prototype.changeRoute = function (url) {
        this.router.navigateByUrl(url);
    };
    NavbarComponent.prototype.setReuseRouteStrategy = function () {
        var _this = this;
        this.router.events.subscribe(function (event) {
            if (event instanceof NavigationEnd) {
                _this.router.navigated = false;
                window.scrollTo(0, 0);
            }
        });
    };
    NavbarComponent.prototype.openNavMenu = function (timeout, navMenuTrigger, setupMenuTrigger) {
        var _this = this;
        setTimeout(function () { return _this.processOpen(navMenuTrigger, setupMenuTrigger); }, timeout);
    };
    NavbarComponent.prototype.processOpen = function (navMenuTrigger, setupMenuTrigger) {
        if (navMenuTrigger && navMenuTrigger.parentElement && navMenuTrigger.parentElement.querySelector(':hover') === navMenuTrigger) {
            setupMenuTrigger.openMenu();
        }
    };
    NavbarComponent.prototype.closeNavMenu = function (dropdownPane, nestedDropdownPane, setupMenuTrigger) {
        var _this = this;
        setTimeout(function () { return _this.processClose(dropdownPane, nestedDropdownPane, setupMenuTrigger); }, 250);
    };
    NavbarComponent.prototype.processClose = function (dropdownPane, nestedDropdownPane, setupMenuTrigger) {
        if (nestedDropdownPane && nestedDropdownPane.parentElement
            && nestedDropdownPane.parentElement.querySelector(':hover') === nestedDropdownPane) {
            return;
        }
        else if (dropdownPane.parentElement.querySelector(':hover') === dropdownPane) {
            return;
        }
        else {
            setupMenuTrigger.closeMenu();
            this.nestedDropdownMenuSections = [];
        }
    };
    NavbarComponent.prototype.setNestedDropdownMenu = function (sections) {
        this.nestedDropdownMenuSections = sections;
    };
    NavbarComponent.prototype.navigateToLogoLink = function (logoLink) {
        if (logoLink !== undefined && logoLink.length > 0) {
            this.router.navigate([logoLink]);
        }
    };
    NavbarComponent.prototype.navigateToUrl = function (url) {
        if (url) {
            window.open(url, '_blank');
        }
    };
    NavbarComponent.prototype.menuOpened = function (navMenu) {
        navMenu.className = 'nav-item hovered';
    };
    NavbarComponent.prototype.menuClosed = function (navMenu) {
        navMenu.className = 'nav-item';
    };
    NavbarComponent.prototype.handleUserAccess = function (userAccess) {
        if (userAccess) {
            this.checkPermissions(userAccess.permissions);
        }
    };
    NavbarComponent.prototype.isDropdownLinkActive = function (link) {
        var _this = this;
        var hasActiveLink = false;
        if (link.menu && link.menu.length > 0) {
            link.menu.forEach(function (menuSection) {
                if (menuSection.links && menuSection.links.length > 0) {
                    menuSection.links.forEach(function (menuLink) {
                        if (menuLink.menuChildLinks) {
                            menuLink.menuChildLinks.forEach(function (childLink) {
                                var fullLink = menuLink.link + childLink;
                                if (_this.router.isActive(fullLink, false)) {
                                    hasActiveLink = true;
                                }
                            });
                        }
                        else if (!menuLink.menu) {
                            if (_this.router.isActive(menuLink.link, true)) {
                                hasActiveLink = true;
                            }
                        }
                        else {
                            menuLink.menu.forEach(function (subMenu) {
                                var index = subMenu.links.findIndex(function (subLink) { return _this.router.isActive(subLink.link, true); });
                                if (index > -1) {
                                    hasActiveLink = true;
                                }
                            });
                        }
                    });
                }
            });
        }
        return hasActiveLink;
    };
    __decorate([
        ViewChild('setupMenuTrigger', { static: false }),
        __metadata("design:type", MatMenuTrigger)
    ], NavbarComponent.prototype, "setupMenuTrigger", void 0);
    __decorate([
        ViewChild('navMenuTrigger', { static: false }),
        __metadata("design:type", Object)
    ], NavbarComponent.prototype, "navMenuTrigger", void 0);
    __decorate([
        ViewChild('dropdownPane', { static: false }),
        __metadata("design:type", Object)
    ], NavbarComponent.prototype, "dropdownPane", void 0);
    __decorate([
        ViewChild('nestedDropdownPane', { static: false }),
        __metadata("design:type", Object)
    ], NavbarComponent.prototype, "nestedDropdownPane", void 0);
    __decorate([
        Input(),
        __metadata("design:type", NavbarSchema)
    ], NavbarComponent.prototype, "navbarSchema", void 0);
    NavbarComponent = __decorate([
        Component({
            selector: 'samplicity-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.scss']
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            LocaleService,
            Router,
            AuthService,
            SecurityService,
            ClientService])
    ], NavbarComponent);
    return NavbarComponent;
}());
export { NavbarComponent };
//# sourceMappingURL=navbar.component.js.map