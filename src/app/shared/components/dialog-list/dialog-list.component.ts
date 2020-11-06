import { Component, Input, ViewChild, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { TableColumn } from '../responsive-datatable/table.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface IDialogListOptions {
  dialogTitle: string;
  entityName: string;
  count: string;
  dialogMessage: string;
  closeButtonText: string;
  columns: TableColumn[];
}

@Component({
  selector: 'samplicity-dialog-list',
  templateUrl: './dialog-list.component.html',
  styleUrls: ['./dialog-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogListComponent implements OnInit {

  @ViewChild('dialog', {static:false}) private dialog;

  private options: IDialogListOptions;
  private dialogRef: MatDialogRef<any>;
  loading: boolean = false;

  _items: object[] = [];
  @Input('items') set items(value: object[]) {
    if (value) {
      this._items = value;
      this.loading = false;
    }
  }
  get items(): object[] {
    return this._items;
  }

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
  }

  show(options: IDialogListOptions): void {
    this.loading = true;
    this.options = options;
    this.dialogRef = this.matDialog.open(this.dialog, { minWidth: '40vw' });
    this.dialogRef.afterClosed().subscribe(() => {
      this.options = null;
      this.items = [];
    });
  }
}
