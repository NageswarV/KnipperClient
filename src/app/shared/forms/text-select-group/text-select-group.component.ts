import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';
import { AbstractControl } from '@angular/forms';
import { LocaleService, Language } from 'angular-l10n';
import { TextMasks, TextUnmasks, unmask } from '../text-mask';
import { Subscription } from 'rxjs/Subscription';
import { AppConsts } from '../../../shared/app-consts';

@Component({
  selector: 'samplicity-text-select-group',
  templateUrl: './text-select-group.component.html',
  styleUrls: ['./text-select-group.component.scss']
})
export class TextSelectGroupComponent extends FieldBaseComponent implements OnInit {

  @Input() type = 'text';
  @Input() showDefaultOption = true;
  @Input() selectName: string;
  @Input() selectRequired = false;
  @Input() items: object[];
  @Input() selectWidth = 50;
  @Input() textMask: string;
  @Input() namesProp = 'names';
  @Language() lang: string;

  maskSub: Subscription = new Subscription();
  masks: object;

  get isInlineRequired(): boolean {
    return (!this.label && this.required);
  }

  get inputControl(): AbstractControl | null {
    if (this.parentFormGroup && this.name) {
      return this.parentFormGroup.get(this.name);
    }
    return null;
  }

  get selectControl(): AbstractControl | null {
    if (this.parentFormGroup && this.selectName) {
      return this.parentFormGroup.get(this.selectName);
    }
    return null;
  }

  constructor(private locale: LocaleService, cd: ChangeDetectorRef) {
    super(cd);
    this.masks = TextMasks;
  }

  ngOnInit() {
    if (this.textMask) {
      this.maskSub = unmask(this.parentFormGroup.get(this.name)!, TextUnmasks[this.textMask]);
    }
    if (this.inputControl) {
      this.inputControl.valueChanges.subscribe((val) => {
        if (val === '' && this.inputControl) {
          this.inputControl.setValue(null);
        }
        // Have to clear manually update errors for the select on input value change
        if (this.selectControl && this.selectControl.errors) {
          this.selectControl.updateValueAndValidity();
        }

      });
    }
  }

  updateSelect(): void {
    if (this.selectControl && this.inputControl) {
      if (!this.inputControl.value) {
        this.selectControl.disable();
        this.selectControl.reset();
      } else {
        this.selectControl.enable();
      }
    }
  }

  ngOnDestroy() {
    this.maskSub.unsubscribe();
  }

}
