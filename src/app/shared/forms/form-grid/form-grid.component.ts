import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { FormGridColumnComponent } from './form-grid-column/form-grid-column.component';
import { Language, TranslationService } from 'angular-l10n';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'samplicity-form-grid',
  templateUrl: './form-grid.component.html',
  styleUrls: ['./form-grid.component.scss']
})
export class FormGridComponent implements OnInit, AfterViewInit {
  @Output() selectAll: EventEmitter<any> = new EventEmitter();
  @Output() onAdd: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Input() titleLabel: string;
  @Input() parentFormGroup: FormGroup;
  @Input() formArray: FormArray;
  @Input() description: string;
  @Input() formArrayTemplate: object;

  @Input() canDeleteFirst = false;
  @Input() canDeleteLast = true;
  @Input() canAddFirst = true;
  @Input() canAddLast = true;
  @Input() onlyAddLast = false;
  @Input() cantDeleteSaved = false;
  @Input() hasAddDeleteColumn = true;
  @Input() addEmptyRow = false;

  @Input() ignoreEmptyGrid = false;
  @Input() emptyGridDescription: string;
  @Input() translateParams: object;
  @Input() minimumNumber = 1;
  @Input() readonlyField: string;
  @Input() buttonLabel: string;
  @Input() idProp = 'id';
  @Input() selectAllEnabled = false;
  @Input() selectAllControl: string;
  @Input() readonly = false;
  @Input() required = false;
  @Input() filterProperty: string;
  @Input() filterValue: any;
  @Input() perPage = 50;
  @Input() defaultSort: string;
  @Input() reducedPadding = false;

  @Input('loading') set loading(value: boolean) {
    if (value) {
      this.updatePageDisplay();
    }
  }
  @Input() selectedFlag = 'selectedFlag';
  @Input() newFlag = 'newFlag';
  @Input() errorFlag = 'errorFlag';

  @Language() lang;

  columns: FormGridColumnComponent[] = [];
  startCount = 0;
  endCount = 0;
  totalCount = 0;
  pageNum = 1;
  pageDisplay: string;
  currentSort: string;

  showItem(index: number): boolean {
    if (this.filterProperty && (index + 1) >= this.startCount && index < this.endCount) {
      const formGroup = this.formArray.controls[index];
      return formGroup.get(this.filterProperty).value === this.filterValue;
    } else if ((index + 1) >= this.startCount && index < this.endCount) {
      return true;
    } else {
      return false;
    }
  }


  checkSelected(formGroup: FormGroup): boolean {
    const selectedFlag = formGroup.get(this.selectedFlag);

    return selectedFlag && selectedFlag.value;
  }

  checkNew(formGroup: FormGroup): boolean {
    const newFlag = formGroup.get(this.newFlag);

    return newFlag && newFlag.value;
  }

  checkError(formGroup: FormGroup): boolean {
    const errorFlag = formGroup.get(this.errorFlag);

    return errorFlag && errorFlag.value;
  }

  get selectAllChecked(): boolean {
    const arrayLength = this.filterProperty ?
      this.formArray.controls.filter((form) => !!form.get(this.selectAllControl) &&
        (form.get(this.filterProperty).value === this.filterValue)).length :
      this.formArray.controls.length;
    return arrayLength === this.rowsChecked ? true : false;
  }

  get rowsChecked(): number {
    let total = 0;
    this.formArray.controls.forEach(form =>{
      if (form.get(this.selectAllControl)) {
        if (!!form.get(this.selectAllControl).value) {
          total++;
        }
      }
    });
    return total;
  }

  get showTable(): boolean {
    if (this.ignoreEmptyGrid) {
      return true;
    }

    const showFlag = this.formArray && this.formArray.controls && this.formArray.controls.length > 0;
    if (this.filterProperty) {
      const hasValidRow = this.formArray.controls.findIndex(x => x.get(this.filterProperty).value === this.filterValue) >= 0;
      return showFlag && hasValidRow;
    } else {
      return showFlag;
    }
  }

  get emptyDescriptionColspan(): number {
    const actionColumn = this.hasAddDeleteColumn ? 1 : 0;
    return this.columns.length + actionColumn;
  }

  constructor(
    private translationService: TranslationService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.pageNum = 1;
    this.totalCount = this.formArray.controls.length;
    if (this.defaultSort) {
      this.currentSort = this.defaultSort;
    }
    this.updatePageDisplay();
    if (this.addEmptyRow && this.formArray.enabled) {
      this.addRowIfEmpty();
    }
  }

  ngAfterViewInit() {
    if (this.defaultSort) {
      this.initialSort();
    }
  }

  initialSort(): void {
    const defaultColumn = this.columns.find((column) => column.sortName === this.defaultSort);
    this.onSort(defaultColumn.sortName, defaultColumn.sortDirAsc, defaultColumn.sortTransformFn);
  }

  addRowIfEmpty() {
    if (this.formArray.controls.length < this.minimumNumber && !this.readonly) {
      for (let i = this.formArray.controls.length; i < this.minimumNumber; i++) {
        this.addRow(i);
        this.parentFormGroup.markAsPristine();
        this.parentFormGroup.markAsUntouched();
        this.cd.detectChanges();
      }
    }
  }

  addColumn(column: FormGridColumnComponent): void {
    this.columns.push(column);
  }

  addRow(index: number): void {
    const newForm = this.fb.group(this.formArrayTemplate);
    this.parentFormGroup.markAsDirty();
    this.parentFormGroup.markAsTouched();
    this.formArray.insert(index + 1, newForm);
    this.onAdd.emit(index);

    this.totalCount = this.formArray.controls.length;
    this.updatePageDisplay();
  }

  deleteRow(index: number): void {
    this.parentFormGroup.markAsDirty();
    this.parentFormGroup.markAsTouched();
    this.formArray.removeAt(index);

    if (!this.ignoreEmptyGrid) {
      if (this.filterProperty) {
        if (this.formArray.controls.filter(x => x.get(this.filterProperty).value === this.filterValue).length < 1) {
          this.formArray.insert(index, this.fb.group(this.formArrayTemplate));
        }
      } else {
        if (this.formArray.controls.length < 1) {
          this.formArray.insert(index, this.fb.group(this.formArrayTemplate));
        }
      }
    }
    this.onDelete.emit(index);

    this.totalCount = this.formArray.controls.length;
    this.updatePageDisplay();
  }

  showAddButton(index: number, last: number): boolean {
    return (index === 0 && this.canAddFirst && !this.onlyAddLast) ||
      ((index > 0 && !last) && !this.onlyAddLast) ||
      (last && this.canAddLast);
  }

  showDeleteButton(index: number, last: number): boolean {
    if (this.cantDeleteSaved &&
      this.formArray.at(index).get(this.idProp) &&
      this.formArray.at(index).get(this.idProp).value) {
      return false;
    }

    if (this.readonlyField) {
      return !this.isReadonly(index);
    }
    return (index === 0 && this.canDeleteFirst) ||
      (index > 0 && !last) ||
      (index > 0 && (last && this.canDeleteLast));
  }

  isReadonly(index: number): boolean {
    if (this.formArray.controls[index] instanceof FormGroup) {
      const formGroup = this.formArray.controls[index] as FormGroup;
      if (formGroup.controls[this.readonlyField] instanceof FormControl) {
        const formControl = formGroup.controls[this.readonlyField] as FormControl;
        if (formControl.value) {
          return true;
        }
      }
    }
    return false;
  }

  onPaginate(page: number) {
    this.pageNum = page;
    this.updatePageDisplay();
  }

  updatePageDisplay() {
    this.totalCount = this.formArray.controls.length;
    this.startCount = (this.pageNum - 1) * this.perPage + 1;
    this.endCount = this.startCount + this.perPage - 1;
    if (this.endCount > this.totalCount) {
      this.endCount = this.totalCount;
    }
    if (this.totalCount === 0) {
      this.startCount = 0;
    }

    this.pageDisplay = this.translationService.translate('Forms.TableCountDisplay')
      .replace('$0', this.startCount)
      .replace('$1', this.endCount)
      .replace('$2', this.totalCount);
  }

  onSelectAll(event: MatCheckboxChange): void {
    if (!this.selectAllControl) {
      return;
    }

    this.formArray.controls.forEach( formGroup => {
      const selectControl = formGroup.get(this.selectAllControl);
      const isFiltered = this.filterProperty && (formGroup.get(this.filterProperty).value != this.filterValue);
      if (!selectControl.disabled && !isFiltered) {
        selectControl.setValue(event.checked);
      }
    });

    this.selectAll.emit();
  }

  onSort(controlName: string, sortDirAsc: boolean, sortTransformFn?: Function): void {
    this.currentSort = controlName;
    this.formArray.controls.sort(this.compareFormGroups(controlName, sortTransformFn));
    if (!sortDirAsc) {
      this.formArray.controls.reverse();
    }
    this.formArray.updateValueAndValidity();
    this.cd.detectChanges();
  }

  compareFormGroups(controlName: string, sortTransformFn?: Function) {
    return function (a: FormGroup, b: FormGroup) {
      const compareA = sortTransformFn ? sortTransformFn(a.get(controlName).value) : a.get(controlName).value;
      const compareB = sortTransformFn ? sortTransformFn(b.get(controlName).value) : b.get(controlName).value;
      if ( compareA < compareB) {
        return -1;
      }
      if (compareA > compareB) {
        return 1;
      }
      return 0;
    }
  }
}
