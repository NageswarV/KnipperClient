import { Component, Input, OnDestroy, OnChanges, SimpleChanges,
  ChangeDetectorRef, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { LocaleService } from 'angular-l10n';
import { Subscription } from 'rxjs/Subscription';
import { Item } from '../../../core/client.service';

@Component({
  selector: 'samplicity-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends FieldBaseComponent implements OnChanges, OnDestroy, AfterContentInit {

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() contentChange: EventEmitter<any> = new EventEmitter();
  @Input() items: Item[];
  @Input() itemNamesTranslated = false;
  @Input() placeholder = 'Select';
  @Input() showDefaultOption = true;
  @Input() showRequiredLabel = true;
  @Input() forceRequiredLabel = false;
  @Input() namesProp = 'names';
  @Input() valueProp = 'value';
  @Input() labelProp = 'label';
  @Input() sortProp = '';
  @Input() sort = true;
  @Input() colon = true;
  @Input() table = false;
  @Input() icon: string;
  @Input() iconColor: string;
  @Input() isInvalid = false;
  @Input() labelTranslated = true;
  @Input() readonly = false;
  @Input() valuesTranslated = false;
  languageSub: Subscription;

  get value(): string {
    if (this.control) {
      const value = this.items.find(x => {
        return x[this.valueProp] === this.control.value;
      });

      if (value) {
        return value[this.labelProp];
      }
    }
    return '';
  }

  get isInlineRequired(): boolean {
    return (!this.label && this.required && this.showRequiredLabel);
  }

  constructor(public locale: LocaleService, cd: ChangeDetectorRef) {
    super(cd);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items && changes.items.currentValue && changes.items.currentValue.length > 0) {
      this.sortItems();
      this.contentChange.emit();
    }
  }

  ngAfterContentInit() {
    this.languageSub = this.locale.defaultLocaleChanged.subscribe(() => {
      this.sortItems();
    });

    if (this.control) {
      if (this.control.value === null) {
        this.control.setValue('');
      }

      this.control.valueChanges.subscribe((val) => {
        // To accomodate saveable null values in select for backend
        // Converting "null" to null on select
        if (this.control && val === null) {
          this.control.setValue('');
        }
      });
    }
  }

  trackById(index: number, item: object): string {
    return item[this.valueProp ? this.valueProp : 'id'];
  }

  getValue(option: object): object {
    return this.valueProp ? option[this.valueProp] : option;
  }

  sortItems(): void {
    if (this.sort && this.items && this.items.length > 0) {
      this.items.sort((a, b) => {
        const firstName = this.getValueForSort(a);
        const secondName = this.getValueForSort(b);
        const localeSortResult = firstName['value'] ? firstName['value'].localeCompare(secondName['value']) : null;

        if (this.sortProp) {
          let firstProp = 0;
          let secondProp = 0;
          if (typeof a[this.sortProp] === 'boolean') {
            firstProp = a[this.sortProp] ? 1 : 0;
            secondProp = b[this.sortProp] ? 1 : 0;
          } else {
            firstProp = a[this.sortProp];
            secondProp = b[this.sortProp];
          }
          return (firstProp - secondProp) || localeSortResult;
        }
        return localeSortResult;
      });
    }
  }

  getValueForSort(item: object): string {
    const value = item['values'] === undefined ? item['names'] : item['values'];
    return value ? value.find((i) => i['language'] === this.locale.getCurrentLanguage()) : '';
  }

  compareLanguageDto(l1, l2) {
    if (!l1 || !l2) {
      return false;
    }

    if (l1.id) {
      l1 = l1.id;
    }

    if (l2.id) {
      l2 = l2.id;
    }

    return l1 === l2;
  }

  ngOnDestroy() {
    this.languageSub.unsubscribe();
  }
}
