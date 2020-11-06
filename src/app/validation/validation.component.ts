
import {filter} from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Message, MessageType } from './validation.service';
import { ValidationService } from './validation.service';

@Component({
    selector: 'sg-validation',
    templateUrl: './validation.component.html',
    styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {
    @Input() componentId: string;
    cssClass: string;
    @Input() errorHeading: string;

    successMessageList: Message[];
    errorMessageList: Message[];
    warningMessageList: Message[];

    constructor(private validationService: ValidationService, router: Router) {
        this.successMessageList = [];
        this.errorMessageList = [];
        this.warningMessageList = [];

        router.events.pipe(
            filter(event => event instanceof NavigationStart))
            .subscribe((event: NavigationStart) => {
                if (this.componentId === 'global') {
                    this.clearMessage('global');
                }
            });
    }

    ngOnInit() {
        this.validationService.getValidationMessage().subscribe(x => {
            if (this.componentId === x.componentId) {
                this.pushMessage(x);
            }
        });
        this.validationService.getClearEvent().subscribe(x => {
            this.clearMessage(x);
        });
        if (this.componentId === 'global') {
            this.cssClass = 'global';
        }
    }

    pushMessage(message: Message) {
        if (message.messageType === MessageType.ERROR) {
            this.errorMessageList.push(message);
        } else if (message.messageType === MessageType.WARNING) {
            this.warningMessageList.push(message);
        } else {
            this.successMessageList.push(message);
        }
    }

    hideSuccessMessage() {
        this.successMessageList = [];
    }

    hideWarningMessage() {
        this.warningMessageList = [];
    }

    hideErrorMessage() {
        this.errorMessageList = [];
    }

    clearMessage(componentId: string) {
        if (this.componentId === componentId) {
            if (!this.validationService.stickySuccess) {
                this.hideSuccessMessage();
            }
            if (!this.validationService.stickyWarning) {
                this.hideWarningMessage();
            }
            if (!this.validationService.stickyError) {
                this.hideErrorMessage();
            }
        }
    }

    hasErrors() {
        return this.errorMessageList.length > 0;
    }

    hasWarning() {
        return this.warningMessageList.length > 0;
    }
}
