import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';

@Component({
  selector: 'samplicity-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent extends FieldBaseComponent implements OnInit {

  @Input() items: { label: string, value: any }[];
  @Input() colon = true;
  @Input() table = false;
  @Input() vertical = true;
  @Input() forceRequiredLabel = false;
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() click: EventEmitter<any> = new EventEmitter();
  @Input() labelTranslated = true;
  @Input() disabled = false;
  @Input() forceDisabled = false;

  get value(): string {
    if (this.control) {
      const value = this.items.find(x => x.value === this.control.value);
      return value ? value.label : '';
    }
    return '';
  }

  ngOnInit() {
    if (this.control) {
      if (this.control.disabled) {
        this.disable();
      } else {
        this.enable();
      }
    }
  }

  set(value: any) {
    if (this.disabled || this.forceDisabled) {
      return;
    }
    if (this.control) {
      if (!this.control.disabled) {
        this.control.setValue(value);
        this.change.emit();
      }
      this.control.markAsDirty();
      this.control.markAsTouched();
      this.control.updateValueAndValidity();
    }
    this.click.emit();
  }
}
