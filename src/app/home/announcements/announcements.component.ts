import { Component, Input, OnInit } from '@angular/core';
import { Announcement } from '../../../generated/service-client';

@Component({
  selector: 'sg-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {

  @Input() announcements: Announcement[];
  @Input() currentPage: number;
  @Input() pageSize: number;
  @Input() totalRecordCount: number;

  constructor() { }

  ngOnInit() { }
}
