import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { IMyOptions } from 'mydatepicker';
import { ClassificationValue } from '../../../generated/service-client';
import { SalesFilterCriteria } from '../rep.model';
import { CacheService } from '../../cache/cache.service';

@Component({
    selector: 'app-rep-order-list-filter',
    templateUrl: './rep-order-list-filter.component.html',
    styleUrls: ['./rep-order-list-filter.component.scss']
})
export class RepOrderListFilterComponent implements OnInit, OnChanges {
    @Output() emitSearch: EventEmitter<{ filter: SalesFilterCriteria, isReset: boolean }> = new EventEmitter<{ filter: SalesFilterCriteria, isReset: boolean }>();
    myDatePickerOptions: IMyOptions;
    salesFilterCriteria: SalesFilterCriteria;
    @ViewChild('accordian', { static: true }) accordian: NgbAccordion;
    @Input() filterObjectFromOtherPage: SalesFilterCriteria;
    stateOptions = [];
    codeDesignation = "HCP_DESIGNATION";
    codeOderStatus="ORDER_STATUS";
    designationArray:ClassificationValue[];
    oderedStatusArray:ClassificationValue[];
    countryDropdown = []

    constructor(private cacheService: CacheService) {
        this.init();
    }

    ngOnInit() {
        this.initDatePicker();
        this.stateOptions = this.cacheService.stateCache;
        this.countryDropdown = this.cacheService.countryCache;
        this.cacheService.GetClassificationValuesByTypeCode(this.codeDesignation).subscribe((result)=>{
            this.designationArray=result;
        })
        this.cacheService.GetClassificationValuesByTypeCode(this.codeOderStatus).subscribe((result)=>{
            this.oderedStatusArray=result;
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.filterObjectFromOtherPage) {
            this.init(this.filterObjectFromOtherPage)
        }
    }

    init(salesFilterCriteria?: SalesFilterCriteria) {
        //get and fill initial data if any
        if (salesFilterCriteria) {
            this.salesFilterCriteria.firstName = salesFilterCriteria.firstName;
            this.salesFilterCriteria.lastName = salesFilterCriteria.lastName;
        } else {
            this.salesFilterCriteria = new SalesFilterCriteria();
            this.salesFilterCriteria.firstName = '';
            this.salesFilterCriteria.lastName = '';
        }
    }

    onSubmit(resetValue?: boolean) {
        this.emitSearch.emit({ filter: this.salesFilterCriteria, isReset: resetValue || false });
    }

    resetFilter() {
        this.salesFilterCriteria.firstName = '';
        this.salesFilterCriteria.lastName = '';
        this.onSubmit(true);
    }

    initDatePicker() {
        this.myDatePickerOptions = {
            dateFormat: 'mm/dd/yyyy',
            firstDayOfWeek: "su",
            selectionTxtFontSize: '15px',
            showClearDateBtn: true,
            editableDateField: false,
            inline: false,
            height: '45px'
        };
    }

}
