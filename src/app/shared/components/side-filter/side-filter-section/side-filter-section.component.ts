import { Component, OnInit, Input } from '@angular/core';
import { Language } from 'angular-l10n';

@Component({
  selector: 'samplicity-side-filter-section',
  templateUrl: './side-filter-section.component.html',
  styleUrls: ['./side-filter-section.component.scss']
})
export class SideFilterSectionComponent implements OnInit {

  @Language() lang: string;
  @Input() header: string | object[];
  @Input() headerParameters: object;
  @Input() isCard: boolean;
  @Input() expanded = true;
  @Input() height = '24px';
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
