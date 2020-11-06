import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { Language, TranslationService } from 'angular-l10n';

@Component({
  selector: 'samplicity-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent extends FieldBaseComponent implements OnInit, OnChanges {

  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Input() type = 'text';
  @Input() maxLength: number;
  @Language() lang: string;
  @Input() placeholder: string = 'SearchPlaceholder';

  translatedPlaceholder: string;

  constructor(
    private translationService: TranslationService
  ) {
    super()
  }

  ngOnInit() {
    this.translatedPlaceholder = this.translationService.translate(this.placeholder);
    this.translationService.translationChanged().subscribe(() => this.translatedPlaceholder = this.translationService.translate('SearchPlaceholder'));
  }

  ngOnChanges(changes) {
    if (changes.placeholder && changes.placeholder.currentValue) {
      this.translatedPlaceholder = this.translationService.translate(this.placeholder);
    }
  }

  onSearch() {
    if (this.parentFormGroup.valid) {
      this.search.emit(this.control!.value);
    }
  }

}
