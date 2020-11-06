import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sg-search-by-hcp',
  templateUrl: './search-by-hcp.component.html',
  styleUrls: ['../../home.component.scss']
})
export class SearchByHCPComponent implements OnInit {
  @Output() searchName: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  back() {
    this.searchName.emit('')
  }

}
