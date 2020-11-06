import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { Language } from 'angular-l10n';
import { TextMasks, TextUnmasks, unmask } from '../text-mask';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'samplicity-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent extends FieldBaseComponent implements OnInit, OnDestroy {

  @Input() type = 'text';
  @Input() addonIconRight: string;
  @Input() addonTextRight: string;
  @Input() addonIconLeft: string;
  @Input() addonTextLeft: string;
  @Input() inputWidth: string;
  @Input() inputTextAlreadyTranslated = false;
  @Input() maxLength: number;
  @Input() textMask: string;
  @Input() showRequiredLabel = true;
  @Input() forceRequiredLabel = false;
  @Input() colon = true;
  @Input() table = false;
  @Input() warning: string = null;
  @Input() showWarning = true;
  @Input() error: string = null;
  @Input() disabled: boolean;
  @Output() keyUp: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Input() labelTranslated = true;
  @Input() descriptionAboveInput = false;
  @Input() isInvalid = false;

  @Input() description: string;

  @Language() lang: string;

  maskSub: Subscription = new Subscription();
  masks: object;

  get isInlineRequired(): boolean {
    if (this.forceRequiredLabel === true) {
      return true;
    }
    return (!this.label && this.required && this.showRequiredLabel);
  }

  constructor(
    cd: ChangeDetectorRef,
  ) {
    super(cd);
    this.masks = TextMasks;
  }

  ngOnInit() {
    if (this.textMask) {
      this.maskSub = unmask(this.parentFormGroup.get(this.name)!, TextUnmasks[this.textMask]);
    }
    if (this.control) {
      this.control.valueChanges.subscribe((val) => {
        if (val === '' && this.control) {
          this.control.setValue(null);
        }

        this.change.emit(this.control.value);
      });

      if (this.control.disabled || this.disabled) {
        this.disable();
      } else {
        this.enable();
      }
    }
  }

  ngOnDestroy() {
    this.maskSub.unsubscribe();
  }

  onBlur() {
    if (this.control.value) {
      const trimmed = this.control.value.toString().trim();
      if (trimmed !== this.control.value) {
        this.control.setValue(trimmed);
      }
    }
    this.blur.emit();
  }
}
