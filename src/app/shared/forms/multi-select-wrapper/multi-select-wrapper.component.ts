import { Component, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';

@Component({
  selector: 'samplicity-multi-select-wrapper',
  templateUrl: './multi-select-wrapper.component.html',
  styleUrls: ['./multi-select-wrapper.component.scss']
})
export class MultiSelectWrapperComponent extends FieldBaseComponent {

  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Input() disabled = false;
  @Input() listItems: any[];
  @Input() height: string;
  @Input() maxHeight: string;
  @Input() outputIds = false;
  @Input() idProperty = 'id';
  @Input() namesProperty = 'names';
  @Input() namesTranslated = false;
  @Input() sort = true;
  @Input() multiSort = false;
  @Input() selectAll = false;
  @Input() selectAllText: string;
  @Input() noWell = false;
  @Input() collapsible = false;
  @Input() labelTranslated = true;

  constructor(
    cd: ChangeDetectorRef
  ) {
    super(cd);
  }

  onChange(selectedIds: string[]) {
    const control = this.parentFormGroup.get(this.name);
    control.markAsDirty();
    control.markAsTouched();
    control.updateValueAndValidity();
    this.change.emit(selectedIds);
  }
}
