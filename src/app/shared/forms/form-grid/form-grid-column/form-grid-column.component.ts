import { Component, TemplateRef, ContentChild, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormGridComponent } from '../form-grid.component';
import { Language } from 'angular-l10n';

@Component({
  selector: 'samplicity-form-grid-column',
  templateUrl: './form-grid-column.component.html',
  styleUrls: ['./form-grid-column.component.scss']
})
export class FormGridColumnComponent {

  @Input() formControl: AbstractControl;
  @Input() header: string;
  @Input() headerHelperText: string;
  @Input() width: string;
  @Input() required: boolean;
  @Input() sortName: string; //Name of control for sorting by
  @Input() sortDirAsc = true;
  @Input() sortTransformFn: Function; // If value of formControl needs to be transformed prior to sorting
  @Input() isHidden: boolean;

  @Language() lang;

  @ContentChild('columnCellTemplate', {static:false}) cellTemplate: TemplateRef<any>;

  constructor(public grid: FormGridComponent) {
    grid.addColumn(this);
  }

}
