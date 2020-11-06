import { Component, OnInit, Output, EventEmitter, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'samplicity-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  @ViewChild('sidenav', {static: false}) sideNav: MatSidenav;
  @Input() sidebarTitle = 'Filter';
  @Input() state: string;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter();

  // get error(): boolean {
  //   return this.state === ValidationState.Error;
  // }

  // get warning(): boolean {
  //   return this.state === ValidationState.Warning;
  // }

  constructor() { }

  ngOnInit() {
  }

  toggleMenu(state: boolean) {
    this.toggle.emit(state);
  }
}
