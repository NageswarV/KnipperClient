import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { TenantService } from '../tenant';
import { BusySpinner } from '../common/busy-spinner';
import { AuthenticationService, LoginData } from './authentication.service';

@Component({
  selector: 'sg-login-cmp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BusySpinner implements OnInit {
  loginData: LoginData = new LoginData();
  loginAttachmentUrls: string[] = [];
  modalRef: NgbModalRef;
  modalOption: NgbModalOptions = { backdrop: 'static' };
  userName: string;
  private tenantDefaultSettings: { [key: string]: string; };

  @ViewChild('expiredpopup', { static: true }) expiredpopup;
  @ViewChild('resetpopup', { static: true }) resetpopup;

  constructor(
    private authenticationService: AuthenticationService,
    private tenantService: TenantService,
    private modalService: NgbModal,
    private router: Router,
    public route: ActivatedRoute
  ) {
    super();
  }

  async ngOnInit() {

  }

  get doShowPasswordResetLink(): boolean {
    return true;
  }

  btnSignInClickHandler() {
    this.authenticationService.login({
      userName: this.loginData.userName.trim(),
      password: this.loginData.password});
  };

  passwordExpired(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.router.navigate(['/passwordreset'], { queryParams: { emailAddress: this.loginData.userName, expired: true } });
  }

  resetRequired(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.router.navigate(['/passwordforgot']);
  }
}
