import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { NotificationService } from '../../../../core/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Item } from '../../../../core/client.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { System, BlackoutHoldDto, BlackoutHoldSearchFilterDto } from '../../../../shared/service-clients/system';
import { TableColumn, TableLoadEvent } from '../../../components/responsive-datatable/table.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'samplicity-blackout-hold-modal',
  templateUrl: './blackout-hold-modal.component.html',
  styleUrls: ['./blackout-hold-modal.component.scss'],
})
export class BlackoutHoldModalComponent implements OnInit {

  @Input() displayCloseButton = true;
  @ViewChild('blackoutHoldDialog', { static: false }) private blackoutHoldDialog;
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
  blackoutHoldTitle: string;
  blackoutHoldColumns: TableColumn[];
  blackoutHolds: BlackoutHoldDto[] = [];

  constructor(
    private fb: FormBuilder,
    //private notification: NotificationService,
    private dialog: MatDialog,
    private systemService: System) {
    //notification.globalErrors$.subscribe((error: HttpErrorResponse) => {
      //this.serverError = true;
    
  }

  ngOnInit() {
   // this.displayBlackoutHoldList();
  }

  hideCloseButton(): void {
    //this.displayCloseButton = false;
  }

  closeModal(): void {
   // this.close.emit();
  }

  displayBlackoutHoldList(): void {
    //this.systemService.getBlackoutHoldCount().subscribe(
    //  x => {
    //    this.blackoutHoldTitle = 'Affected Zip Code(s) (' + x.result + ')';
    //  });

    //this.blackoutHoldColumns = [{
    //  name: 'zipCode',
    //  displayName: 'Notifications.BlackoutHold.ZipCode',
    //  visibility: 'xs',
    //  sortDir: 'asc'
    //}, {
    //  name: 'stateName',
    //  displayName: 'Notifications.BlackoutHold.State',
    //  visibility: 'xs',
    //}];

  }


  loadData(loadEvent: TableLoadEvent): Observable<any> {
    const filter: BlackoutHoldSearchFilterDto = new BlackoutHoldSearchFilterDto({
      pageSize: loadEvent.perPage,
      pageNumber: loadEvent.pageNum,
      sortBy: loadEvent.sort ? loadEvent.sort.sortName + ' ' + loadEvent.sort.sortDir : '',
      filterString: ''
    });

    return this.systemService.searchBlackoutHolds(filter).map(x => x.result);
  }
}
