import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { SearchInputComponent } from '../search-input/search-input.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocaleService, Language } from 'angular-l10n';
import { MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'samplicity-multi-select-search',
  templateUrl: './multi-select-search.component.html',
  styleUrls: ['./multi-select-search.component.scss']
})
export class MultiSelectSearchComponent extends FieldBaseComponent implements OnInit, OnChanges {

  @ViewChild('group', {static:false}) group: MatRadioGroup;
  @ViewChild('search', { static: false }) search: SearchInputComponent;

  @Input() items: object[];
  @Input() idProperty: string;
  @Input() filterFn: (item: any, term: string) => boolean;
  @Input() allLabel: string;
  @Input() selectLabel: string;
  @Input() height: string;

  filteredItems: object[];
  searchForm: FormGroup;

  constructor(
    private locale: LocaleService,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnChanges(changes) {
    if (changes && changes.items) {
      this.onSearch();

      const value = this.control ? this.control.value : null;
      if (value) {
        if (value.length) {
          this.group.value = 'select';
        } else {
          this.group.value = 'all';
        }
      }
    }
  }

  onSearch(term?: string): void {
    if (this.items) {
      if (term) {
          this.filteredItems = this.items.filter((item) => {
            if (this.filterFn) {
              return this.filterFn(item, term);
            }
            return this.defaultFilterFn(item, term);
          });
      } else {
        this.filteredItems = this.items;
      }
    }
  }

  defaultFilterFn(item, term: string): boolean {
    if (item && item.names && item.names.length) {
      const language = this.locale.getCurrentLanguage();
      const name = item.names.find(item => item.language.toString() === language);
      if (name && name.value && name.value.toLowerCase().indexOf(term.toLowerCase()) >= 0) {
        return true;
      }
    }
    return false;
  }

  reset() {
    if (this.control) {
      const value = this.control ? this.control.value : null;
      if (value) {
        if (value.length) {
          this.group.value = 'select';
        } else {
          this.group.value = 'all';
        }
      }      
      this.search.control!.setValue("");
      this.onSearch();
    }
  }

  onSelectAll() {
    if (this.control) {
      this.control.setValue([]);
    }
  }

}
