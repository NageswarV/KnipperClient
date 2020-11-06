import { Component, OnInit, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BusySpinner } from '../common/busy-spinner';
import { AuthenticationService } from '../authentication';
import { __await } from 'tslib';
import { contains } from 'jquery';
import { ProductService } from '../product/product.service';
import { RepService } from '../rep';
import { Observable } from 'rxjs';
import { TimeFrameOptions } from '../shared/activity-model';
import { HomeService } from './home.service';
import { ReportService } from '../report';
import { HcpService } from '../hcp';
import { Announcement, ClassificationType } from '../../generated/service-client';
import { CacheService } from '../cache';

@Component({
    selector: 'sg-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BusySpinner implements OnInit {

    modalRef: NgbModalRef;
    userSalesForceGroupId: string;
    isWelcomeExpanded: boolean;
    @ViewChild('welcomeMessageBody', { static: true }) elementView: ElementRef;
    @ViewChild('privacypolicy', { static: true }) privacypolicypopup;
    welcomeInnerHeight: number;
    welcomeBodyHeight: number;
    announcementsCount: number = 0;
    announcements: Announcement[];
    currentPage: number = 1;
    announcementsArray: any[];
    pageSize: number = 5;
    searchByComponentName = '';
    startCount = 0;
    endCount = 0;
    pageDisplay: string;

    constructor(
        private authenticationService: AuthenticationService,
        private modalService: NgbModal,
        private homeService: HomeService,
        private cacheService: CacheService,
        private productService: ProductService, // TODO: Remove after dev testing
        private repService: RepService, // TODO: Remove after dev testing
        private hcppService: HcpService, // TODO: Remove after dev testing
        private reportService: ReportService // TODO: Remove after dev testing
    ) {
        super();
    }

    ngOnInit(): void {
        this.openPrivacyPolicyModal();
        this.getAnnouncements();
    }

    get getHCTimeFrameOptions(): TimeFrameOptions {
        return { quarterly: true, monthly: true } as TimeFrameOptions;
    }

    get getDTPTimeFrameOptions(): TimeFrameOptions {
        return { weekly: true, quarterly: true, monthly: true } as TimeFrameOptions;
    }

    openPrivacyPolicyModal(): void {
        if (this.authenticationService.showPrivacyPolicy) {
            if (this.modalRef) {
                this.modalRef.close();
            }
            this.modalRef = this.modalService.open(this.privacypolicypopup);
        }
        this.authenticationService.showPrivacyPolicy = false;
    }

    needShowMoreButton(): boolean {
        let response: boolean;
        if (this.elementView.nativeElement.scrollHeight >= 280) {
            response = true;
        } else {
            response = false;
        }
        return response;
    }

    showMoreWelcome(): void {
        this.isWelcomeExpanded = !this.isWelcomeExpanded;
        if (this.isWelcomeExpanded) {
            this.welcomeInnerHeight = this.elementView.nativeElement.scrollHeight;
        } else {
            this.welcomeInnerHeight = 270;
        }
    }

    getAnnouncements(): void {
        this.setBusySpinner(this.homeService.GetActiveAnnouncements()).subscribe(response => {
            if (response.length > 0) {
                this.announcements = response;
                this.announcementsCount = response.length;
                this.pageChange(1)
            }
        });
    }

    updatePageDisplay() {
        this.startCount = (this.currentPage - 1) * this.pageSize + 1;
        this.endCount = this.startCount + this.pageSize - 1;
        if (this.endCount > this.announcementsCount) {
            this.endCount = this.announcementsCount;
        }
        if (this.announcementsCount === 0) {
            this.startCount = 0;
        }

        this.pageDisplay = "Display ($0 - $1) of $2 results"
            .replace('$0', this.startCount + '')
            .replace('$1', this.endCount + '')
            .replace('$2', this.announcementsCount + '');
    }

    pageChange(page: number) {
        let start = (page - 1) * this.pageSize;
        let end = start + 5 > this.announcementsCount ? this.announcementsCount : start + 5;
        this.currentPage = page;
        this.announcementsArray = this.announcements.slice(start, end);
        this.updatePageDisplay();
    }

    searchTag(event) {
        this.searchByComponentName = event
    }
}
