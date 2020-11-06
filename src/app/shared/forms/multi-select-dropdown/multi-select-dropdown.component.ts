import { Component, OnInit, ChangeDetectorRef, Input, Output,
  ViewEncapsulation, EventEmitter } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { Item } from '../../../core/classification.service';

@Component({
  selector: 'samplicity-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultiSelectDropdownComponent extends FieldBaseComponent implements OnInit {

  @Output() modelChanged: EventEmitter<Item[]> = new EventEmitter<Item[]>();
  @Input() singleSelection = false;
  @Input() disabled = false;
  @Input() forceDisabled = false;
  @Input() items: Item[];
  @Input() selectedItems: Item[] = [];
  @Input() enableCheckAll = true;
  @Input() allowSearchFilter = true;
  @Input() showRequiredLabel = true;
  @Input() forceRequiredLabel = false;
  @Input() colon = true;
  @Input() table = false;
  @Input() maxHeight = 197;
  @Input() itemsShowLimit = 5;
  @Input() description: string;
  @Input() loading: boolean;
  @Input() placeholder = '--Select--';


  get isInlineRequired(): boolean {
    if (this.forceRequiredLabel === true) {
      return true;
    }
    return (!this.label && this.required && this.showRequiredLabel);
  }

  dropdownSettings = {};

  constructor(
    cd: ChangeDetectorRef
  ) { super(cd); }

  ngOnInit() {
    this.setDropdownSettings();
  }

  setDropdownSettings() {
    this.dropdownSettings = {
      idField: 'value',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      singleSelection: this.singleSelection,
      enableCheckAll: this.enableCheckAll,
      disabled: this.forceDisabled || this.disabled,
      maxHeight: this.maxHeight,
      itemsShowLimit: this.itemsShowLimit,
      allowSearchFilter: this.allowSearchFilter,

    };
  }
}
