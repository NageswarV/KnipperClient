import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[sgOnlyNumber]'
})
export class InputOnlyNumbersDirective {
    regexStr = '^[0-9]*$';
    @Input() sgOnlyNumber: boolean;
    @Input() min: number;
    @Input() max: number;
    constructor(private el: ElementRef) { }

    @HostListener('keydown', ['$event']) onKeyDown(event) {
        const e = <KeyboardEvent>event;
        /* tslint:disable */
        if (this.sgOnlyNumber) {
            if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: Ctrl+C
                (e.keyCode == 67 && e.ctrlKey === true) ||
                // Allow: Ctrl+V
                (e.keyCode == 86 && e.ctrlKey === true) ||
                // Allow: Ctrl+X
                (e.keyCode == 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }

            let ch: string;
            if (e.key === undefined) {
                // Safari does not have a defined key and only keyCode
                ch = String.fromCharCode(e.keyCode);
            } else {
                ch = e.key;
            }

            const regEx = new RegExp(this.regexStr);
            if (!regEx.test(ch)) {
                e.preventDefault();
            }
            /* tslint:enable */
        }
    }

    @HostListener('keyup', ['$event']) onKeyUp(event) {
        const e = <KeyboardEvent>event;
        const val = e.currentTarget['value'];
        if (val) {
            if ((this.min || this.min === 0) && parseInt(e.currentTarget['value']) < this.min) {
                e.currentTarget['value'] = this.min;
                e.currentTarget.dispatchEvent(new Event("input", { bubbles: true }));
            }

            if ((this.max || this.max === 0) && parseInt(e.currentTarget['value']) > this.max) {
                e.currentTarget['value'] = this.max;
                e.currentTarget.dispatchEvent(new Event("input", { bubbles: true }));
            }
        }
    }
}
