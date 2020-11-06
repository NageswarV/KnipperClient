import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'samplicity-field-warnings',
  templateUrl: './field-warnings.component.html',
  styleUrls: ['./field-warnings.component.scss']
})
export class FieldWarningsComponent {
  @Input() control: AbstractControl;
  @Input() message: string = null;
}
