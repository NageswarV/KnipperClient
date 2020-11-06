import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { IMyOptions } from 'mydatepicker';
import { ProductFilterCriteria } from '../product.model';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit {
  @Output() emitProductSearch: EventEmitter<ProductFilterCriteria> = new EventEmitter<ProductFilterCriteria>();
  myDatePickerOptions: IMyOptions;
  productFilterCriteria: ProductFilterCriteria;
  @ViewChild('accordian', { static: true }) accordian: NgbAccordion;

  productName: string='';

  constructor() { }

  ngOnInit() {
    this.initDatePicker();
    this.initFilter();
  }

  initFilter() {
    //get and fill initial data if any
    this.productFilterCriteria = new ProductFilterCriteria();
    this.productFilterCriteria.productName = this.productName;
  }

  onSubmit() {
    this.productFilterCriteria = new ProductFilterCriteria();
    this.productFilterCriteria.productName=this.productName;
    this.emitProductSearch.emit(this.productFilterCriteria);
  }

  resetFilter() {
    this.productName='';
    this.onSubmit();
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
