import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { Language } from 'angular-l10n';

@Component({
  selector: 'samplicity-text-static',
  templateUrl: './text-static.component.html',
  styleUrls: ['./text-static.component.scss']
})
export class TextStaticComponent extends FieldBaseComponent {

  @Input() listItems: object[];
  @Input() idProp: string = 'id';
  @Input() valueProp: string = 'values';
  @Input() value: any;
  @Input() delimiter: string = null;
  @Input() lineBreak: false;
  @Input() emptyValue: string = null;
  @Input() pipe: any;
  @Input() labelTranslated = true;

  get isArray(): boolean {
    if (this.control) {
      return Array.isArray(this.control.value);
    }
    return false;
  }

  get isArrayEmpty(): boolean {
    if (this.isArray) {
      return (this.control.value).length === 0;
    }
    return false;
  }

  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }
}
