
import {timer as observableTimer,  Observable } from 'rxjs';
import { Component, OnInit, OnDestroy, Input, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from "@angular/common";

import { TenantService } from '../tenant';

@Component({
    selector: 'sg-login-carousel',
    templateUrl: './login-carousel.component.html',
    styleUrls: ['./login-carousel.component.scss']
})
export class LoginCarouselComponent implements OnInit, OnDestroy {
    loginAttachmentUrls: string[];

    displayLoginAttachmentUrls: string[];
    containerWidthNumber: number;
    containerWidthStyle: string;
    slideWidthNumber: number;
    slideWidthStyle: string;
    slideOffsetNumber: number;
    slideOffsetStyle: string;
    maxOffsetNumber: number;
    scrollTimer: Observable<any>;
    timerSubscription: any;
    disableTransitions: boolean;
    loop: number;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private tenantService: TenantService) { }

    ngOnInit(): void {
        this.disableTransitions = false;
        this.loginAttachmentUrls = [];
        this.scrollTimer = observableTimer(5000, 4000);
        this.displayLoginAttachmentUrls = this.loginAttachmentUrls;
        this.displayLoginAttachmentUrls = this.displayLoginAttachmentUrls.concat(this.loginAttachmentUrls[0]);
        this.slideOffsetNumber = 0;
        this.setSliderStyles();
        if (!this.document.hidden) {
            this.timerSubscription = this.scrollTimer.subscribe(t => {
                this.advanceSlider();
            });
        }
    }

    setSliderStyles(): void {
        this.containerWidthNumber = 100 * (this.loginAttachmentUrls.length + 1);
        this.containerWidthStyle = this.containerWidthNumber + '%';
        this.slideWidthNumber = 100 / (this.loginAttachmentUrls.length + 1);
        this.slideWidthStyle = this.slideWidthNumber + '%';
        this.slideOffsetStyle = this.slideOffsetNumber + '%';
        this.maxOffsetNumber = ((this.loginAttachmentUrls.length + 1) * 100) - 100;
    }

    advanceSlider(): void {
        if (this.slideOffsetNumber < this.maxOffsetNumber) {
            this.slideOffsetNumber += 100;
            this.slideOffsetStyle = this.slideOffsetNumber + '%';
        } else {
            this.resetSlider();
        }
    }

    resetSlider(): void {
        this.disableTransitions = true;
        this.slideOffsetNumber = 0;
        this.slideOffsetStyle = this.slideOffsetNumber + '%';
        setTimeout(() => {
            this.disableTransitions = false;
            this.advanceSlider();
        }, 100)
    }

    @HostListener('document:visibilitychange', [])
    onVisibilityChange() {
        if (this.document.hidden) {
            this.timerSubscription.unsubscribe();
        } else {
            this.timerSubscription = this.scrollTimer.subscribe(t => {
                this.advanceSlider();
            });
        }
    }

    ngOnDestroy() {
        this.timerSubscription.unsubscribe();
    }
}
