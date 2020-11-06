import { Component, OnInit, ChangeDetectorRef, Input, ViewEncapsulation } from '@angular/core';
import { MultiSelectWrapperComponent } from '../multi-select-wrapper/multi-select-wrapper.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocaleService } from 'angular-l10n';
import { HelpersService } from '../../../core/helpers.service';

@Component({
  selector: 'samplicity-multi-select-list',
  templateUrl: './multi-select-list.component.html',
  styleUrls: ['./multi-select-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultiSelectListComponent extends MultiSelectWrapperComponent implements OnInit {

  @Input() groupProperty: string;
  @Input() titleProperty: string = 'names';
  @Input() filterFn: (item: any, term: string) => boolean;
  @Input() readonly: boolean = false;
  @Input() title: string;
  @Input() isInvalid: boolean = false;
  @Input() labelTranslated = true;

  searchForm: FormGroup;
  filteredItems: object[];

  constructor(
    private locale: LocaleService,
    cd: ChangeDetectorRef,
    private helpers: HelpersService,
    private fb: FormBuilder
  ) {
    super(cd);
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnChanges(changes) {
    if (changes && changes.listItems) {
      this.onSearch();
    }
  }

  onSearch(term?: string): void {
    if (this.listItems) {
      if (term) {
        const filtered: any[] = [];
        this.listItems.forEach(listItem => {
          const item = this.helpers.deepCopy(listItem);
          if (item[this.groupProperty]) {
            item[this.groupProperty] = item[this.groupProperty].filter((item) => {
              if (this.filterFn) {
                return this.filterFn(item, term);
              }
              return this.defaultFilterFn(item, term);
            });
          }
          filtered.push(item);
        });
        this.filteredItems = filtered;
      } else {
        this.filteredItems = this.listItems;
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

}
