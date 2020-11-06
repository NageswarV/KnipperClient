import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input} from '@angular/core';
import { Item } from '../../../../core/classification.service';


@Component({
  selector: 'samplicity-table-input',
  templateUrl: './table-input.component.html',
  styleUrls: ['./table-input.component.scss']
})
export class ResponsiveDataTableInputComponent implements OnInit {
  @Input() readonly: boolean;
  @Input() label: string;
  @Input() model: any;
  @Input() modelProp: string;
  @Input() textMask: string;
  @Input() addonTextLeft: string;
  @Input() addonTextRight: string;
  @Input() required: boolean;

  constructor(
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
  }
}
