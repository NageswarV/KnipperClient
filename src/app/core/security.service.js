import { __decorate, __metadata, __values } from "tslib";
import { Injectable, EventEmitter } from '@angular/core';
import { Security } from '../shared/service-clients/security';
import { AuthService } from '../core/auth.service';
import { ClientService } from '../core/client.service';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { ApplicationInsightsService } from '../core/applications-insights.service';
var SecurityService = /** @class */ (function () {
    function SecurityService(authService, clientService, securityClient, applicationInsightsService) {
        this.authService = authService;
        this.clientService = clientService;
        this.securityClient = securityClient;
        this.applicationInsightsService = applicationInsightsService;
        this.userAccessExpiresInKey = 'samplicity-user-access-expiry';
        this.userAccessExpiresInMinutes = 120; // TODO Move userAccessExpiresInMinutes to config
        this.userAccess = null;
        this.userAccessSubject = new AsyncSubject();
        this.cacheReadySubject = new AsyncSubject();
        this.onUserAccessChange = new EventEmitter();
        this.userNames = new Map();
    }
    SecurityService.prototype.load = function () {
        var _this = this;
        this.retrieveUserNames().then(function () {
            console.log('Username Cache Ready!');
            _this.cacheReadySubject.next(true);
            _this.cacheReadySubject.complete();
        }).catch(function (e) {
            console.log(e);
        });
    };
    SecurityService.prototype.canNavigate = function (permissions, requiresAll) {
        var _this = this;
        if (requiresAll === void 0) { requiresAll = false; }
        return new Promise(function (resolve) {
            if (_this.userAccess) {
                var canNav = _this.doesUserAccessHaveTenants() && _this.doesUserAccessHavePermissions(permissions, requiresAll);
                resolve(canNav);
            }
            else {
                _this.retrieveUserAccess().then(function () {
                    var canNav = _this.doesUserAccessHaveTenants() && _this.doesUserAccessHavePermissions(permissions, requiresAll);
                    resolve(canNav);
                }).catch(function () {
                    resolve(false);
                });
            }
        });
    };
    SecurityService.prototype.checkPermissions = function (permissions, requiresAll) {
        var _this = this;
        if (requiresAll === void 0) { requiresAll = false; }
        return new Promise(function (resolve) {
            if (_this.userAccess) {
                resolve(_this.doesUserAccessHavePermissions(permissions, requiresAll));
            }
            else {
                _this.retrieveUserAccess().then(function () {
                    resolve(_this.doesUserAccessHavePermissions(permissions, requiresAll));
                }).catch(function () {
                    resolve(false);
                });
            }
        });
    };
    SecurityService.prototype.checkPermission = function (permission) {
        return this.checkPermissions([permission]);
    };
    SecurityService.prototype.getPermissions = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.userAccess) {
                resolve(_this.getUserPermissions());
            }
            else {
                _this.retrieveUserAccess().then(function () {
                    resolve(_this.getUserPermissions());
                }).catch(function () {
                    resolve([]);
                });
            }
        });
    };
    SecurityService.prototype.getUserAccess = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.userAccess) {
                resolve(_this.userAccess);
            }
            else {
                _this.retrieveUserAccess().then(function () {
                    if (_this.userAccess) {
                        resolve(_this.userAccess);
                    }
                    else {
                        resolve(null);
                    }
                }).catch(function () {
                    resolve(null);
                });
            }
        });
    };
    SecurityService.prototype.getUserName = function (id) {
        return this.userNames.get(id);
    };
    SecurityService.prototype.refreshUserAccess = function () {
        return this.retrieveUserAccess(true);
    };
    SecurityService.prototype.clearUserAccess = function () {
        sessionStorage.removeItem(this.userAccessExpiresInKey);
        this.userAccess = null;
    };
    //#region Roles
    SecurityService.prototype.getRoleById = function (id) {
        return this.securityClient.getRoleById(id);
    };
    SecurityService.prototype.getNewRole = function () {
        return this.securityClient.getNewRole();
    };
    SecurityService.prototype.getRoles = function () {
        return this.securityClient.getRoles();
    };
    SecurityService.prototype.searchRoles = function (filter) {
        return this.securityClient.searchRoles(filter);
    };
    SecurityService.prototype.createRole = function (roleDto) {
        return this.securityClient.createRole(roleDto);
    };
    SecurityService.prototype.updateRole = function (roleDto) {
        return this.securityClient.updateRole(roleDto);
    };
    SecurityService.prototype.searchActiveUserEmailsForRole = function (filter) {
        return this.securityClient.searchActiveUserEmailsForRole(filter);
    };
    SecurityService.prototype.searchPermissionsForRole = function (filter) {
        return this.securityClient.searchPermissionsForRole(filter);
    };
    SecurityService.prototype.deleteRole = function (roleDto) {
        return this.securityClient.deleteRole(roleDto.id);
    };
    //#endregion Roles
    //#region Users
    SecurityService.prototype.searchUsers = function (filter) {
        return this.securityClient.searchUsers(filter);
    };
    SecurityService.prototype.searchClientsForUser = function (filter) {
        return this.securityClient.searchClientsForUser(filter);
    };
    SecurityService.prototype.searchActiveDirectoryUsers = function (filter) {
        return this.securityClient.searchActiveDirectoryUsers(filter);
    };
    SecurityService.prototype.getNewUser = function (activeDirectoryUserId) {
        return this.securityClient.getNewUser(activeDirectoryUserId);
    };
    SecurityService.prototype.getUserById = function (id) {
        return this.securityClient.getUserById(id);
    };
    SecurityService.prototype.createUser = function (userDto) {
        return this.securityClient.createUser(userDto);
    };
    SecurityService.prototype.updateUser = function (userDto) {
        return this.securityClient.updateUser(userDto);
    };
    SecurityService.prototype.getUsers = function () {
        return this.securityClient.getUsers();
    };
    SecurityService.prototype.getUserProfiles = function () {
        return this.securityClient.getUserProfiles();
    };
    SecurityService.prototype.logUserSession = function (userLogDto) {
        return this.securityClient.logUserSession(userLogDto);
    };
    //#endregion Users
    //#region Private Methods
    SecurityService.prototype.retrieveUserAccess = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        return new Promise(function (resolve, reject) {
            var username = _this.authService.getUsername();
            if (username) {
                if (_this.shouldRefreshUserAccess(refresh)) {
                    _this.securityClient.getUserAccess(username).subscribe(function (x) {
                        _this.userAccess = x.result;
                        // Setting Default ClientId
                        if (!_this.clientService.getClientId()) {
                            if (_this.userAccess.tenants && _this.userAccess.tenants.length > 0) {
                                _this.clientService.setClientId(_this.userAccess.defaultTenantId);
                            }
                        }
                        var userAccessExpiresIn = new Date().getTime() + (_this.userAccessExpiresInMinutes * 60000);
                        sessionStorage.setItem(_this.userAccessExpiresInKey, userAccessExpiresIn.toString());
                        console.log('Loaded User Access!');
                        console.log(_this.userAccess);
                        _this.userAccessSubject.next(_this.userAccess);
                        _this.userAccessSubject.complete();
                        _this.onUserAccessChange.emit(_this.userAccess);
                        _this.applicationInsightsService.setUserId(_this.userAccess.username);
                        resolve();
                    }, function (e) {
                        console.log(e);
                        reject(e);
                    });
                }
                else {
                    // this.clearUserAccess();
                    // reject();
                    resolve();
                }
            }
            else {
                _this.clearUserAccess();
                reject();
            }
        });
    };
    SecurityService.prototype.retrieveUserNames = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        return new Promise(function (resolve, reject) {
            _this.getUsers().subscribe(function (x) {
                x.result.forEach(function (user) {
                    _this.userNames.set(user.userId, user.username);
                });
                resolve();
            }, function (e) {
                console.log(e);
                reject(e);
            });
        });
    };
    SecurityService.prototype.SimpleTenantDtoSorter = function (a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    };
    SecurityService.prototype.doesUserAccessHavePermissions = function (permissions, requiresAll) {
        var e_1, _a;
        if (requiresAll === void 0) { requiresAll = false; }
        if (this.userAccess) {
            if (!permissions || permissions.length === 0) {
                return true;
            }
            if (requiresAll) {
                var _loop_1 = function (permission) {
                    var hasPermission = this_1.userAccess.permissions.some(function (up) { return permission.toLowerCase() === up.toLowerCase(); });
                    if (!hasPermission) {
                        return { value: false };
                    }
                };
                var this_1 = this;
                try {
                    for (var permissions_1 = __values(permissions), permissions_1_1 = permissions_1.next(); !permissions_1_1.done; permissions_1_1 = permissions_1.next()) {
                        var permission = permissions_1_1.value;
                        var state_1 = _loop_1(permission);
                        if (typeof state_1 === "object")
                            return state_1.value;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (permissions_1_1 && !permissions_1_1.done && (_a = permissions_1.return)) _a.call(permissions_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return true;
            }
            else {
                var hasAtLeastOnePermission = this.userAccess.permissions.some(function (up) { return permissions.some(function (p) { return up.toLowerCase() === p.toLowerCase(); }); });
                if (hasAtLeastOnePermission) {
                    return true;
                }
            }
        }
        return false;
    };
    SecurityService.prototype.doesUserAccessHaveTenants = function () {
        if (this.userAccess) {
            if (this.userAccess.hasAllTenants || (this.userAccess.tenants && this.userAccess.tenants.length > 0)) {
                return true;
            }
        }
        return false;
    };
    // private getUserAccessTenants(): Array<Number> {
    //   if (this.userAccess) {
    //     return this.userAccess.tenants;
    //   }
    //   return [];
    // }
    SecurityService.prototype.getUserPermissions = function () {
        if (this.userAccess) {
            return this.userAccess.permissions;
        }
        return [];
    };
    SecurityService.prototype.shouldRefreshUserAccess = function (override) {
        if (override) {
            return true;
        }
        if (!this.userAccess) {
            return true;
        }
        var userAccessExpiresInVal = sessionStorage.getItem(this.userAccessExpiresInKey);
        if (!userAccessExpiresInVal) {
            return true;
        }
        else {
            var userAccessExpiresIn = Number(userAccessExpiresInVal);
            if (new Date().getTime() > userAccessExpiresIn) {
                return true;
            }
        }
        return false;
    };
    SecurityService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AuthService,
            ClientService,
            Security,
            ApplicationInsightsService])
    ], SecurityService);
    return SecurityService;
}());
export { SecurityService };
//# sourceMappingURL=security.service.js.map