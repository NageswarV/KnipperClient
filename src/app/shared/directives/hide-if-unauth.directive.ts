import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { SecurityService } from '../../core/security.service';

@Directive({
    selector: '[hideIfUnauthorized]'
})
export class HideIfUnauthorizedDirective implements OnInit {

    @Input() hideIfUnauthorized: string;

    constructor(
        private el: ElementRef,
        private securityService: SecurityService
    ) { }

    ngOnInit() {
        if (this.hideIfUnauthorized) {
            this.securityService.checkPermission(this.hideIfUnauthorized)
            .then((hasPermission) => {
                if (!hasPermission) {
                    this.hide();
                }
            })
            .catch(() => {
                this.hide();
            });
        }
    }

    private hide() {
        this.el.nativeElement.style.display = 'none';
    }
}
