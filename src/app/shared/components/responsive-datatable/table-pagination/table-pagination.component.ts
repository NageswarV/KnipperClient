import { Component, OnInit, AfterViewInit, Input, Output,
  EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, HostListener, OnDestroy } from '@angular/core';
import { FilterService } from '../../../../core/filter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'samplicity-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class ResponsiveDataTablePaginationComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() perPage = 0;
  @Input() pageNum = 1;
  @Input() pageSegment = 5;
  @Input() fixedFooter = false;
  @Input() pageDisplay: string;
  @Input() dialog = false;
  @Input() isFilterShown: boolean;
  @Output() paginateEvent: EventEmitter<number> = new EventEmitter<number>();

  _totalCount: number;
  @Input('totalCount') set totalCount(value: number) {
    this._totalCount = value;
    this.loadPages();
  }
  get totalCount(): number {
    return this._totalCount;
  }

  paginateSub: Subscription;

  pages: number[];
  lastPage: number;
  displayFirstPage: boolean;
  displayLastPage: boolean;
  displayScrollButton: boolean;
  
  bottomOfPage: boolean;

  constructor(
    private filterService: FilterService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.loadPages();
  }

  ngAfterViewInit() {
    this.displayScrollButton = this.fixedFooter;
    if (!this.cd['destroyed']) {
      this.cd.detectChanges();
    }
    // this.filterService.getFilterShown().subscribe(x => {
    //   this.isFilterShown = x;

    //   if (!this.cd['destroyed']) {
    //     this.cd.detectChanges();
    //   }
    // });
  }

  // @HostListener('window:scroll', [])
  // onScroll(): void {
  //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //     this.bottomOfPage = true;
  //   } else {
  //     this.bottomOfPage = false;
  //   }
  // }

  scrollToTop() {
    window.scroll(0, 0);
  }

  paginate(page: number) {
    this.pageNum = page;
    this.paginateEvent.emit(page);
    this.loadPages();
  }

  paginatePrevious() {
    this.paginate(this.pageNum - 1);
  }

  paginateNext() {
    this.paginate(this.pageNum + 1);
  }

  paginateFirstEllipses() {
    this.paginate(Math.max(this.pageNum - this.pageSegment, 1));
  }

  paginateLastEllipses() {
    this.paginate(Math.min(this.pageNum + this.pageSegment, this.lastPage));
  }

  loadPages(): void {
    if (!this.totalCount) {
      return;
    }

    const pageTotal = Math.ceil(this.totalCount / this.perPage);
    this.lastPage = pageTotal;

    this.displayFirstPage = this.pageNum > this.pageSegment - 1;
    this.displayLastPage = this.pageNum <= this.lastPage - this.pageSegment + 1;

    let pageStart = this.pageNum - 1;
    let pageEnd = this.pageNum + 1;

    if (!this.displayFirstPage) {
      pageStart = 2;
      pageEnd = this.pageSegment;
    }
    if (!this.displayLastPage) {
      pageStart = pageTotal - this.pageSegment + 1;
      pageEnd = pageTotal - 1;
    }

    pageStart = Math.max(pageStart, 2);
    pageEnd = Math.min(pageEnd, pageTotal - 1);

    this.pages = [];
    for (let c: number = pageStart; c <= pageEnd; c++) {
      this.pages.push(c);
    }
  }

  ngOnDestroy(): void {
    this.cd.detach();
    if (this.paginateSub) {
      this.paginateSub.unsubscribe();
    }
  }
}
