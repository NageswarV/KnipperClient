import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FilterService {
  private filterStorageKey = 'Filter.Storage.Key';
  private isFilterShown = new Subject<boolean>();
  private filterNameList = new Set();

  constructor() {
  }

  hasFilter(filterName: string): boolean {
    return localStorage.getItem(filterName) != null;
  }

  saveFilter(filterName: string, filterData: any): void {
    localStorage.setItem(filterName, JSON.stringify(filterData));
    this.filterNameList.add(filterName);
    localStorage.setItem(this.filterStorageKey, JSON.stringify(Array.from(this.filterNameList)));
  }

  loadFilter(filterName: string): any {
    return JSON.parse(localStorage.getItem(filterName));
  }

  clearFilter(filterName: string): void {
    localStorage.removeItem(filterName);
  }

  clearAllFilter(): void {
    this.filterNameList = this.loadFilter(this.filterStorageKey);
    if (this.filterNameList) {
      this.filterNameList.forEach((x: string) => {
        this.clearFilter(x);
      });

      this.clearFilter(this.filterStorageKey);
    }
  }

  toggleFilter(isShown: boolean) {
    this.isFilterShown.next(isShown);
  }

  getFilterShown(): Observable<boolean> {
    return this.isFilterShown.asObservable();
  }
}
