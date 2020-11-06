import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
    selector: 'sg-field-validation',
    templateUrl: './field-validation.component.html',
    styleUrls: ['./field-validation.component.scss']
})
export class FieldValidationComponent {
    @Input() hidden: boolean;
    @Input() message: string;
    @Input() errorMessages: string[];
    @Input() warningMessages: string[];
}
