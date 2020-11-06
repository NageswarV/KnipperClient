import { Component, Input, Output, OnChanges, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sg-sorter',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './sorter.component.html'
})
export class SorterComponent implements OnChanges {
    @Input() columnName: string;
    @Input() isActive: string;
    @Output() emitSort: EventEmitter<string> = new EventEmitter<string>();
    isAscending: boolean;
    sortClass = 'sorting';

    constructor() {
    }
    ngOnChanges() {
        if (this.columnName !== this.isActive) {
            this.sortClass = 'sorting';
        }
    }
    sort() {
        if (this.isAscending) {
            this.isAscending = false;
            this.sortClass = 'sorting_desc';
            this.emitSort.emit(this.columnName + ' DESC');
        } else {
            this.isAscending = true;
            this.sortClass = 'sorting_asc';
            this.emitSort.emit(this.columnName);
        }
    }
}
