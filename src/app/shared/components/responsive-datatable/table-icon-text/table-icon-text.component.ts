import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input} from '@angular/core';


@Component({
  selector: 'samplicity-table-icon-text',
  templateUrl: './table-icon-text.component.html',
  styleUrls: ['./table-icon-text.component.scss']
})
export class ResponsiveDataTableIconTextComponent implements OnInit {
  @Input() showIcon: boolean;
  @Input() icon: string;
  @Input() iconClass: string;
  @Input() iconText: string;
  @Input() iconTextExpanded: string;
  @Input() textClass: string;
  @Input() center = true;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }
}
