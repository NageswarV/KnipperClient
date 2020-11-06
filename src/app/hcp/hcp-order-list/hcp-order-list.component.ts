import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rep } from '../../../generated/service-client';
import { BusySpinner } from '../../common/busy-spinner';
import { HcpOrderFilterCriteria } from '../hcp-order.model';
import { HcpService } from '../hcp.service';

@Component({
  selector: 'app-hcp-order-list',
  templateUrl: './hcp-order-list.component.html',
  styleUrls: ['./hcp-order-list.component.scss']
})
export class HcpOrderListComponent extends BusySpinner implements OnInit {
  isCollapsed: boolean;
  hcpsOrderList: Rep[] = [];
  perPage = 3;
  pageDisplay: string;
  startCount = 0;
  endCount = 0;
  pageNum = 1;
  totalCount = 0;
  currentList: Rep[] = [];
  sortingType = 'asc';
  externalFilter = { filter : new HcpOrderFilterCriteria() };

  constructor(
    public hcpService: HcpService,
    public route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.isCollapsed = false;
    let tmp = true;
    
    this.route.queryParams.subscribe(x => {
      if(x.startDate || x.endDate) {
        this.externalFilter.filter.startDate = new Date(x.startDate);
        this.externalFilter.filter.endDate = new Date(x.endDate);
        this.applyFilter(this.externalFilter);
        tmp = false;
      }
    });

    if(!tmp) return;
    this.setBusySpinner(this.hcpService.GetHcpsIncludingDtpOrders()).subscribe(x => {
      this.hcpsOrderList = x;
      this.totalCount = x.length;
      this.sortHcps();
    });
  }

  onCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  applyFilter(filterObj: any) {
    this.setBusySpinner(this.hcpService.GetHcpsIncludingDtpOrders()).subscribe(response => {
      if (filterObj.isReset || Object.values(filterObj.filter).every(x => (x === null || x === ''))) {
        this.hcpsOrderList = response
      } else {
        this.hcpsOrderList = this.getFilteredData(response, filterObj.filter);
      }
      this.totalCount = this.hcpsOrderList.length;
      this.sortHcps();
    });
  }

  getFilteredData(hcpList: Rep[], filter: HcpOrderFilterCriteria) {
    let result = hcpList.filter(item => {
      let data = Object.keys(filter).map(key => {
        if(filter[key] instanceof Date) return true;
        return filter[key] && item[key].toLowerCase().includes(filter[key].toLowerCase())
      });
      if (data.includes(true)) {
        return item
      }
    });
    result.forEach(x => {
      let tmp = x.dtpOrders.filter(x => new Date(x.orderDate) >= filter.startDate && new Date(x.orderDate) <= filter.endDate)
      x.dtpOrders = tmp;
    });
    return result;
  }

  updatePageDisplay() {
    this.startCount = (this.pageNum - 1) * this.perPage + 1;
    this.endCount = this.startCount + this.perPage - 1;
    if (this.endCount > this.totalCount) {
      this.endCount = this.totalCount;
    }
    if (this.totalCount === 0) {
      this.startCount = 0;
    }

    this.pageDisplay = "Display ($0 - $1) of $2 results"
      .replace('$0', this.startCount + '')
      .replace('$1', this.endCount + '')
      .replace('$2', this.hcpsOrderList.length + '');
  }

  onPaginate(page: number) {
    let start = (page - 1) * this.perPage;
    let end = start + 3 > this.totalCount ? this.totalCount : start + 3;
    this.pageNum = page;
    this.currentList = this.hcpsOrderList.slice(start, end);
    this.updatePageDisplay();
  }

  sortHcps() {
    if (this.sortingType == 'asc') {
      this.hcpsOrderList.sort((a, b) => (a.firstName.toLowerCase() > b.firstName.toLowerCase()) ? 1 : (a.firstName.toLowerCase() === b.firstName.toLowerCase()) ? ((a.lastName.toLowerCase() > b.lastName.toLowerCase()) ? 1 : -1) : -1)
    } else {
      this.hcpsOrderList.sort((a, b) => (a.firstName.toLowerCase() < b.firstName.toLowerCase()) ? 1 : (a.firstName.toLowerCase() === b.firstName.toLowerCase()) ? ((a.lastName.toLowerCase() < b.lastName.toLocaleLowerCase()) ? 1 : -1) : -1)
    }
    this.currentList = this.hcpsOrderList.slice(0, this.perPage);
    this.pageNum = 1;
    this.updatePageDisplay();
  }
}
