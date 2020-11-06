import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sg-search-by-rep',
  templateUrl: './search-by-rep.component.html',
  styleUrls: ['../../home.component.scss']
})
export class SearchByRepComponent implements OnInit {
  @Output() searchName: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  back() {
    this.searchName.emit('')
  }

}
