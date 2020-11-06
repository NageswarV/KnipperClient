import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-report-filter',
  templateUrl: './generate-report-filter.component.html',
  styleUrls: ['./generate-report-filter.component.scss']
})
export class GenerateReportFilterComponent implements OnInit {


  @Output() emitSearch: EventEmitter<GenerateReportFilterCriteria> = new EventEmitter<GenerateReportFilterCriteria>();
  generateReportFilterCriteria: GenerateReportFilterCriteria;
  constructor() {
    this.init(null);
  }

  ngOnInit() {
  }
  init(generateReportFilterCriteria: GenerateReportFilterCriteria) {
    
    this.generateReportFilterCriteria = new GenerateReportFilterCriteria();
    this.setDefaultFilters();
  }
  setDefaultFilters(){
    this.generateReportFilterCriteria.reportName = "";
  }
  onSubmit() {
    this.emitSearch.emit(this.generateReportFilterCriteria);
  }

  resetFilter() {
    this.setDefaultFilters();
    this.onSubmit();
  }
}
export class GenerateReportFilterCriteria {
  reportName: string;

  clone(): GenerateReportFilterCriteria {
    const generateReportFilterCriteria: GenerateReportFilterCriteria = new GenerateReportFilterCriteria();
    generateReportFilterCriteria.reportName = this.reportName;

    return generateReportFilterCriteria;
  }
}
