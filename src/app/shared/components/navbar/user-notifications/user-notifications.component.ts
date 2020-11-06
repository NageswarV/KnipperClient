import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'samplicity-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss']
})
export class UserNotificationsComponent implements OnInit {

  @Input() isFirefox: boolean;
  notificationCount: number;

  constructor() { }

  ngOnInit() {
    // TODO: Implement notification functionality
    this.notificationCount = 8;
  }


}
