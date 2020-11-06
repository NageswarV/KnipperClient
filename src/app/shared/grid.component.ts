import { Component, Input, Output, EventEmitter, TemplateRef, ContentChild, SimpleChanges } from '@angular/core';

export interface IGridColumns {
    title: string;
    sortby?: string;
    classes?: string;
    isChecked?:boolean;
}

@Component({
    selector: 'sg-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
    componentId: string;
    @Input() columns: IGridColumns[];
    @Input() emptyText: string;
    @Input() items: any[];
    @Input() totalRecordCount: number;
    @Input() pageSize: number;
    @Input() currentPage: number;
    @Input() disablePaginationFloating: boolean;
    @Input() disableScrollOnPage: boolean;
    @Input() pageSizeOptions ?: any[];
    @Input() fromReport ?:boolean;
    @Input() totalPages ?:number;
    @Input() pages?:any[];
    sortedColumn: string;
    @Output() emitSort: EventEmitter<string> = new EventEmitter<string>();
    @Output() emitPageChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() emitpageSizeChange ?: EventEmitter<number> = new EventEmitter<number>();
    @Output() headerColumnEvent ?: EventEmitter<any> = new EventEmitter<any>();
    @Input() loadMorePagination: boolean;
  

  @ContentChild(TemplateRef, { static: false }) itemTemplate: TemplateRef<any>;


    constructor() {
        this.componentId = performance.now().toString();
        
    }
    sort(sortQry: string) {
        this.sortedColumn = sortQry.split(' ')[0];
        this.emitSort.emit(sortQry);
    }

    paginate(pageNumber: number) {
        this.emitPageChange.emit(pageNumber);
    }
    pageSizeChange(pageSize: number){
        this.pageSize = pageSize;
        this.emitpageSizeChange.emit(pageSize);
    }
    onChange(column: any,$event){
        column.isChecked = !column.isChecked;
        this.headerColumnEvent.emit(column.isChecked);
    }
}
