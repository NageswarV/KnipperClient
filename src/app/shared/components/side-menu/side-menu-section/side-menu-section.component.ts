import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'samplicity-side-menu-section',
  templateUrl: './side-menu-section.component.html',
  styleUrls: ['./side-menu-section.component.scss'],
})
export class SideMenuSectionComponent implements OnInit, AfterViewInit {
  @Input() header: string;
  @Input() expanded = true;
  headerClass: string;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }
}
