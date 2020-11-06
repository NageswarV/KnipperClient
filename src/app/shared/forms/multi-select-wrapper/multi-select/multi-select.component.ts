import { Component, Input, OnInit, ViewChild, OnDestroy, OnChanges,
  SimpleChanges, forwardRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange, MatCheckbox } from '@angular/material/checkbox';
import { LocaleService } from 'angular-l10n';
import { Subscription } from 'rxjs/Subscription';
import { Item } from '../../../../core/classification.service';

@Component({
  selector: 'samplicity-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    }]
})
export class MultiSelectComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('selectAll', {static:false}) selectAllButton: MatCheckbox;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Input() disabledItem = false;
  @Input() listItems: Item[];
  @Input() outputIds = true;
  @Input() idProperty = 'value';
  @Input() namesProperty = 'names';
  @Input() namesTranslated: boolean;
  @Input() collapsible: boolean;
  @Input() title: object;
  @Input() readonly = false;
  @Input() sort = true;
  @Input() multiSort = false;
  @Input() selectAll = false;
  @Input() selectAllText: string;
  @Input() height: string;
  @Input() maxHeight: string;
  @Input() parentFormGroup: FormGroup;
  @Input() name: string;
  @Input() noWell = false;
  @Input() labelTranslated = true;

  collapsed: boolean;
  selectAllChecked: boolean;
  languageSub: Subscription;
  renderPanel = false;

  get selectedItems(): Item[] {
    const control = this.parentFormGroup.get(this.name);
    if (control.value) {
      return control.value;
    } else {
      return [];
    }
  }

  get allItemsSelected(): boolean {
    return (this.selectedItems && this.listItems) ? (this.selectedItems.length === this.listItems.length) : false;
  }

  constructor(public locale: LocaleService) { }

  get currentLanguage() {
    return this.locale.getCurrentLanguage();
  }

  ngOnInit() {
    this.languageSub = this.locale.defaultLocaleChanged.subscribe(() => {
      this.sortItems();
    });

    if (this.multiSort) {
      this.sortItemsByAlphaAndChecked();
    }
    if (this.collapsible) {
      setTimeout(() => this.renderPanel = true, 1);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listItems && this.listItems.length > 0) {
      if (this.multiSort) {
        this.sortItemsByAlphaAndChecked();
      } else {
        this.sortItems();
      }
    }
  }

  trackById(index: number, item: object): string {
    return item[this.idProperty];
  }

  onSelectAll(event: MatCheckboxChange): void {
    if (event.checked) {
      const listItemIds = this.listItems.map(x => x[this.idProperty]);
      this.parentFormGroup.get(this.name).setValue(listItemIds);
      this.change.emit(listItemIds);
    } else {
      this.parentFormGroup.get(this.name).setValue([]);
      this.change.emit([]);
    }
  }

  onSelect(event: MatCheckboxChange, item: Item): void {
    const index = this.selectedItems.findIndex(x => x === item[this.idProperty]);
    const listItemIds = this.selectedItems.map(x => x);
    if (event.checked) {
      if (index === -1) {
        listItemIds.push(item[this.idProperty]);
      }
    } else {
      if (index > -1) {
        listItemIds.splice(index, 1);
      }
    }
    this.parentFormGroup.get(this.name).setValue(listItemIds);
    this.change.emit(listItemIds);
  }

  checkSelected(item: Item): boolean {
    return this.selectedItems.some(x => x === item[this.idProperty]);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledItem = isDisabled;
  }

  sortItems(): void {
    if (this.sort) {
      this.listItems.sort((a, b) => {
        const firstName = this.getNameForSort(a);
        const secondName = this.getNameForSort(b);
        return firstName['value'].localeCompare(secondName['value']);
      });
    }
  }

  sortItemsByAlphaAndChecked(): void {
    this.sortItems();
    const removedListItems = new Array<Item>();
    const newListItems = new Array<Item>();
    let selectedItemsIds = new Array<string>();
    selectedItemsIds = this.selectedItems.map(item => item['id']);
    this.listItems.forEach(item => {
      if (selectedItemsIds.indexOf(item['id']) > -1) {
        removedListItems.push(item);
      } else {
        newListItems.push(item);
      }
    });

    this.listItems = newListItems;
    removedListItems.reverse().forEach(item => this.listItems.unshift(item));
  }

  getNameForSort(item: object): string {
    return item[this.namesProperty].find((i) => i['language'] === this.locale.getCurrentLanguage());
  }

  ngOnDestroy() {
    this.languageSub.unsubscribe();
  }
}
