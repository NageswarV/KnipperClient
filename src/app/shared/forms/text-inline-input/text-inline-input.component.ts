import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { Language } from 'angular-l10n';
import { TextMasks, TextUnmasks, unmask } from '../text-mask';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'samplicity-text-inline-input',
  templateUrl: './text-inline-input.component.html',
  styleUrls: ['./text-inline-input.component.scss']
})
export class TextInlineInputComponent extends FieldBaseComponent implements OnInit, OnDestroy {

  @Input() type = 'text';
  @Input() maxLength: number;
  @Input() textMask: string;
  @Input() readonly = false;
  @Input() tableLabel = false;
  @Input() colon = true;
  @Input() forceRequiredLabel = false;

  @Language() lang: string;

  maskSub: Subscription = new Subscription();
  masks: object;

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
      });
    }
  }

  ngOnDestroy() {
    this.maskSub.unsubscribe();
  }

  onBlur() {
    if (this.control.value) {
      const trimmed = this.control.value.trim();
      if (trimmed !== this.control.value) {
        this.control.setValue(trimmed);
      }
    }
  }
}
