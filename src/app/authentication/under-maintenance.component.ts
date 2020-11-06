import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslationService } from 'angular-l10n';

import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { BusySpinner } from '../common/busy-spinner';
import { AuthenticationService, LoginData } from './authentication.service';

@Component({
  selector: 'sg-under-maintenance-cmp',
  templateUrl: './under-maintenance.component.html',
  styleUrls: ['./under-maintenance.component.scss']
})
export class UnderMaintenanceComponent extends BusySpinner implements OnInit {
  loginData: LoginData = new LoginData();
  modalRef: NgbModalRef;
  modalOption: NgbModalOptions = { backdrop: 'static' };

  constructor(
    private translationService: TranslationService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
  }
}
