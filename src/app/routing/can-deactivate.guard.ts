import { Injectable, HostListener } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BusySpinner } from '../common/busy-spinner';
import { UtilityService } from '../shared/utility.service';

export abstract class CanDeactivateConfirmation extends BusySpinner {

    deactivateRedirectUrl: string;
    abstract deactivateConfirmationModal: any;
    abstract isDirty(): boolean;
    

    constructor() {
        super();
    }

    @HostListener('window:beforeunload', ['$event'])
    needDeactivateConfirmation($event): boolean {
        if ($event) {
            if (this.isDirty()) {
                $event.returnValue = 'Changes that you made may not be saved.';
            }
        } else {
            return this.isDirty();
        }
    }

}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanDeactivateConfirmation> {
    constructor(
        private utilityService: UtilityService,
        private modalService: NgbModal,
    ) { }

    canDeactivate(
        component: CanDeactivateConfirmation,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
        future: RouterStateSnapshot): Observable<boolean> | boolean {
            if (!component.needDeactivateConfirmation || !component.needDeactivateConfirmation(null) || future.url === '/forbidden' || future.url === '/login') {
                return true;
            }
        this.modalService.open(component.deactivateConfirmationModal, this.utilityService.modalOption);
        component.deactivateRedirectUrl = future.url;
        return false;
    }
}
