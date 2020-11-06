import { __decorate, __extends, __metadata } from "tslib";
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BusySpinner } from '../common/busy-spinner';
import { AuthenticationService } from '../authentication';
import { ProductService } from '../product/product.service';
import { RepService } from '../rep';
import { HomeService } from './home.service';
import { ReportService } from '../report';
import { HcpService } from '../hcp';
import { CacheService } from '../cache';
var HomeComponent = /** @class */ (function (_super) {
    __extends(HomeComponent, _super);
    function HomeComponent(authenticationService, modalService, homeService, cacheService, productService, // TODO: Remove after dev testing
    repService, // TODO: Remove after dev testing
    hcppService, // TODO: Remove after dev testing
    reportService // TODO: Remove after dev testing
    ) {
        var _this = _super.call(this) || this;
        _this.authenticationService = authenticationService;
        _this.modalService = modalService;
        _this.homeService = homeService;
        _this.cacheService = cacheService;
        _this.productService = productService;
        _this.repService = repService;
        _this.hcppService = hcppService;
        _this.reportService = reportService;
        _this.announcementsCount = 0;
        _this.pager = {};
        _this.pageSize = 3;
        _this.searchByComponentName = '';
        _this.currentPage = 1;
        _this.totalRecordCount = 0;
        return _this;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.openPrivacyPolicyModal();
        this.getAnnouncements();
        // TODO: Added for testing api, remove towards the end
        //this.homeService.GetActiveAnnouncements().subscribe(x => {
        //    console.log(x);
        //});
        //this.productService.GetProductsByInventory().subscribe(x => {
        //    console.log(x);
        //});
        //this.repService.GetRepPushShipments().subscribe(x => {
        //    console.log(x);
        //});
        //this.repService.GetRepsIncludingDtpOrders().subscribe(x => {
        //    console.log(x);
        //    if(x.length > 0) {
        //        this.repService.GetDtrOrdersByRepId(x[0].id).subscribe(y => {
        //            console.log(y);
        //        })
        //    }
        //});
        //this.reportService.GetReportDefinitions().subscribe(x => {
        //    console.log(x);
        //});
        //this.reportService.GetGeneratedReports().subscribe(x => {
        //    console.log(x);
        //});
        //this.hcppService.GetHcpsIncludingDtpOrders().subscribe(x => {
        //    console.log(x);
        //    if(x.length > 0) {
        //        this.hcppService.GetDtrOrdersByHcpId(x[0].id).subscribe(y => {
        //            console.log(y);
        //        })
        //    }
        //});
        console.log(this.cacheService.stateCache);
        console.log(this.cacheService.classificationValues.filter(function (x) { return x.classificationTypeCode == "SPECIALITY"; }));
    };
    Object.defineProperty(HomeComponent.prototype, "getHCTimeFrameOptions", {
        get: function () {
            return { quarterly: true, monthly: true };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "getDTPTimeFrameOptions", {
        get: function () {
            return { weekly: true, quarterly: true, monthly: true };
        },
        enumerable: false,
        configurable: true
    });
    HomeComponent.prototype.openPrivacyPolicyModal = function () {
        if (this.authenticationService.showPrivacyPolicy) {
            if (this.modalRef) {
                this.modalRef.close();
            }
            this.modalRef = this.modalService.open(this.privacypolicypopup);
        }
        this.authenticationService.showPrivacyPolicy = false;
    };
    HomeComponent.prototype.needShowMoreButton = function () {
        var response;
        if (this.elementView.nativeElement.scrollHeight >= 280) {
            response = true;
        }
        else {
            response = false;
        }
        return response;
    };
    HomeComponent.prototype.showMoreWelcome = function () {
        this.isWelcomeExpanded = !this.isWelcomeExpanded;
        if (this.isWelcomeExpanded) {
            this.welcomeInnerHeight = this.elementView.nativeElement.scrollHeight;
        }
        else {
            this.welcomeInnerHeight = 270;
        }
    };
    HomeComponent.prototype.getAnnouncements = function () {
        var _this = this;
        this.homeService.GetActiveAnnouncements().subscribe(function (response) {
            if (response.length > 0) {
                _this.announcements = response;
                _this.announcementsCount = response.length;
                _this.setPage(1);
            }
        });
    };
    HomeComponent.prototype.pageChange = function (pageNumber) {
        this.announcementsArray = null;
        this.setPage(pageNumber);
    };
    HomeComponent.prototype.setPage = function (page) {
        if (this.announcements) {
            this.pager = this.homeService.getPager(this.announcements.length, page);
            this.currentPage = page;
            if (page === 1) {
                this.totalRecordCount = this.announcements.length;
            }
            this.announcementsArray = this.announcements.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
    };
    HomeComponent.prototype.searchTag = function (event) {
        this.searchByComponentName = event;
    };
    __decorate([
        ViewChild('welcomeMessageBody', { static: true }),
        __metadata("design:type", ElementRef)
    ], HomeComponent.prototype, "elementView", void 0);
    __decorate([
        ViewChild('privacypolicy', { static: true }),
        __metadata("design:type", Object)
    ], HomeComponent.prototype, "privacypolicypopup", void 0);
    HomeComponent = __decorate([
        Component({
            selector: 'sg-page',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss'],
        }),
        __metadata("design:paramtypes", [AuthenticationService,
            NgbModal,
            HomeService,
            CacheService,
            ProductService,
            RepService,
            HcpService,
            ReportService // TODO: Remove after dev testing
        ])
    ], HomeComponent);
    return HomeComponent;
}(BusySpinner));
export { HomeComponent };
//# sourceMappingURL=home.component.js.map