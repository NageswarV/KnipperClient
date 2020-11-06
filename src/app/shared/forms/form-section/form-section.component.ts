import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Language } from 'angular-l10n';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'samplicity-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.scss']
})
export class FormSectionComponent implements OnInit {

  @Language() lang: string;
  @Input() header: string | object[];
  @Input() headerParameters: object;
  @Input() headerIcon: string;
  @Input() isCard: boolean;
  @Input() expanded = true;
  @Input() height = 'auto';
  @Input() level = 1;
  @Input() isWarning = false;
  @Input() isError = false;
  @ViewChild('expansionPanel', {static:false}) expansionPanel: MatExpansionPanel;
  headerClass: string;

  get headerIsDto(): boolean {
    return Array.isArray(this.header) && this.header[0] instanceof Object;
  }

  ngOnInit(): void {
    if (this.isCard) {
      this.headerClass = 'card-section-header';
    }
  }

  openPanel(): void {
    this.expansionPanel.open();
  }

  closePanel(): void {
    this.expansionPanel.close();
  }
}
