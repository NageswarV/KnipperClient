import { Component, OnInit, Input, ChangeDetectorRef, AfterViewChecked  } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { Language } from 'angular-l10n';

@Component({
  selector: 'samplicity-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent extends FieldBaseComponent {

  @Input() forceRequiredLabel = false;
  @Input() rows = 5;
  @Input() maxLength = 2000;
  @Input() table = false;
  @Language() lang: string;
  @Input() labelTranslated = true;
  @Input() disabled = false;

  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }

  onBlur() {
    if (this.control.value) {
      const trimmed = this.control.value.trim();
      if (trimmed !== this.control.value) {
        this.control.setValue(trimmed);
      }
    }
  }

}
