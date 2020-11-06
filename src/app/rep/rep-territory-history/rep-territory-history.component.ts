import { Component, OnInit, Inject } from '@angular/core';
import { IGridColumns } from '../../shared/grid.component';
import {  MAT_DIALOG_DATA } from '@angular/material'
import { RepTerritory } from '../../../generated/service-client';

@Component({
  selector: 'app-rep-territory-history',
  templateUrl: './rep-territory-history.component.html',
  styleUrls: ['./rep-territory-history.component.scss']
})
export class RepTerritoryHistoryComponent implements OnInit {
  columns: IGridColumns[];

  constructor(@Inject(MAT_DIALOG_DATA) public repTerritoryData: RepTerritory[]) {
    this.columns = [
      { title: 'Territory Code', classes: 'col-xs-2 p-1 pl-2' },
      { title: 'Territory Name', classes: 'col-xs-2 p-1' },
      { title: 'Start Date', classes: 'col-xs-2 p-1' },
      { title: 'End Date', classes: 'col-xs-2 p-1' },
    ];
   }

  ngOnInit() {
  }

}
