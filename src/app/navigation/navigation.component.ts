
import { forkJoin as observableForkJoin, Observable } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Permissions } from '../../generated/permission-set';

import { UtilityService } from '../shared/utility.service';
import { CacheService } from '../cache';
import { ValidationService } from '../validation';
import { AuthenticationService } from '../authentication';

@Component({
  selector: 'sg-main-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  readonly viewShoppingCart = [Permissions.ViewShoppingCart];
  readonly addressBookPermissions = [Permissions.EditAddressBook];
  readonly viewHcpUsersPermissions = [Permissions.ViewHcpUserList];
  readonly viewProductCatalogTabPermissions = [Permissions.ViewProductCatalog];
  readonly viewOrderHistoryTabPermissions = [Permissions.ViewMyHcpOrders, Permissions.ViewAllHcpOrders];
  readonly viewResourceManagementTabPermissions = [Permissions.ViewResourceManagement];
  readonly mimicHCPonProgramMSCSiteBasic = [Permissions.MimicHCPonProgramMSCSiteBasic];
  readonly mimicHCPonProgramMSCSiteAdvanced = [Permissions.MimicHCPonProgramMSCSiteAdvanced];

  isLoggedIn = false;

  isImpersonating = false;
  orderCount: number;
  announcementCount: number;
  modalRef: NgbModalRef;
  isExternalLogin = false;
  isAocOrdersPending = false;
  isProgramDeactivated: boolean = false;
  isSAImpersonating: boolean = false;
  mimicBasic: boolean = false;
  mimicAdvanced: boolean = false;

  @ViewChild('cartitemspopup', { static: true }) cartitemspopup;

  constructor(
    private modalService: NgbModal,
    private utilityService: UtilityService,
    private validationService: ValidationService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private cacheService: CacheService
  ) {
    let prevValue = 0;
    
    
  }

  async ngOnInit() {
    this.authenticationService.isLoggedIn.subscribe(x=> {
       this.isLoggedIn = x;
      });
    //this.isLoggedIn = true;
  }

  signOut(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }

    this.authenticationService.signOut();
  }

  gotoCart() {
    if (this.modalRef) {
      this.modalRef.close();
    }

    this.router.navigate(['/order/cart']);
  }
}
