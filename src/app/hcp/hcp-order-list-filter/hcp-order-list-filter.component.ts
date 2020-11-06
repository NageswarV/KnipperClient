import { Component, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { IMyOptions } from 'mydatepicker';
import { ClassificationValue } from '../../../generated/service-client';
import { CacheService } from '../../cache/cache.service';
import { HcpOrderFilterCriteria } from '../hcp-order.model';

@Component({
    selector: 'sg-hcp-order-list-filter',
    templateUrl: './hcp-order-list-filter.component.html',
    styleUrls: ['../hcp-order-list/hcp-order-list.component.scss']
})
export class HcpOrderListFilterComponent implements OnInit {
    @Output() emitHcpSearch: EventEmitter<{ filter: HcpOrderFilterCriteria, isReset: boolean }> = new EventEmitter<{ filter: HcpOrderFilterCriteria, isReset: boolean }>();
    myDatePickerOptions: IMyOptions;
    stateOptions = [];
    codeDesignation = "HCP_DESIGNATION";
    codeOderStatus="ORDER_STATUS";
    designationArray:ClassificationValue[];
    oderedStatusArray:ClassificationValue[];
    stateDropdown = [];
    countryDropdown = []

    hcpOrderFilterCriteria: HcpOrderFilterCriteria;
    @ViewChild('accordian', { static: true }) accordian: NgbAccordion;

    constructor(private cacheService: CacheService) {
        this.init(null);
    }

    ngOnInit() {
        this.initDatePicker();
        this.cacheService.GetClassificationValuesByTypeCode(this.codeDesignation).subscribe((result)=>{
            this.designationArray=result;
        })
        this.cacheService.GetClassificationValuesByTypeCode(this.codeOderStatus).subscribe((result)=>{
            this.oderedStatusArray=result;
        })

        this.stateDropdown = this.cacheService.stateCache;
        this.countryDropdown = this.cacheService.countryCache;
    }

    init(hcpOrderFilterCriteria: HcpOrderFilterCriteria) {
        //get and fill initial data if any
        this.hcpOrderFilterCriteria = new HcpOrderFilterCriteria();
        this.hcpOrderFilterCriteria.firstName = '';
        this.hcpOrderFilterCriteria.lastName = '';
        this.hcpOrderFilterCriteria.stateCode = '';
    }

    onSubmit(reset?: boolean) {
        this.emitHcpSearch.emit({ filter: this.hcpOrderFilterCriteria, isReset: reset || false });
    }

    resetFilter() {
        this.hcpOrderFilterCriteria.firstName = '';
        this.hcpOrderFilterCriteria.lastName = '';
        this.hcpOrderFilterCriteria.stateCode = '';
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
