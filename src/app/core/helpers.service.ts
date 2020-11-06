import { Injectable } from '@angular/core';
import { FormGroup, FormArray, AbstractControl, FormControl } from '@angular/forms';

@Injectable()
export class HelpersService {

  constructor() { }

  newGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  emptyGuid(): string {
    return '00000000-0000-0000-0000-000000000000';
  }

  // Get nested object by path
  resolveObject(path, obj) {
    return path.split('.').reduce(function (prev, curr) {
      return prev ? prev[curr] : undefined
    }, obj || self)
  }

  deepCopy(source): any {
    return JSON.parse(
      JSON.stringify(
        source,
        (k, v) => v === undefined ? null : v
      ));
  }

  // Clones a reactive form group
  copyFormControl(control: AbstractControl) {
    if (control instanceof FormControl) {
      return new FormControl(control.value);
    } else if (control instanceof FormGroup) {
      const copy = new FormGroup({});
      Object.keys(control.getRawValue()).forEach(key => {
        copy.addControl(key, this.copyFormControl(control.controls[key]));
      });
      return copy;
    } else if (control instanceof FormArray) {
      const copy = new FormArray([]);
      control.controls.forEach(control => {
        copy.push(this.copyFormControl(control));
      })
      return copy;
    }
  }

}
