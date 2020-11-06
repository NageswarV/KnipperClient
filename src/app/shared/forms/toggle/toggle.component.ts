import { Component, Input, AfterContentInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';

@Component({
  selector: 'samplicity-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent extends FieldBaseComponent implements AfterContentInit {
  @Input() items: { label: string, value: any }[];
  @Input() labelTranslated = true;

  ngAfterContentInit() {    
    if (this.control) {
      this.control.valueChanges.subscribe(x => {
        this.control.markAsTouched();
        this.control.markAsDirty();
      });
    }
  } 
}
