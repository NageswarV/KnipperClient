import { Component, OnInit, Input, Output, ContentChild, TemplateRef, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { TableColumn } from '../table.model';

@Component({
  selector: '[samplicity-expandable-table-row]',
  templateUrl: './expandable-table-row.component.html',
  styleUrls: ['./expandable-table-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpandableTableRowComponent implements OnInit {

  @Input() item: object;
  @Input() columns: TableColumn[];
  @Input() colspan: number;
  @Output() sortEvent = new EventEmitter<TableColumn>();
  @ContentChild(TemplateRef, {static:false}) cellTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

  trackColumn(index: number, item: object): string {
    return item['name'];
  }

  onInfoRowSort(column: TableColumn): void {
    this.sortEvent.emit(column);
  }

}
