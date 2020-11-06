import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  Input,
  Output,
  ViewChild,
  ContentChild,
  TemplateRef,
  ElementRef,
  HostListener,
  EventEmitter,
  ChangeDetectorRef,
  AfterViewChecked,
  ChangeDetectionStrategy,
  SimpleChanges
} from '@angular/core';
import { TableColumn, TableLoadEvent, SortEvent, ScrollPosition, TableDto, OnStringCompare, OnDateCompare } from './table.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { Language, TranslationService } from 'angular-l10n';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';
import { exhaustMap, startWith } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'samplicity-responsive-datatable',
  templateUrl: './responsive-datatable.component.html',
  styleUrls: ['./responsive-datatable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponsiveDatatableComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges, OnDestroy {

  @Language() lang: any;
  @Input() items: object[];
  @Input() noDefaultSort = false;
  @Input() staticItems: object[] = [];
  @Input() selectedItems: object[] = [];
  @Input() selectedIdProp = 'id';
  @Input() hightlightProp = 'highlight';
  @Input() itemSelectableProp;
  @Input() disablePreselected = false;
  @Input() preselectedItems: object[];
  @Input() maxItems = 500;
  @Input() perPage = 10;
  @Input() selectColumn: TableColumn;
  @Input() columns: TableColumn[];
  @Input() loadMore: (loadEvent: TableLoadEvent) => Observable<TableDto>;
  @Input() delayedLoadMore = false; // Used if the loadMore function is not available at init
  @Input() selectEnabled: boolean;
  @Input() selectAllEnabled: boolean;
  @Input() selectSingle: boolean;
  @Input() scrollPercentBottom = 75;
  @Input() fixedFooter = false;
  @Input() translateParams: object;
  @Input() noResultsFound = false;
  @Input() noResultsMessage = 'NoSearchResults';
  @Input() description: string | string[] | object[];
  @Input() dialog = false;
  @Input() disableDefaultPagination = false;
  @Input() readonly = false;
  @Input() hideSelect = false;
  @Input() valid = true;
  @Input() showEndOfList = true;
  @Output() selectEvent: EventEmitter<object[]> = new EventEmitter<object[]>();
  @Output() showMoreClick: EventEmitter<object[]> = new EventEmitter<object[]>();
  @Output() showLessClick: EventEmitter<object[]> = new EventEmitter<object[]>();
  @Output() columnSortChange: EventEmitter<TableColumn[]> = new EventEmitter<TableColumn[]>();
  @ContentChild(TemplateRef, { static: false }) cellTemplate: TemplateRef<any>;
  @ViewChild('tableHeader', { static: false }) tableHeader: ElementRef;
  @Input() disableSelectSorting: boolean;

  // Allows sorting immediately after enable sort. For static tables that sorts after save
  _disableSorting: boolean;
  @Input('disableSorting') set disableSorting(value: boolean) {
    this._disableSorting = value;
    if (this.staticItems) {
      this.totalCount = this.staticItems.length;
      this.onLoadStatic(this.currentSort);
    }
  }
  get disableSorting(): boolean {
    return this._disableSorting;
  }

  scrollEvent$: Observable<Event>;
  scrolledDown$: Observable<ScrollPosition[]>;
  triggerEventDown$: Observable<ScrollPosition[]>;

  loadMoreSub: Subscription;
  loadMoreTriggerSub: Subscription;
  loadMoreInitialized = false;
  startCount = 0;
  endCount = 0;
  totalCount = 0;
  noMoreItems: boolean;
  isLoading: boolean;
  pageNum = 1;
  pageDisplay: string;
  sortDir: string;
  sortName: string;
  currentSort: SortEvent;
  isInit = false;

  isCalculating: boolean;
  isCollapsed: boolean;
  expandedRows: boolean[] = [];

  constructor(
    private translationService: TranslationService,
    private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (this.loadMore) {
      this.onLoad();
    } else {
      this.isLoading = true;
      if (!this.delayedLoadMore) {
        this.staticInit();
      }
    }

    const hasColumnPermissions = this.columns.some(x => !!(x.linkPermission));
  }

  ngAfterViewChecked() {
    this.cd.detectChanges();
  }

  ngAfterViewInit() {
    // this.registerScrollEvent();
    // this.processScrollEvents();
    // this.triggerEventOnScrollDown();
  }

  // Updates table if staticItems input is changed
  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.staticItems && changes.staticItems.currentValue) {
      this.staticInit();
    }
    if (changes && changes.loadMore && changes.loadMore.currentValue) {
      if (!this.loadMoreInitialized) {
        this.onLoad();
        this.loadMoreInitialized = true;
      }
    }
  }

  staticInit() {
    this.isLoading = true;
    this.totalCount = this.staticItems.length;
    this.currentSort = this.setDefaultSort();
    this.onStaticSort(this.currentSort);
    this.onLoadStatic();
  }

  trackById(index: number, item: object): string {
    return item['id'];
  }

  trackColumn(index: number, item: object): string {
    return item['name'];
  }

  toggleInfoRow(index: number, icon: MatIcon): void {
    this.cd.detectChanges();
    this.expandedRows[index] = !this.expandedRows[index];
    this.expandedRows[index] ?
      icon._elementRef.nativeElement.classList.add('expanded') :
      icon._elementRef.nativeElement.classList.remove('expanded');
  }

  onSort(event: SortEvent): void {
    this.disableSorting = false; 
    if (this.disableSorting) {
      return;
    }
    if (event) {
      this.currentSort = event;
    }
    if (this.loadMore) {
      this.onLoad(this.currentSort);
    } else {
      this.onStaticSort(event);
      this.onLoadStatic(this.currentSort);
    }
    this.cd.detectChanges();
  }

  onStaticSort(event: SortEvent): void {
    if (this.noDefaultSort) {
      return;
    }
    const column = this.columns.find(x => x.name === event.sortName) || this.selectColumn;
    this.columnSortChange.emit(this.columns);
    // Static tables with form inputs are not sortable
    if (column.sortEnabled != null && !column.sortEnabled) {
      return;
    }

    this.staticItems.sort((a, b) => {
      if (column && column.sortFunc) {
        return column.sortFunc(a, b, event);
      }

      if (column) {
        if (a[event.sortName] instanceof Date) {
          return OnDateCompare(a[event.sortName], b[event.sortName], event.sortDir);
        }
        return OnStringCompare(a[event.sortName], b[event.sortName], event.sortDir);
      }
    });
  }

  onInfoRowSort(column: TableColumn): void {
    this.resetSorts(column);
    if (column.sortDir === 'asc') {
      column.sortDir = 'desc';
    } else {
      column.sortDir = 'asc';
    }
    const sort: SortEvent = { sortName: column.name, sortDir: column.sortDir };
    this.onSort(sort);
  }

  resetSorts(column: TableColumn): void {
    const index = this.columns.indexOf(column);
    this.columns.forEach((header, i) => {
      if (i !== index) { header.sortDir = undefined; }
    });
  }

  onCollapseChange(collapseValue: boolean): void {
    this.isCollapsed = collapseValue;
  }

  onSelectAll(event: MatCheckboxChange): void {
    this.selectColumn.selectAll = event.checked;
    if (event.checked) {
      this.selectedItems = Object.assign([], this.staticItems);
    } else {
      this.selectedItems = [];
    }
    this.selectEvent.emit(this.selectedItems);
  }

  onSelect(event: MatCheckboxChange, item: object): void {
    if (this.selectSingle) {
      this.selectedItems = [];
      if (event.source.checked) {
        this.selectedItems.push(item);
      }
    } else {
      const index = this.selectedItems.indexOf(item);
      if (event.checked) {
        if (index < 0) {
          this.selectedItems.push(item);
        }
      } else {
        this.selectColumn.selectAll = event.checked;
        this.selectedItems.splice(index, 1);
      }
    }
    this.selectEvent.emit(this.selectedItems);
  }

  onSingleSelectChecked(item: object): boolean {
    if (this.selectedItems.length > 0 && this.selectedItems[0] === item) {
    return true;
    } else {
      return false;
    }
  }

  checkSelected(item: object, listItems?: object[]): boolean {
    if (this.preselectedItems) {
      if (listItems) {
        return !!(this.preselectedItems.findIndex((selectedItem) => item[this.selectedIdProp] === selectedItem[this.selectedIdProp]) > -1);
      } else {
        return !!(this.selectedItems.findIndex((selectedItem) => item[this.selectedIdProp] === selectedItem[this.selectedIdProp]) > -1);
      }
    } else {
      return !!(this.selectedItems.findIndex((selectedItem) => item[this.selectedIdProp] === selectedItem[this.selectedIdProp]) > -1);
    }
  }

  getSelectedItems() {
    return this.selectedItems;
  }

  checkHightlight(item: object): boolean {
    if (item[this.hightlightProp]) {
      return true;
    } else if (item instanceof FormGroup) {
      return item.contains(this.hightlightProp) && item.get(this.hightlightProp).value;
    } else {
      return false;
    }
  }

  checkSelectable(item: object): boolean {
    if (this.itemSelectableProp) {
      if (item[this.itemSelectableProp]) {
        return true;
      } else if (item instanceof FormGroup) {
        return item.contains(this.itemSelectableProp) && item.get(this.itemSelectableProp).value;
      }
      return false;
    }
    return true;
  }

  registerScrollEvent(): void {
    // this.scrollEvent$ = Observable.fromEvent(window, 'scroll');
  }

  processScrollEvents(): void {
    // this.processScrollDown();
  }

  processScrollDown(): void {
    // this.scrolledDown$ = this.scrollEvent$.map((): ScrollPosition => ({
    //   sH: document.documentElement.scrollHeight,
    //   sT: window.pageYOffset,
    //   cH: document.documentElement.clientHeight
    // }))
    //   .pairwise()
    //   .filter(positions => !this.isLoading && this.isScrollingDown(positions) && this.isScrollExpectedPercentDown(positions[1]));
  }

  isScrollingDown(positions: ScrollPosition[]): boolean {
    // return positions[0].sT < positions[1].sT;
    return false;
  }

  isScrollExpectedPercentDown(position: ScrollPosition): boolean {
    // return ((position.sT + position.cH) / position.sH) > (this.scrollPercentBottom / 100);
    return false;
  }

  triggerEventOnScrollDown() {
    // this.triggerEventDown$ = this.scrolledDown$;
  }

  onReset(sort?: SortEvent) {
    this.items = [];
    this.expandedRows = [];
    this.pageNum = 1;
    this.noMoreItems = false;
    sort = this.setDefaultSort();
  }

  onLoad(sort?: SortEvent, reset: boolean = true): void {
    if (reset) {
      this.totalCount = 0;
      this.onReset();
    }

    this.isLoading = true;
    this.loadMoreSub = this.loadMore({
      pageNum: this.pageNum,
      perPage: this.perPage,
      sort: this.currentSort,
    }).subscribe((x) => {
      this.isLoading = false;
      this.items = x.items;
      this.selectedItems = [];
      this.expandedRows = [];
      x.items.forEach((x) => this.expandedRows.push(false));

      if (x.totalCount) {
        this.totalCount = x.totalCount;
        this.noMoreItems = this.pageNum === Math.ceil(this.totalCount / this.perPage);
      }

      this.updatePageDisplay();
    }, (err) => {
      this.isLoading = false;
      // TODO handle the error
    });
  }

  onLoadStatic(sort?: SortEvent, reset: boolean = true) {
    if (reset) {
      this.onReset();
    }
    if (sort) {
      this.onStaticSort(sort);
    }
    this.updatePageDisplay();
    this.noMoreItems = this.pageNum === Math.ceil(this.totalCount / this.perPage);

    let count = 0;
    this.items = [];
    this.staticItems.forEach(x => {
      count++;
      if (count >= this.startCount && count <= this.endCount) {
        this.items.push(x);
        this.expandedRows.push(false);
      }
    });

    if (this.noResultsFound || this.noMoreItems || this.staticItems.length >= 0) {
      this.isLoading = false;
    }
  }

  triggerLoadData() {
    this.onLoad(undefined, true);
  }

  updatePageDisplay() {
    this.startCount = (this.pageNum - 1) * this.perPage + 1;
    this.endCount = this.startCount + this.perPage - 1;
    if (this.endCount > this.totalCount) {
      this.endCount = this.totalCount;
    }
    if (this.totalCount === 0) {
      this.startCount = 0;
    }

    this.pageDisplay = 'Display ($0 - $1) of $2 results'
      .replace('$0', this.startCount +'')
      .replace('$1', this.endCount +'')
      .replace('$2', this.totalCount +'');
  }

  setDefaultSort(): SortEvent {
    if (this.noDefaultSort) {
      return null;
    }
    if (this.columns) {
      const defaultSort = this.columns.find(this.hasSortProperty) || this.selectColumn;
      const sort: SortEvent = { sortName: defaultSort!.name, sortDir: defaultSort!.sortDir };
      return sort;
    }
    return null;
  }

  hasSortProperty(column: TableColumn): boolean {
    return !!column.sortDir;
  }

  checkStyleApplicable(item, array) {
    if(!array) return false;
    return !!array.find(x => x === item);
  }

  onPaginate(page: number) {
    this.pageNum = page;
    if (this.loadMore) {
      this.onLoad(this.currentSort, false);
    } else {
      this.onLoadStatic(this.currentSort, false);
      if (!this.isInit) {
        this.isInit = true;
        // To update with change detection in the future
        setTimeout(() => {
          this.onPaginate(page);
        }, 300);
      }
      this.cd.detectChanges();
    }
  }

  showLess(){
    this.showLessClick.emit();
  }

  showMore(){
    this.showMoreClick.emit();
  }

  ngOnDestroy() {
    if (this.loadMoreSub) {
      this.loadMoreSub.unsubscribe();
    }
    if (this.loadMoreTriggerSub) {
      this.loadMoreTriggerSub.unsubscribe();
    }
  }
}
