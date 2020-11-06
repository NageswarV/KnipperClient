import {
    Directive, ElementRef, AfterViewChecked,
    Input, HostListener
} from '@angular/core';

@Directive({
    selector: '[sgMyMatchHeight]'
})
export class MatchHeightDirective implements AfterViewChecked {

    @Input()
    sgMyMatchHeight: string;

    constructor(private el: ElementRef) {
    }

    ngAfterViewChecked() {
        this.matchHeight(this.el.nativeElement, this.sgMyMatchHeight);
    }

    @HostListener('window:resize')
    onResize() {
        this.matchHeight(this.el.nativeElement, this.sgMyMatchHeight);
    }

    @HostListener('document:transitionend')
    onTransitionEnd() {
        this.matchHeight(this.el.nativeElement, this.sgMyMatchHeight);
    }

    matchHeight(parent: HTMLElement, className: string) {
        /* tslint:disable */
        if (!parent) return;
        const children = parent.getElementsByClassName(className);
        if (!children) return;
        /* tslint:enable */
        Array.from(children).forEach((x: HTMLElement) => {
            x.style.height = 'auto';
        });

        const itemHeights = Array.from(children)
            .map(x => x.getBoundingClientRect().height);

        const maxHeight = itemHeights.reduce((prev, curr) => {
            return curr > prev ? curr : prev;
        }, 0);

        Array.from(children)
            .forEach((x: HTMLElement) => x.style.height = `${maxHeight}px`);
    }
}
