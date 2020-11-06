import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'samplicity-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends FieldBaseComponent {

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Input() textValue: string;
  @Input() textValueTranslated = false;
  @Input() table: boolean;
  @Input() value;
  @Input() isInvalid = false;
  @Input() labelTranslated = true;
  @Input() disabled = false;
  @Input() hideUnchecked = false;
  @Input() isChecked = false;

  onChange(event: MatCheckboxChange): void {

    if (this.value) {
      console.log(this.value);
      event.checked ? this.control.setValue(this.value) : this.control.setValue(null);
    }

    this.change.emit(event);
  }
}
