import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NotificationService } from '../../../core/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Item } from '../../../core/client.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { System, BlackoutHoldDto, BlackoutHoldSearchFilterDto } from '../../../shared/service-clients/system';
import { TranslationHelperService } from '../../../core/translation-helper.service';
import { TableColumn, TableLoadEvent } from '../../../shared/components/responsive-datatable/table.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'samplicity-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  @Input() displayCloseButton = true;
  @ViewChild('blackoutHoldDialog', {static:false}) private blackoutHoldDialog;
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
  blackoutHoldTitle: string;
  blackoutHoldColumns: TableColumn[];
  blackoutHolds: BlackoutHoldDto[] = [];

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
    private dialog: MatDialog,
    private systemService: System) {
    notification.globalErrors$.subscribe((error: HttpErrorResponse) => {
      this.serverError = true;
    });
  }

  ngOnInit() { }

  hideCloseButton(): void {
    this.displayCloseButton = false;
  }

  displaySuccessMessage(successMessage: string, successTitle?: string) {
    this.successMessage = successMessage;
    if (successTitle) {
      this.successTitle = successTitle;
    }
    this.removeMessage('info');
    this.removeMessage('warning');
    this.removeMessage('error');
  }

  displayInfoMessage(infoMessage: string, infoTitle?: string) {
    this.infoMessage = infoMessage;
    if (infoTitle) {
      this.infoTitle = infoTitle;
    }
    this.removeMessage('success');
    this.removeMessage('warning');
    this.removeMessage('error');
  }

  displayWarningMessage(warningMessage: string, warningTitle?: string) {
    this.warningMessage = warningMessage;
    if (warningTitle) {
      this.warningTitle = warningTitle;
    }
    this.removeMessage('info');
    this.removeMessage('error');
  }

  displayErrorMessage(errorMessage: string, errorTitle?: string) {
    this.errorMessage = errorMessage;
    if (errorTitle !== undefined) {
      this.errorTitle = errorTitle;
    }
    this.removeMessage('info');
    this.removeMessage('warning');
    this.removeMessage('success');
  }

  removeMessage(type: string = ''): void {
    if (type === 'success') {
      this.successMessage = '';
      this.successTitle = '';
    } else if (type === 'info') {
      this.infoMessage = '';
      this.infoTitle = '';
    } else if (type === 'warning') {
      this.warningMessage = '';
      this.warningTitle = '';
    } else if (type === 'error') {
      this.errorTitle = '';
      this.errorMessage = '';
      this.serverError = false;
      this.serverValidationErrors = [];
    } else {
      this.successMessage = '';
      this.successTitle = '';
      this.infoMessage = '';
      this.infoTitle = '';
      this.errorTitle = '';
      this.errorMessage = '';
      this.serverError = false;
      this.serverValidationErrors = [];
    }
  }

  removeAllMessages(): void {
    this.removeMessage('success');
    this.removeMessage('info');
    this.removeMessage('warning');
    this.removeMessage('error');
  }

  displayInfoMessageWithLinks(infoMessage: any[], infoTitle?: string) {
    this.infoMessageList = infoMessage;

    if (infoTitle) {
      this.infoTitle = infoTitle;
    }
    this.removeMessage('success');
    this.removeMessage('warning');
    this.removeMessage('error');
  }

  openModal(modal: string) {
    if (modal === 'blackoutHold') {
      this.dialogRef = this.dialog.open(this.blackoutHoldDialog, {minWidth: '50vw'});
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }
}
