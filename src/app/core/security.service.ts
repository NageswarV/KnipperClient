import { Injectable, EventEmitter } from '@angular/core';
import {
  Security,
  UserAccessDto, RoleSearchFilterDto, RoleDto, UserSearchFilterDto, UserClientSearchFilterDto, ActiveDirectoryUserSearchFilterDto, UserDto, UserLogDto
} from '../shared/service-clients/security';
import { SimpleTenantDto } from '../shared/service-clients/tenant';
import { AuthService } from '../core/auth.service';
import { ClientService } from '../core/client.service';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { ApplicationInsightsService } from '../core/applications-insights.service';

@Injectable()
export class SecurityService {
  private readonly userAccessExpiresInKey: string = 'samplicity-user-access-expiry';
  private readonly userAccessExpiresInMinutes = 120; // TODO Move userAccessExpiresInMinutes to config

  private userAccess: UserAccessDto = null;
  private userNames: Map<number, string>;
  public userAccessSubject = new AsyncSubject();
  public cacheReadySubject = new AsyncSubject();
  public onUserAccessChange: EventEmitter<UserAccessDto> = new EventEmitter<UserAccessDto>();

  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private securityClient: Security,
    private applicationInsightsService: ApplicationInsightsService
  ) {
    this.userNames = new Map<number, string>();
  }

  public load() {
    this.retrieveUserNames().then(() => {
      console.log('Username Cache Ready!');
      this.cacheReadySubject.next(true);
      this.cacheReadySubject.complete();
    }).catch((e) => {
      console.log(e);
    });
  }

  public canNavigate(permissions: Array<string>, requiresAll: boolean = false): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (this.userAccess) {
        const canNav = this.doesUserAccessHaveTenants() && this.doesUserAccessHavePermissions(permissions, requiresAll);
        resolve(canNav);
      } else {
        this.retrieveUserAccess().then(() => {
          const canNav = this.doesUserAccessHaveTenants() && this.doesUserAccessHavePermissions(permissions, requiresAll);
          resolve(canNav);
        }).catch(() => {
          resolve(false);
        });
      }
    });
  }

  public checkPermissions(permissions: Array<string>, requiresAll: boolean = false): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (this.userAccess) {
        resolve(this.doesUserAccessHavePermissions(permissions, requiresAll));
      } else {
        this.retrieveUserAccess().then(() => {
          resolve(this.doesUserAccessHavePermissions(permissions, requiresAll));
        }).catch(() => {
          resolve(false);
        });
      }
    });
  }

  public checkPermission(permission: string): Promise<boolean> {
    return this.checkPermissions([permission]);
  }

  public getPermissions(): Promise<Array<string>> {
    return new Promise<Array<string>>((resolve) => {
      if (this.userAccess) {
        resolve(this.getUserPermissions());
      } else {
        this.retrieveUserAccess().then(() => {
          resolve(this.getUserPermissions());
        }).catch(() => {
          resolve([]);
        });
      }
    });
  }

  public getUserAccess(): Promise<UserAccessDto> {
    return new Promise<UserAccessDto>((resolve) => {
      if (this.userAccess) {
        resolve(this.userAccess);
      } else {
        this.retrieveUserAccess().then(() => {
          if (this.userAccess) {
            resolve(this.userAccess);
          } else {
            resolve(null);
          }
        }).catch(() => {
          resolve(null);
        });
      }
    });
  }

  public getUserName(id: number): string {
    return this.userNames.get(id);
  }

  public refreshUserAccess(): Promise<{}> {
    return this.retrieveUserAccess(true);
  }

  public clearUserAccess() {
    sessionStorage.removeItem(this.userAccessExpiresInKey);
    this.userAccess = null;
  }

  //#region Roles
  public getRoleById(id: string) {
    return this.securityClient.getRoleById(id);
  }

  public getNewRole() {
    return this.securityClient.getNewRole();
  }

  public getRoles() {
    return this.securityClient.getRoles();
  }

  public searchRoles(filter: RoleSearchFilterDto) {
    return this.securityClient.searchRoles(filter);
  }

  public createRole(roleDto: RoleDto) {
    return this.securityClient.createRole(roleDto);
  }

  public updateRole(roleDto: RoleDto) {
    return this.securityClient.updateRole(roleDto);
  }

  public searchActiveUserEmailsForRole(filter: RoleSearchFilterDto) {
    return this.securityClient.searchActiveUserEmailsForRole(filter);
  }

  public searchPermissionsForRole(filter: RoleSearchFilterDto) {
    return this.securityClient.searchPermissionsForRole(filter);
  }

  public deleteRole(roleDto: RoleDto) {
    return this.securityClient.deleteRole(roleDto.id);
  }
  //#endregion Roles

  //#region Users
  public searchUsers(filter: UserSearchFilterDto) {
    return this.securityClient.searchUsers(filter);
  }

  public searchClientsForUser(filter: UserClientSearchFilterDto) {
    return this.securityClient.searchClientsForUser(filter);
  }

  public searchActiveDirectoryUsers(filter: ActiveDirectoryUserSearchFilterDto) {
    return this.securityClient.searchActiveDirectoryUsers(filter);
  }

  public getNewUser(activeDirectoryUserId: string) {
    return this.securityClient.getNewUser(activeDirectoryUserId);
  }

  public getUserById(id: string) {
    return this.securityClient.getUserById(id);
  }

  public createUser(userDto: UserDto) {
    return this.securityClient.createUser(userDto);
  }

  public updateUser(userDto: UserDto) {
    return this.securityClient.updateUser(userDto);
  }

  public getUsers() {
    return this.securityClient.getUsers();
  }

  public getUserProfiles() {
    return this.securityClient.getUserProfiles();
  }

  public logUserSession(userLogDto: UserLogDto) {
    return this.securityClient.logUserSession(userLogDto);
  }
  //#endregion Users

  //#region Private Methods

  private retrieveUserAccess(refresh: boolean = false): Promise<{}> {
    return new Promise((resolve, reject) => {
      const username = this.authService.getUsername();
      if (username) {
        if (this.shouldRefreshUserAccess(refresh)) {
          this.securityClient.getUserAccess(username).subscribe(x => {
            this.userAccess = x.result;
            // Setting Default ClientId
            if (!this.clientService.getClientId()) {
              if (this.userAccess.tenants && this.userAccess.tenants.length > 0) {
                this.clientService.setClientId(this.userAccess.defaultTenantId);
              }
            }
            const userAccessExpiresIn = new Date().getTime() + (this.userAccessExpiresInMinutes * 60000);
            sessionStorage.setItem(this.userAccessExpiresInKey, userAccessExpiresIn.toString());
            console.log('Loaded User Access!');
            console.log(this.userAccess);

            this.userAccessSubject.next(this.userAccess);
            this.userAccessSubject.complete();
            this.onUserAccessChange.emit(this.userAccess);

            this.applicationInsightsService.setUserId(this.userAccess.username);
            resolve();
          }, (e: any) => {
            console.log(e);
            reject(e);
          });
        } else {
          // this.clearUserAccess();
          // reject();
          resolve();
        }
      } else {
        this.clearUserAccess();
        reject();
      }
    });
  }

  private retrieveUserNames(refresh: boolean = false): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.getUsers().subscribe(x => {
        x.result.forEach(user => {
          this.userNames.set(user.userId, user.username);
        });
        resolve();
      }, (e: any) => {
        console.log(e);
        reject(e);
      });
    });
  }

  private SimpleTenantDtoSorter(a: SimpleTenantDto, b: SimpleTenantDto) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  private doesUserAccessHavePermissions(permissions: Array<string>, requiresAll: boolean = false): boolean {
    if (this.userAccess) {
      if (!permissions || permissions.length === 0) {
        return true;
      }
      if (requiresAll) {
        for (const permission of permissions) {
          const hasPermission = this.userAccess.permissions.some(up => permission.toLowerCase() === up.toLowerCase());
          if (!hasPermission) {
            return false;
          }
        }
        return true;
      } else {
        const hasAtLeastOnePermission = this.userAccess.permissions.some(up => permissions.some(p => up.toLowerCase() === p.toLowerCase()));
        if (hasAtLeastOnePermission) {
          return true;
        }
      }
    }
    return false;
  }

  private doesUserAccessHaveTenants(): boolean {
    if (this.userAccess) {
      if (this.userAccess.hasAllTenants || (this.userAccess.tenants && this.userAccess.tenants.length > 0)) {
        return true;
      }
    }
    return false;
  }

  // private getUserAccessTenants(): Array<Number> {
  //   if (this.userAccess) {
  //     return this.userAccess.tenants;
  //   }
  //   return [];
  // }

  private getUserPermissions(): Array<string> {
    if (this.userAccess) {
      return this.userAccess.permissions;
    }
    return [];
  }

  private shouldRefreshUserAccess(override: boolean): boolean {
    if (override) {
      return true;
    }
    if (!this.userAccess) {
      return true;
    }
    const userAccessExpiresInVal = sessionStorage.getItem(this.userAccessExpiresInKey);
    if (!userAccessExpiresInVal) {
      return true;
    } else {
      const userAccessExpiresIn = Number(userAccessExpiresInVal);
      if (new Date().getTime() > userAccessExpiresIn) {
        return true;
      }
    }
    return false;
  }

  //#endregion
}
