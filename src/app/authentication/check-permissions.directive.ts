import { Directive, ViewContainerRef, TemplateRef, Input, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthenticationService } from './authentication.service';

@Directive({
    selector: '[sgCheckPermissions]',
    exportAs: 'api'
})
export class CheckPermissionsDirective {
    private checkingPermissions: string[];
    private isShowing = false;
    private requiresAll = true;

    constructor(
        private authenticationService: AuthenticationService,
        private container: ViewContainerRef,
        private template: TemplateRef<any>
    ) { }

    @Input('sgCheckPermissionsRequiresAll')
    set checkPermissionsRequiresAll(value: boolean) {
        this.requiresAll = value;
    }

    @Input('sgCheckPermissions')
    set checkPermissions(permissions: string[]) {
        this.checkingPermissions = permissions;

        if (this.checkAccess(this.checkingPermissions)) {
            this.show();
        } else {
            this.hide();
        }
    }

    checkAccess(permissions: string[]): boolean {
        return this.authenticationService.checkPermissions(permissions, this.requiresAll);
    }

    private show(): void {
        if (!this.isShowing) {
            this.container.createEmbeddedView(this.template);

            this.isShowing = true;
        }
    }

    private hide(): void {
        if (this.isShowing) {
            this.container.clear();

            this.isShowing = false;
        }
    }
}
