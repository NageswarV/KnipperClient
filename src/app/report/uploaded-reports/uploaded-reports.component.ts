import { Component, OnInit } from '@angular/core';
import { BusySpinner } from '../../common/busy-spinner';
import { UploadedReportFilterCriteria} from '../report.model'

@Component({
  selector: 'app-uploaded-reports',
  templateUrl: './uploaded-reports.component.html',
  styleUrls: ['./uploaded-reports.component.scss']
})
export class UploadedReportsComponent extends BusySpinner implements OnInit {
  isCollapsed: boolean;

  constructor() {
    super();
   }

  ngOnInit() {
    this.isCollapsed = false;
  }
  applyFilter(filter : UploadedReportFilterCriteria) {
    
  }
  onCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  
}
