import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rep',
  templateUrl: './rep.component.html',
  styleUrls: ['./rep.component.scss']
})
export class RepComponent implements OnInit {
  byRepOrders = true;
  isCollapsed: boolean
  filterObj: any;
  sortingType = 'asc';
  filterObjectFromOtherPage = {}

  constructor() { }

  ngOnInit() {
    this.isCollapsed = false;
  }

  viewByHomeOffce() {
    if (this.byRepOrders) {
      this.byRepOrders = !this.byRepOrders;
    }
  }

  viewBySalesRep() {
    if (!this.byRepOrders) {
      this.byRepOrders = !this.byRepOrders;
    }
  }

  onCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onSubmit(event: any) {
    this.filterObj = event;
  }

  filterData(event: any) {
    this.filterObjectFromOtherPage = event
  }
}
