import { Component, OnInit, Output, EventEmitter, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Language } from 'angular-l10n';

@Component({
  selector: 'samplicity-side-menu-header',
  templateUrl: './side-menu-header.component.html',
  styleUrls: ['./side-menu-header.component.scss'],
})
export class SideMenuHeaderComponent implements OnInit {
  @Input() header: string;
  @Input() selected = false;
  @Input() name;
  @Output() goto: EventEmitter<string> = new EventEmitter();

  get valid(): boolean {
    // if (this.validation) {
    //   return this.validation.state === ValidationState.Valid;
    // } else {
    //   return false;
    // }
    return true;
  }

  get error(): boolean {
    // if (this.validation) {
    //   return this.validation.state === ValidationState.Error;
    // } else {
    //   return false;
    // }
    return false;
  }

  get warning(): boolean {
    // if (this.validation) {
    //   return this.validation.state === ValidationState.Warning;
    // } else {
    //   return false;
    // }
    return false;
  }

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    // if (this.validation) {
    //   this.goto.emit(this.validation.name);
    // }
    // else if (this.name) {
      this.goto.emit(this.name);
    // }
  }
}
