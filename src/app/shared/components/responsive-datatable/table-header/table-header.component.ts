import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TableColumn, SortEvent } from '../table.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Language } from 'angular-l10n';

@Component({
  selector: '[samplicity-table-header]',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class ResponsiveDataTableHeaderComponent implements OnInit, AfterViewInit {

  @Language() lang;

  @Input() selectColumn: TableColumn;
  @Input() columns: TableColumn[];
  @Input() selectColumnText: string;
  @Input() selectEnabled: boolean;
  @Input() selectAllEnabled: boolean;
  @Input() disableSorting: boolean;
  @Input() disableSelectSorting: boolean;
  @Input() translateParams: object;
  @Input() readonly = false;
  @Input() hideColumn: false;

  @Output() sortEvent: EventEmitter<SortEvent> = new EventEmitter<SortEvent>();
  @Output() selectAllEvent: EventEmitter<MatCheckboxChange> = new EventEmitter<MatCheckboxChange>();
  @Output() collapseEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  isCollapsed: boolean;
  windowResize$: Observable<Event>;
  windowResizeSub: Subscription;

  constructor() { }

  ngOnInit() {
    this.processCollapsed();
    this.windowResize$ = Observable.fromEvent(window, 'resize');
    this.windowResizeSub = this.windowResize$.subscribe(() => {
      this.processCollapsed();
    });
  }

  ngAfterViewInit() {
  }

  onSort(header: TableColumn): void {
    if (this.disableSorting || header.sortEnabled === false) {
      return;
    }
    this.resetSorts(header);
    if (header.sortDir === 'asc') {
      header.sortDir = 'desc';
    } else {
      header.sortDir = 'asc';
    }
    const sort: SortEvent = { sortName: header.name, sortDir: header.sortDir };
    this.sortEvent.emit(sort);
  }

  resetSorts(column: TableColumn): void {
    const index = this.columns.indexOf(column);
    if (this.selectColumn && column.name != this.selectColumn.name) {
      this.selectColumn.sortDir = undefined;
    }
    this.columns.forEach((col, i) => {
      if (i !== index) { col.sortDir = undefined; }
    });
  }

  onSelectAll(event: MatCheckboxChange): void {
    this.selectAllEvent.emit(event);
  }

  getColSpan(first: boolean): number {
    return this.isCollapsed && first ? 2 : 1;
  }

  processCollapsed(): void {
    const screenWidth = window.innerWidth;
    const xxl4 = 2064;
    const xxl3 = 1864;
    const xxl2 = 1824;
    const xxl1 = 1784;
    const xxl = 1744;
    const xl3 = 1704;
    const xl2 = 1664;
    const xl1 = 1624;
    const xl = 1584;
    const lg3 = 1544;
    const lg2 = 1504;
    const lg1 = 1464;
    const lg = 1424;
    const md3 = 1384;
    const md2 = 1344;
    const md1 = 1304;
    const md = 1264;
    const sm1 = 1224;
    const sm = 1184;
    const xs1 = 1144;
 
    if (screenWidth >= xxl4) {
      this.checkCollapse(['collapsed']);
    }  else if (screenWidth < xxl4 && screenWidth >= xxl3) {
      this.checkCollapse(['collapsed', 'xxl4']);
    } else if (screenWidth < xxl3 && screenWidth >= xxl2) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3']);
    } else if (screenWidth < xxl2 && screenWidth >= xxl1) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2']);
    } else if (screenWidth < xxl1 && screenWidth >= xxl) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1']);
    } else if (screenWidth < xxl && screenWidth >= xl3) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl']);
    } else if (screenWidth < xl3 && screenWidth >= xl2) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3']);
    } else if (screenWidth < xl2 && screenWidth >= xl1) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2']);
    } else if (screenWidth < xl && screenWidth >= xl) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1']);
    } else if (screenWidth < xl && screenWidth >= lg3) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl']);
    } else if (screenWidth < lg3 && screenWidth >= lg2) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3']);
    } else if (screenWidth < lg2 && screenWidth >= lg1) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2']);
    } else if (screenWidth < lg1 && screenWidth >= lg) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2', 'lg1']);
    } else if (screenWidth < lg && screenWidth >= md3) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2', 'lg1', 'lg']);
    } else if (screenWidth < md3 && screenWidth >= md2) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2', 'lg1', 'lg', 'md3']);
    } else if (screenWidth < md2 && screenWidth >= md1) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2', 'lg1', 'lg', 'md3', 'md2']);
    } else if (screenWidth < md1 && screenWidth >= md) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2', 'lg1', 'lg', 'md3', 'md2', 'md1']);
    } else if (screenWidth < md && screenWidth >= sm1) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2', 'lg1', 'lg', 'md3', 'md2', 'md1', 'md']);
    } else if (screenWidth < sm1 && screenWidth >= sm) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2', 'lg1', 'lg', 'md3', 'md2', 'md1', 'md', 'sm1']);
    } else if (screenWidth < sm && screenWidth >= xs1 ) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2', 'lg1', 'lg', 'md3', 'md2', 'md1', 'md', 'sm1', 'sm']);
    } else if (screenWidth < xs1) {
      this.checkCollapse(['collapsed', 'xxl4', 'xxl3', 'xxl2', 'xxl1', 'xxl', 'xl3', 'xl2', 'xl1', 'xl', 'lg3', 'lg2', 'lg1', 'lg', 'md3', 'md2', 'md1', 'md', 'sm1', 'sm', 'xs1']);
    }
  }

  checkCollapse(sizeArray: string[]): void {
    const sizes: string[] = [];
    let output = false;
    this.columns.forEach(header => sizes.push(header.visibility));
    sizeArray.forEach(size => {
      if (sizes.indexOf(size) >= 0) { output = true; }
    });
    this.setCollapseState(output);
  }

  setCollapseState(newState: boolean): void {
    this.isCollapsed = newState;
    this.collapseEvent.emit(newState);
  }

}
