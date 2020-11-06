import { Component, OnInit, Input, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

let nextId = 0;

@Component({
  template: '',
  selector: 'samplicity-field-base'
})
export class FieldBaseComponent implements AfterViewInit {

  @Input() parentFormGroup: FormGroup;
  @Input() name: string;
  @Input() label: string | object[];
  @Input() labelParameters: object;
  @Input() labelTranslated = true;
  @Input() required = false;
  @Input() disabled = false;
  @Input() placeholder: string;
  @Input() description: string | string[] | object[];
  @Input() noLabel: boolean = false;
  @Input() disabledType: string = 'readonly'; // Set to 'disabled' to enable disabled state when formcontrol is disabled, instead of readonly

  id = `field-${nextId++}`;

  get control(): AbstractControl | null {
    return (this.parentFormGroup ? this.parentFormGroup.get(this.name) : null);
  }

  get isRequired(): boolean {
    if (this.control && this.control.validator) {
      const validator = this.control.validator({} as AbstractControl);
      return validator && validator.required;
    }
  }

  constructor(public cd?: ChangeDetectorRef) { }

  ngAfterViewInit() {
  }

  disable() {
    this.disabled = true;
  }
  enable() {
    this.disabled = false;
  }
}
