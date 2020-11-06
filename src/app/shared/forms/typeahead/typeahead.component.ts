import { Component, Input, ChangeDetectorRef, OnInit, Output, EventEmitter } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { Language, LocaleService } from 'angular-l10n';

import { Observable } from 'rxjs/Observable';
import { Item } from '../../../core/classification.service'

@Component({
  selector: 'samplicity-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent extends FieldBaseComponent implements OnInit {

  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() optionSelected: EventEmitter<string> = new EventEmitter();
  @Input() items: Item[];
  @Input() codeProperty: string;
  @Input() typeaheadErrors: string[];
  @Input() valueProp: string = 'names';
  @Input() keepInvalidTextOnBlur: boolean = false;
  @Input() maxLength: number = 500;
  @Input() placeholder: string;
  @Input() labelTranslated = true;
  //Added because some components would benefit from notifications from changes from length 1 to 0.
  //Defaulted to 1 so as to not break any components dependent on the existing implementation.
  @Input() minLengthForChangeNotification: number = 1;

  @Language() lang: string;

  validState: boolean = true;

  constructor(public locale: LocaleService, cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit() {
    if (this.control) {
      this.control.valueChanges.filter(x => x && x.length > this.minLengthForChangeNotification).forEach(str => {
        this.search.emit(str);
      });
    }
  }

  displayFn(item): string {
    if (item) {
      if (item.names && item.names.length) {
        const language = this.locale.getCurrentLanguage();
        return item.names.find(name => name['language'] === language).value;
      } else if (this.codeProperty) {
        return item[this.codeProperty];
      }
    }
    return '';
  }

  searchOptionSelected(matAutoSelEvt: MatAutocompleteSelectedEvent) {
    this.validState = true;
    this.control.setValue(matAutoSelEvt.option.value);
    this.optionSelected.emit(matAutoSelEvt.option.value);
  }

  onInputBlur() {
    if (!this.validState && !this.keepInvalidTextOnBlur) {
      this.control.setValue('');
      this.typeaheadErrors = [];
    }
    if (!(this.control.value instanceof Item)) {
      this.control.setValue('');
      this.typeaheadErrors = [];
    }
  }

  onInputChange() {
    this.validState = false;
  }

  onInputFocus() {
    this.items = [];
  }
}
