import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sg-search-by-product',
  templateUrl: './search-by-product.component.html',
  styleUrls: ['../../home.component.scss']
})
export class SearchByProductComponent implements OnInit {
  @Output() searchName: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  back() {
    this.searchName.emit('')
  }
}
