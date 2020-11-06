import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatMenuTrigger, MatMenu } from '@angular/material/menu';
import { NavbarSchema, NavbarMenuSection, NavbarLink } from '../../../shared/components/navbar/navbar.model';
import { AuthService } from '../../../core/auth.service';
import { Subscription } from 'rxjs/Subscription';

import { LocaleService } from 'angular-l10n';
import { SecurityService } from '../../../core/security.service';
import { ClientService } from '../../../core/client.service';
import { TenantModuleDto } from '../../../shared/service-clients/tenant';
import { ClassificationValues } from '../../../common/classification-value';
import { UserAccessDto } from '../../../shared/service-clients/security';
import { SamplicityPermission } from '../../../common/permissions';

@Component({
  selector: 'samplicity-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @ViewChild('setupMenuTrigger', {static:false}) setupMenuTrigger: MatMenuTrigger;
  @ViewChild('navMenuTrigger', { static: false }) navMenuTrigger;
  @ViewChild('dropdownPane', { static: false }) dropdownPane;
  @ViewChild('nestedDropdownPane', { static: false }) nestedDropdownPane;
  @Input() navbarSchema: NavbarSchema;

  isIE11: boolean;
  isSafari: boolean;
  isFirefox: boolean;
  isLoggedIn = false;
  isPermissionsLoaded = false;
  nestedDropdownMenuSections: NavbarMenuSection[];
  private securityServiceUserAccessSub: Subscription;
  showDashboard = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public locale: LocaleService,
    public router: Router,
    private authService: AuthService,
    private securityService: SecurityService,
    private clientService: ClientService
  ) {
    this.securityServiceUserAccessSub = this.securityService.onUserAccessChange.subscribe({
      next: (userAccess: UserAccessDto) => {
        // this.handleUserAccess(userAccess);
        this.refreshCurrentClientDetails();
      }
    });
  }

  ngOnInit() {
    this.setReuseRouteStrategy();
    this.checkBrowser();

    this.securityService.userAccessSubject.subscribe((userAccess: any) => {
      // this.handleUserAccess(userAccess);
        this.refreshCurrentClientDetails();
    });
    this.securityService.checkPermission(SamplicityPermission.Dashboard.DashboardView).then(x => {
      if (x) {
        this.showDashboard = true;
      }
    });

    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  ngOnDestroy() {
    if (this.securityServiceUserAccessSub) {
      this.securityServiceUserAccessSub.unsubscribe();
    }
  }

  checkPermissions(permissions: Array<string>) {
    for (const link of this.navbarSchema.links) {
      this.setMenuElementsVisibility(permissions, link);
    }

    if (this.navbarSchema.logoPermissions
      && this.navbarSchema.logoPermissions.length > 0
      && !this.hasAnyPermissions(permissions, this.navbarSchema.logoPermissions)) {
      this.navbarSchema.logoLink = undefined;
    }
    this.setDtrAndFgMenuVisibility();
  }

  private refreshCurrentClientDetails() {
    this.clientService.getCurrentClientDetails().subscribe((client) => {
      if (client) {
        if (client.tenantModules.length === 1) {
          const status = client.tenantModules[0].tenantModuleStatusClassificationValueId;
          const isActive = (
            status === ClassificationValues.TENANT_MODULE_STATUS_ACTIVE
            || status === ClassificationValues.TENANT_MODULE_STATUS_NEW
          );
          this.clientService.setIsCurrentClientActive(isActive);
        } else {
          this.clientService.setIsCurrentClientActive(false);
        }
      }
      this.changeDetectorRef.detectChanges();
    });
  }

  setDtrAndFgMenuVisibility(): void {
    const observable = this.clientService.getCurrentClientDetails();
    observable.subscribe((client) => {
      if (client) {
        if (client.tenantModules.length === 1) {
          const status = client.tenantModules[0].tenantModuleStatusClassificationValueId;
          const isActive = (
            status === ClassificationValues.TENANT_MODULE_STATUS_ACTIVE
            || status === ClassificationValues.TENANT_MODULE_STATUS_NEW
          );
          this.clientService.setIsCurrentClientActive(isActive);
        } else {
          this.clientService.setIsCurrentClientActive(false);
        }
        this.setTenantModules(client.tenantModules);
      }
      this.isPermissionsLoaded = true;
      this.changeDetectorRef.detectChanges();
    });
  }

  setTenantModules(tenantModules: Array<TenantModuleDto>) {
    if (tenantModules) {
      for (const navbarSchemaLink of this.navbarSchema.links) {
        if (navbarSchemaLink.menu && navbarSchemaLink.menu.length > 0) {
          for (const menu of navbarSchemaLink.menu){
            if (menu.classificationType === 'TENANT_MODULE') {
              let showMenu = false;
              for (const link of menu.links) {
                if (link.classificationValue === ClassificationValues.TENANT_MODULE_TYPE_DTP) {
                  const tm = tenantModules.find(x => x.moduleId === link.classificationValue);
                  if (tm) {
                    link.hide = false;
                    link.url = tm.tenantModuleUrlText;
                    showMenu = true;
                  } else {
                    link.hide = true;
                  }
                }
                if (link.classificationValue === ClassificationValues.TENANT_MODULE_TYPE_FGPORTAL) {
                  const tm = tenantModules.find(x => x.moduleId === link.classificationValue);
                  if (tm) {
                    link.hide = false;
                    link.url = tm.tenantModuleUrlText;
                    showMenu = true;
                  } else {
                    link.hide = true;
                  }
                }
              }
              if (showMenu) {
                menu.hide = false;
              } else {
                menu.hide = true;
              }
            }
          }
        }
      }
    }
  }

  setMenuElementsVisibility(userPermissions: string[], navbarLink: NavbarLink) {
    if (navbarLink.menu && navbarLink.menu.length > 0) {
      for (const menu of navbarLink.menu) {
        for (const link of menu.links) {
          this.setMenuElementsVisibility(userPermissions, link);
        }
        if (menu.links.find(x => x.hide === false || x.hide === undefined)) {
          menu.hide = false;
        } else {
          menu.hide = true;
        }
      }
      if (navbarLink.menu.find(x => x.hide === false || x.hide === undefined)) {
        navbarLink.hide = false;
      } else {
        navbarLink.hide = true;
      }
    } else {
      if (navbarLink.permissions && navbarLink.permissions.length > 0) {
        if (this.hasAnyPermissions(userPermissions, navbarLink.permissions)) {
          navbarLink.hide = false;
        } else {
          navbarLink.hide = true;
        }
      } else {
        navbarLink.hide = false;
      }
    }
  }

  hasAnyPermissions(userPermissions: string[], itemPermissions: string[]): boolean {
    if (userPermissions) {
      for (const permission of itemPermissions) {
        if (userPermissions.find(x => x.toLowerCase() === permission.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  }

  checkBrowser(): void {
    const iePattern = new RegExp(/(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:)(\d+)/);
    const ffPattern = new RegExp(/Firefox/);
    if (navigator.userAgent.search(iePattern) > 0) {
      this.isIE11 = true;
    }
    if (navigator.userAgent.search(ffPattern) > 0) {
      this.isFirefox = true;
    }
  }

  changeRoute(url: string): void {
    this.router.navigateByUrl(url);
  }

  setReuseRouteStrategy(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }

  openNavMenu(timeout: number, navMenuTrigger: any, setupMenuTrigger: MatMenuTrigger): void {
    setTimeout(() => this.processOpen(navMenuTrigger, setupMenuTrigger), timeout);
  }

  processOpen(navMenuTrigger: any, setupMenuTrigger: MatMenuTrigger): void {
    if (navMenuTrigger && navMenuTrigger.parentElement && navMenuTrigger.parentElement.querySelector(':hover') === navMenuTrigger) {
      setupMenuTrigger.openMenu();
    }
  }

  closeNavMenu(dropdownPane: any, nestedDropdownPane: any, setupMenuTrigger: MatMenuTrigger): void {
    setTimeout(() => this.processClose(dropdownPane, nestedDropdownPane, setupMenuTrigger), 250);
  }

  processClose(dropdownPane: any, nestedDropdownPane: any, setupMenuTrigger: MatMenuTrigger): void {
    if (nestedDropdownPane && nestedDropdownPane.parentElement
      && nestedDropdownPane.parentElement.querySelector(':hover') === nestedDropdownPane) {
      return;
    } else if (dropdownPane.parentElement.querySelector(':hover') === dropdownPane) {
      return;
    } else {
      setupMenuTrigger.closeMenu();
      this.nestedDropdownMenuSections = [];
    }
  }

  setNestedDropdownMenu(sections: NavbarMenuSection[]): void {
    this.nestedDropdownMenuSections = sections;
  }

  navigateToLogoLink(logoLink: string): void {
    if (logoLink !== undefined && logoLink.length > 0) {
      this.router.navigate([logoLink]);
    }
  }

  navigateToUrl(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  menuOpened(navMenu: any): void {
    navMenu.className = 'nav-item hovered';
  }

  menuClosed(navMenu): void {
    navMenu.className = 'nav-item';
  }

  private handleUserAccess(userAccess: UserAccessDto) {
    if (userAccess) {
      this.checkPermissions(userAccess.permissions);
    }
  }

  isDropdownLinkActive(link: NavbarLink): boolean {
    let hasActiveLink = false;
    if (link.menu && link.menu.length > 0) {
      link.menu.forEach((menuSection) => {
        if (menuSection.links && menuSection.links.length > 0) {
          menuSection.links.forEach(menuLink => {
            if (menuLink.menuChildLinks) {
              menuLink.menuChildLinks.forEach((childLink) => {
                const fullLink = menuLink.link + childLink;
                if (this.router.isActive(fullLink, false)) {
                  hasActiveLink = true;
                }
              });
            } else if (!menuLink.menu) {
              if ( this.router.isActive(menuLink.link, true)) {
                hasActiveLink = true;
              }
            } else {
              menuLink.menu.forEach((subMenu) => {
                const index = subMenu.links.findIndex((subLink) => this.router.isActive(subLink.link, true));
                if ( index > -1) {
                  hasActiveLink = true;
                }
              });
            }
          });
        }
      });
    }
    return hasActiveLink;
  }
}
