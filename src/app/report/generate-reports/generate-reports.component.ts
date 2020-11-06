import { Component, OnInit } from '@angular/core';
import { BusySpinner } from '../../common/busy-spinner';

@Component({
  selector: 'app-generate-reports',
  templateUrl: './generate-reports.component.html',
  styleUrls: ['./generate-reports.component.scss']
})
export class GenerateReportsComponent extends BusySpinner implements OnInit {

  isCollapsed: boolean;
  reportDetails = undefined;

  constructor() {
    super();
   }

  ngOnInit() {
    this.isCollapsed = false;
  }

  onCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  displayDetails(name:string) {
    this.reportDetails=name;
  }
  showList(){
    this.reportDetails=undefined;
  }
}
