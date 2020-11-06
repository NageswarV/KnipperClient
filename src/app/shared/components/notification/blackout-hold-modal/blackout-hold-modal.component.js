import { __decorate, __metadata } from "tslib";
import { Component, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { System, BlackoutHoldSearchFilterDto } from '../../../../shared/service-clients/system';
import { FormBuilder } from '@angular/forms';
var BlackoutHoldModalComponent = /** @class */ (function () {
    function BlackoutHoldModalComponent(fb, 
    //private notification: NotificationService,
    dialog, systemService) {
        //notification.globalErrors$.subscribe((error: HttpErrorResponse) => {
        //this.serverError = true;
        this.fb = fb;
        this.dialog = dialog;
        this.systemService = systemService;
        this.displayCloseButton = true;
        this.close = new EventEmitter();
        this.serverValidationErrors = [];
        this.infoMessageList = [];
        this.blackoutHolds = [];
    }
    BlackoutHoldModalComponent.prototype.ngOnInit = function () {
        // this.displayBlackoutHoldList();
    };
    BlackoutHoldModalComponent.prototype.hideCloseButton = function () {
        //this.displayCloseButton = false;
    };
    BlackoutHoldModalComponent.prototype.closeModal = function () {
        // this.close.emit();
    };
    BlackoutHoldModalComponent.prototype.displayBlackoutHoldList = function () {
        //this.systemService.getBlackoutHoldCount().subscribe(
        //  x => {
        //    this.blackoutHoldTitle = 'Affected Zip Code(s) (' + x.result + ')';
        //  });
        //this.blackoutHoldColumns = [{
        //  name: 'zipCode',
        //  displayName: 'Notifications.BlackoutHold.ZipCode',
        //  visibility: 'xs',
        //  sortDir: 'asc'
        //}, {
        //  name: 'stateName',
        //  displayName: 'Notifications.BlackoutHold.State',
        //  visibility: 'xs',
        //}];
    };
    BlackoutHoldModalComponent.prototype.loadData = function (loadEvent) {
        var filter = new BlackoutHoldSearchFilterDto({
            pageSize: loadEvent.perPage,
            pageNumber: loadEvent.pageNum,
            sortBy: loadEvent.sort ? loadEvent.sort.sortName + ' ' + loadEvent.sort.sortDir : '',
            filterString: ''
        });
        return this.systemService.searchBlackoutHolds(filter).map(function (x) { return x.result; });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BlackoutHoldModalComponent.prototype, "displayCloseButton", void 0);
    __decorate([
        ViewChild('blackoutHoldDialog', { static: false }),
        __metadata("design:type", Object)
    ], BlackoutHoldModalComponent.prototype, "blackoutHoldDialog", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], BlackoutHoldModalComponent.prototype, "close", void 0);
    BlackoutHoldModalComponent = __decorate([
        Component({
            selector: 'samplicity-blackout-hold-modal',
            templateUrl: './blackout-hold-modal.component.html',
            styleUrls: ['./blackout-hold-modal.component.scss'],
        }),
        __metadata("design:paramtypes", [FormBuilder,
            MatDialog,
            System])
    ], BlackoutHoldModalComponent);
    return BlackoutHoldModalComponent;
}());
export { BlackoutHoldModalComponent };
//# sourceMappingURL=blackout-hold-modal.component.js.map