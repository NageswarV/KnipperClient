import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'samplicity-field-description',
  templateUrl: './field-description.component.html',
  styleUrls: ['./field-description.component.scss'],
})
export class FieldDescriptionComponent {

  @Input() description: string | string[] | object[];
  @Input() icon = true;
  @Input() zeroMarginBottom: boolean = false;

  get isArray(): boolean {
    return Array.isArray(this.description);
  }

  get isDto(): boolean {
    return (this.isArray && this.description[0] instanceof Object);
  }

}
