import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'samplicity-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss']
})
export class CheckboxListComponent implements OnInit, AfterViewInit {

  @Input() label: string;
  @Input() noLabel: boolean = false;
  @Input() controls: string[] = []; //Names of form controls for each checkbox, in order of appearance
  @Input() checkboxLabels: string[] = []; //Labels for each checkbox, in same order as controls input
  @Input() required: boolean = false;
  @Input() formGroup: FormGroup;
  @Input() description: string;
  @Input() labelTranslated = true;
  @Input() disabled = false;

  get isInvalid(): boolean {
    return this.anyDirty && this.noneSelected;
  }

  get anyDirty(): boolean {
    const index = this.controls.findIndex((control) => {
      return this.formGroup.get(control).dirty;
    });

    return index > -1;
  }

  get noneSelected(): boolean {
    if (!this.required) {
      return false;
    }
    let trueTotal = 0;
    this.controls.forEach(control => {
      !!this.formGroup.get(control).value ? trueTotal++ : null;
    });
    return !trueTotal ? true : false;
  }

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.onCheckListChanges();
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
    // Workaround for expressionChangedAfterItHasBeenCheckedError
    setTimeout(()=> {
      if (this.required && this.noneSelected) {
        this.formGroup.get(this.controls[0]).setValidators([Validators.requiredTrue]);
      } else {
        this.formGroup.get(this.controls[0]).clearValidators()
      }
      this.formGroup.get(this.controls[0]).updateValueAndValidity();
      this.formGroup.get(this.controls[0]).markAsPristine();
    }, 1);

  }

  onCheckListChanges(): void {
    this.controls.forEach((control) => {
      this.formGroup.get(control).valueChanges.subscribe((change) => {
        if (this.required && this.noneSelected) {
          this.formGroup.get(this.controls[0]).setValidators([Validators.requiredTrue]);
        } else {
          this.formGroup.get(this.controls[0]).clearValidators();
        }
        this.formGroup.get(this.controls[0]).updateValueAndValidity({emitEvent: false});
      });
    });
  }



}
