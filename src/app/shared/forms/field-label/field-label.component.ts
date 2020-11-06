import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Language } from 'angular-l10n';

@Component({
  selector: 'samplicity-field-label',
  templateUrl: './field-label.component.html',
  styleUrls: ['./field-label.component.scss'],
})
export class FieldLabelComponent  {

  @Language() lang: string;
  @Input() inputId: string;
  @Input() label: string | object[];
  @Input() labelParameters: object;
  @Input() labelTranslated = true;
  @Input() required = false;
  @Input() colon = true;

  get isDto(): boolean {
    return Array.isArray(this.label) && this.label[0] instanceof Object;
  }

}
