import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { LocaleService } from 'angular-l10n';

@Component({
  selector: 'samplicity-display-translation, [samplicity-display-translation]',
  templateUrl: './display-translation.component.html',
  styleUrls: ['./display-translation.component.scss']
})
export class DisplayTranslationComponent implements OnInit {

  @Input() values: object[];

  get currentLanguage(): string {
    return this.locale.getCurrentLanguage();
  }

  constructor(
    public locale: LocaleService
  ) { }

  ngOnInit() {
  }

}
