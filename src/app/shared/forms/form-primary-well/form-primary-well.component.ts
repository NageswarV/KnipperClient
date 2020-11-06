import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Language } from 'angular-l10n';

@Component({
  selector: 'samplicity-form-primary-well',
  templateUrl: './form-primary-well.component.html',
  styleUrls: ['./form-primary-well.component.scss']
})
export class FormPrimaryWellComponent implements OnInit {

  @Language() lang: string;
  @Input() header: string | object[];
  @Input() headerParameters: object;
  @Input() isCard: boolean;
  @Input() isOpenOnLoad = true;
  @Input() hasErrorPrefix = false;
  @Input() headerTranslated = false;
  @Input() headerButton: string;
  @Input() headerbuttonColor: string;
  @Input() headerButtonIcon: string;
  @Input() hideButton = false;
  @Output() buttonClick: EventEmitter<any> = new EventEmitter();
  headerClass: string;

  get headerIsDto(): boolean {
    return Array.isArray(this.header) && this.header[0] instanceof Object;
  }

  ngOnInit(): void {
    if (this.isCard) {
      this.headerClass = 'card-section-header';
    }
  }
}
