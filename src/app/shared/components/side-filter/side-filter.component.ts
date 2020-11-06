import { Component, OnInit, Output, EventEmitter, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'samplicity-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss'],
})
export class SideFilterComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav', {static:false}) sideNav: MatSidenav;
  @Input() isFilter = true;
  @Input() sidebarTitle = 'Filter';
  @Output() filter: EventEmitter<any> = new EventEmitter();
  @Output() clear: EventEmitter<any> = new EventEmitter();
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.toggle.emit(this.sideNav.opened);
  }

  toggleFilter() {
    this.toggle.emit(this.sideNav.opened);
  }

  // Removed need to handle on mousewheel scroll since #8384
  onMousewheel(event) {
    // Prevent scrolling of the page by mouse wheeling of the sidebar 
    const el = event.currentTarget;
    if ((el.scrollTop + el.offsetHeight >= el.scrollHeight && event.deltaY > 0)
      || (el.scrollTop === 0 && event.deltaY < 0)) {
      event = event || window.event;
      if (event.preventDefault) {
        event.preventDefault();
      }
      event.returnValue = false;
    }
  }
}
