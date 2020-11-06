import { Component, OnInit, Input, ViewChild, EventEmitter, Output, Inject, Optional } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Item, ClientService } from '../../../core/client.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableColumn, TableLoadEvent } from '../../../shared/components/responsive-datatable/table.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { TranslationHelperService } from '../../../core/translation-helper.service';
import { OrderManagementOrder } from '../../../shared/service-clients/om-order';
import { OrderManagementDashboard, SimpleOrderDto } from '../../../shared/service-clients/om-dashboard';
import { Injectable } from '@angular/core';
import { SamplicityPermission } from '../../../common/permissions';
import { MomentDatePipe, MomentDateTimePipe } from '../../../shared/pipes';
import { LocaleService } from 'angular-l10n';


@Component({
  selector: 'samplicity-order-list-modal',
  templateUrl: './order-list-modal.component.html',
  styleUrls: ['./order-list-modal.component.scss'],
})
export class OrderListModalComponent implements OnInit {

  @Input() displayCloseButton = true;
  @Output() close: EventEmitter<any> = new EventEmitter();
  successMessage: string;
  successTitle: string;
  infoMessage: string;
  infoTitle: string;
  warningMessage: string;
  warningTitle: string;
  errorMessage: string;
  errorTitle: string;
  serverError: boolean;
  serverValidationErrors: object[] = [];
  infoMessageList: Item[] = [];

  dialogRef: MatDialogRef<any>;
  filterForm: FormGroup;
  modalTitle: string;
  tableTitle: string;
  orderListColumns: TableColumn[];
  orderListItems: SimpleOrderDto[] = [];

  programId: string;
  status: string;
  orderStatusId: string;

  constructor(dialogRef: MatDialogRef<OrderListModalComponent>,
    private fb: FormBuilder,
    private clientService: ClientService,
    private locale: LocaleService,
    private omDashboardClient: OrderManagementDashboard,
    private translationHelperService: TranslationHelperService,
    @Optional() @Inject(MAT_DIALOG_DATA) data: {label: string, id: string, value: string, programId: string}) {
      this.dialogRef = dialogRef;
      this.programId = data.programId;
      this.status = data.label;
      this.orderStatusId = data.id;
      this.modalTitle = this.translationHelperService.translate('Dashboard.OrderListModal.Title').replace('{0}', this.status);
      this.tableTitle = this.translationHelperService.translate('Dashboard.OrderListModal.TableTitle')
      .replace('{0}', this.status);
    }

  ngOnInit() {
    this.displayOrderStatusPastTimeThresholdList();
    this.omDashboardClient.searchOrdersPastStatusTimeThresholdDateList(this.programId, this.orderStatusId)
      .subscribe((response) => {
      this.orderListItems = response.result;
      this.tableTitle = this.tableTitle.replace('{1}', this.orderListItems.length.toString());
      });
  }

  hideCloseButton(): void {
    this.displayCloseButton = false;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  displayOrderStatusPastTimeThresholdList(): void {
    const selectedClientId = this.clientService.getClientId();
    this.orderListColumns = [{
      name: 'orderId',
      displayName: 'Dashboard.OrderListModal.OrderNumber',
      visibility: 'xs',
      linkRoute: '/' + selectedClientId + '/orders/detail',
      linkPermission: SamplicityPermission.Order.OrdersDetailView,
      linkParam: 'id',
      linkDisplay: 'orderId',
    }, {
      name: 'orderPassedThresholdDate',
      pipe: new MomentDateTimePipe(this.translationHelperService.translationService),
      displayName: 'Dashboard.OrderListModal.DateTimePastThreshold',
      sortDir: 'asc',
      visibility: 'xs',
    }];

  }
}
