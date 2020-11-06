import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { SecurityService } from '../../core/security.service';

@Directive({
    selector: '[disableIfUnauthorized]'
})
export class DisableIfUnauthorizedDirective implements OnInit {

    @Input() disableIfUnauthorized: string;

    constructor(
        private el: ElementRef,
        private securityService: SecurityService
    ) { }

    ngOnInit() {
        if (this.disableIfUnauthorized) {
            this.securityService.checkPermission(this.disableIfUnauthorized)
                .then((hasPermission) => {
                    if (!hasPermission) {
                        this.disable();
                    }
                })
                .catch(() => {
                    this.disable();
                });
        }
    }

    private disable() {
        this.el.nativeElement.disabled = true;
    }
}
