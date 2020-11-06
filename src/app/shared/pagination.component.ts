
import { debounceTime } from 'rxjs/operators';
import { Component, Input, Output, EventEmitter, HostListener, OnChanges, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'sg-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges, OnInit {
    @Input() componentId: number;
    @Input() totalRecordCount: number;
    @Input() pageSize: number;
    @Input() bkpPageSize: number;
    @Input() currentPage: number;
    @Input() autoHide: boolean;
    @Input() disableFloating: boolean;
    @Input() disableScroll: boolean;
    @Input() pageSizeOptions?: any[];
    paginationFloating: boolean;
    paginationUpdate: Subject<MouseEvent> = new Subject<MouseEvent>();
    @Output() emitPageChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() emitpageSizeChange?: EventEmitter<number> = new EventEmitter<number>();
    @Input() fromAnnouncement: boolean;
    @Input() maxSize: number;
    @Input() totalPages: number;
    @Input() fromReport?: boolean;
    @Input() loadMorePagination: boolean;
    @Input() pages?:any[]
    pageDisplay: string = "";
    @Input() pageDisplayText: string
    
    constructor() {
        this.autoHide = true;
        this.pageSize = 0;
        this.totalRecordCount = 0;
    }

    ngOnInit(): void {
        if (!this.disableFloating) {
            this.paginationUpdate.pipe(debounceTime(50)).subscribe(() => {
                const self = this;
                const el = $('pagination-template').get(0);
                if (el) {
                    const visible = (el.getBoundingClientRect().top >= 0) && (el.getBoundingClientRect().top <= window.innerHeight);
                    if (self.paginationFloating !== !visible) {
                        self.paginationFloating = !visible;
                    }
                }
            });
        }

        this.pageDisplay = 'Display (1 - $0) of $1 results'
            .replace('$0', (this.pageSize > this.totalRecordCount ? this.totalRecordCount : this.pageSize).toString() +'')
            .replace('$1', this.totalRecordCount +'');

        this.bkpPageSize = this.pageSize;
    }

    ngOnChanges(changes:SimpleChanges) {
        this.paginationUpdate.next();
       
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.paginationUpdate.next(event);
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event) {
        this.paginationUpdate.next(event);
    }

    changePage(pageNumber: number) {
        this.emitPageChange.emit(pageNumber);
        if (!this.disableScroll) {
            window.scrollTo(0, 0);
        }
    }
    getPage(event){
        this.emitPageChange.emit(event.srcElement.childNodes[0].data);
        if (!this.disableScroll) {
            window.scrollTo(0, 0);
        }
    }
    pageSizeChange(size: number) {
        this.emitpageSizeChange.emit(this.pageSize);
        if (!this.disableScroll) {
            window.scrollTo(0, 0);
        }
    }
    scrollToTop() {
        $('html,body').animate({ scrollTop: 0 }, 'slow');
    }

    showLess(){
        this.pageSize = this.bkpPageSize;
        this.pageDisplay = 'Display (1 - $0) of $1 results'
            .replace('$0', this.pageSize +'')
            .replace('$1', this.totalRecordCount +'');
        this.emitpageSizeChange.emit(this.pageSize);
    }

    showMore(){
        this.pageSize = this.pageSize + this.bkpPageSize > this.totalRecordCount ? this.totalRecordCount :  this.pageSize + this.bkpPageSize;
        this.pageDisplay = 'Display (1 - $0) of $1 results'
            .replace('$0', this.pageSize +'')
            .replace('$1', this.totalRecordCount +'');
        this.emitpageSizeChange.emit(this.pageSize);
    }
}
