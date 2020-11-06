import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sg-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.scss', '../home.component.scss']
})
export class ViewActivityComponent implements OnInit {
  @Output() searchName: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  goToSearchPage(searchBy) {
    this.searchName.emit(searchBy)
  }

}
